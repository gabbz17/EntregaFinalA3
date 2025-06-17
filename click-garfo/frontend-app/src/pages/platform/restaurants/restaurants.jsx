import { Heart, Star } from "lucide-react";
import { CardRestaurant } from "../../../components/restaurants/c-card-restaurant";
import { Header } from "../../../components/restaurants/c-header";
import { useEffect, useState } from "react";
import api from "../../../services/api";

export default function Restaurants() {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await api.get('/restaurants');
                setRestaurants(response.data);
            } catch (error) {
                console.error('Erro ao buscar restaurantes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, []);

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <main className="max-w-[1400px] mx-auto px-4 py-6 lg:px-2 mt-8 lg:mt-0">
          <Header />
         <div className="mb-8 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {restaurants.map((restaurant) => {
                return (
                    <div key={restaurant.id}>
                        <CardRestaurant 
                            heart={<Heart size={32} />} 
                            img={restaurant.photo || "/BigChapa.svg"} 
                            title={restaurant.name} 
                            stars={<Star className="text-[#E67E22]" size={36} />} 
                            description={restaurant.description} 
                            link={`/restaurant/${restaurant.id}`} 
                            btnText="Ver restaurante" 
                        />
                    </div>
                )
             })}
            </div>
         </div>
        </main>
    )
}