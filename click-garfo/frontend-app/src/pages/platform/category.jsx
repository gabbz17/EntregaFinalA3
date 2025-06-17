import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { restaurantService } from "../../services/restaurant";
import { CardRestaurant } from "../../components/home/c-card-restaurant";

export default function Category() {
  const { id } = useParams();
  const [restaurants, setRestaurants] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Buscando restaurantes da categoria...');
        
        // Buscar restaurantes da categoria
        const restaurantsData = await restaurantService.getByCategory(id);
        console.log('Restaurantes da categoria:', restaurantsData);
        setRestaurants(restaurantsData);

        // Buscar informações da categoria
        const categoryData = await restaurantService.getCategoryById(id);
        console.log('Dados da categoria:', categoryData);
        setCategory(categoryData);

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

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar dados: {error}</div>;
  }

  if (!category) {
    return <div>Categoria não encontrada</div>;
  }

  return (
    <main className="max-w-[1400px] mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#E67E22]">{category.name}</h1>
        <p className="text-gray-600">{category.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <CardRestaurant
            key={restaurant.id}
            img={restaurant.img}
            title={restaurant.name}
            description={restaurant.description}
            link={`/restaurant/${restaurant.id}`}
          />
        ))}
      </div>
    </main>
  );
} 