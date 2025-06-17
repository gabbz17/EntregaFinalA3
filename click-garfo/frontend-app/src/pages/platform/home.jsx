import { Header } from "../../components/home/c-header";
import { PopularCategorys } from "../../components/home/c-popular-categorys";
import Banner from "/Banner.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { CardRequests } from "../../components/home/c-card-requests";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { SalesOff } from "../../components/home/c-sales-off";
import { useEffect, useState } from "react";
import { restaurantService } from "../../services/restaurant";
import { productService } from "../../services/product";
import { categoryService } from "../../services/category";
import { CardRestaurant } from "../../components/favorites/c-card-restaurant";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Iniciando busca de dados...');

        // Buscar categorias
        console.log('Buscando categorias...');
        const categoriesResponse = await categoryService.getAll();
        console.log('Categorias recebidas:', categoriesResponse);
        setCategories(categoriesResponse);

        // Buscar produtos populares
        console.log('Buscando produtos populares...');
        const productsResponse = await productService.getPopular();
        console.log('Produtos populares recebidos:', productsResponse);
        setPopularProducts(productsResponse);

        // Buscar ofertas


        // Buscar restaurantes populares
        console.log('Buscando restaurantes populares...');
        const restaurantsResponse = await restaurantService.getPopular();
        console.log('Restaurantes populares recebidos:', restaurantsResponse);

        setError(null);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      console.log('Adicionando produto ao carrinho:', productId);
      await productService.addToCart(productId);
      console.log('Produto adicionado com sucesso!');
      // Aqui você pode adicionar uma notificação de sucesso
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      // Aqui você pode adicionar uma notificação de erro
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar dados: {error}</div>;
  }

  return (
    <main className="max-w-[1400px] mx-auto p-8 lg:p-0 mt-8 lg:mt-0">
      <div className="mt-8 mb-8">
        <Header />
      </div>

      <div className="flex flex-col gap-8">
        <div>
          <img src={Banner} alt="Banner" className="w-full h-[300px] object-cover rounded-lg" />
        </div>

        <div>
          <h1 className="text-2xl lg:text-3xl text-start text-[#E67E22] font-semibold mb-6">
            Categorias Populares
          </h1>
          <PopularCategorys categories={categories} />
        </div>


        <div>
          <h2 className="text-2xl lg:text-3xl text-start text-[#E67E22] font-semibold mb-6">
            Mais Pedidos
          </h2>
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              1024: { slidesPerView: 3 },
            }}
            modules={[Pagination]}
          >
            {popularProducts.map((item) => (
              <SwiperSlide key={item.id}>
                <CardRequests
                  like={<Heart size={36} />}
                  img={item.photo}
                  title={item.title}
                  description={item.description}
                  price={`R$ ${item.price.toFixed(2)}`}
                  icon={<ShoppingCart size={32} />}
                  onAddToCart={() => handleAddToCart(item.id)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </main>
  );
}
