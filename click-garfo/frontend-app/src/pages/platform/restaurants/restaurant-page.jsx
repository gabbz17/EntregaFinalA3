import { Header } from "../../../components/restaurants/c-header";
import { AboutRestaurant } from "../../../components/restaurants/c-about-restaurant";
import { MenuRestaurant } from "../../../components/restaurants/c-menu-restaurant";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../services/api";

export default function RestaurantPage() {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRestaurantData = async () => {
            try {
                // Buscar dados do restaurante
                const restaurantResponse = await api.get(`/restaurants/${id}`);
                setRestaurant(restaurantResponse.data);

                // Buscar produtos do restaurante
                const productsResponse = await api.get(`/products?restaurant_id=${id}`);
                setProducts(productsResponse.data);
            } catch (error) {
                console.error('Erro ao buscar dados do restaurante:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurantData();
    }, [id]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!restaurant) {
        return <div>Restaurante não encontrado</div>;
    }

    return (
        <section className="max-w-[1400px] p-8 lg:p-0 mx-auto">
            <Header />
            <div className="w-full rounded-lg h-full">
                <img 
                    src={restaurant.photo || "/caminho_imagem.jpg"} 
                    alt={restaurant.name} 
                    className="w-full h-full rounded-2xl" 
                />
            </div>
            <AboutRestaurant 
                name={restaurant.name}
                description={restaurant.description}
                rating={restaurant.stars}
                category={restaurant.category_name}
            />
            <MenuRestaurant products={products} />
        </section>
    )
}