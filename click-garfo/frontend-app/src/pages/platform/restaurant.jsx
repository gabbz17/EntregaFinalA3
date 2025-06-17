import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { restaurantService } from "../../services/restaurant";
import { productService } from "../../services/product";
import { cartService } from "../../services/cart";
import { CardRequests } from "../../components/home/c-card-requests";
import { Heart, ShoppingCart, Star } from "lucide-react";

export default function Restaurant() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Buscando dados do restaurante...');
        
        // Buscar dados do restaurante
        const restaurantData = await restaurantService.getById(id);
        console.log('Dados do restaurante:', restaurantData);
        setRestaurant(restaurantData);

        // Buscar produtos do restaurante
        const productsData = await restaurantService.getProducts(id);
        console.log('Produtos do restaurante:', productsData);
        setProducts(productsData);

        // Verificar se o restaurante está nos favoritos
        const favorites = await restaurantService.getFavorites();
        setIsFavorite(favorites.some(fav => fav.id === parseInt(id)));

        setError(null);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddToCart = async (productId) => {
    try {
      console.log('Adicionando produto ao carrinho:', productId);
      await cartService.addItem(productId);
      console.log('Produto adicionado com sucesso!');
      // Aqui você pode adicionar uma notificação de sucesso
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      // Aqui você pode adicionar uma notificação de erro
    }
  };

  const handleToggleFavorite = async () => {
    try {
      console.log('Alternando favorito:', id);
      await restaurantService.toggleFavorite(id);
      setIsFavorite(!isFavorite);
      console.log('Favorito atualizado com sucesso!');
      // Aqui você pode adicionar uma notificação de sucesso
    } catch (error) {
      console.error('Erro ao atualizar favorito:', error);
      // Aqui você pode adicionar uma notificação de erro
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar dados: {error}</div>;
  }

  if (!restaurant) {
    return <div>Restaurante não encontrado</div>;
  }

  return (
    <main className="max-w-[1400px] mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#E67E22]">{restaurant.name}</h1>
        <p className="text-gray-600">{restaurant.description}</p>
        <div className="flex items-center mt-2">
          <Star size={24} color="#E67E22" />
          <span className="ml-2 text-gray-600">
            {restaurant.average_rating ? restaurant.average_rating.toFixed(1) : '0.0'} ({restaurant.products_count} produtos)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <CardRequests
            key={product.id}
            like={<Heart size={36} color={isFavorite ? "#E67E22" : "#1b1b1b"} />}
            img={product.photo}
            title={product.title}
            description={product.description}
            price={`R$ ${product.price.toFixed(2)}`}
            icon={<ShoppingCart size={32} />}
            onAddToCart={() => handleAddToCart(product.id)}
            onLikeClick={handleToggleFavorite}
          />
        ))}
      </div>
    </main>
  );
} 