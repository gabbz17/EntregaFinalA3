import { Header } from "../../components/favorites/c-header";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { CardRestaurant } from "../../components/favorites/c-card-restaurant";
import { Heart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function MyFavorites() {
  const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await api.get('/favorites/restaurants');
        setFavoriteRestaurants(response.data);
      } catch (error) {
        console.error('Erro ao buscar restaurantes favoritos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <main className="max-w-[1400px] mx-auto p-8 lg:p-0 mt-8 lg:mt-0">
      <div className="mt-8 mb-8">
        <Header />
      </div>

      <div>
        <h1 className="text-2xl lg:text-3xl text-start text-[#E67E22] font-semibold mb-2">
          Restaurantes Favoritos
        </h1>

        <Swiper
          spaceBetween={8}
          slidesPerView={2}
          breakpoints={{
            320: { slidesPerView: 1 },
            480: { slidesPerView: 2 },
            640: { slidesPerView: 2.5 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          modules={[Pagination]}
        >
          {favoriteRestaurants.map((restaurant) => (
            <SwiperSlide key={restaurant.id}>
              <CardRestaurant
                img={restaurant.photo}
                title={restaurant.name}
                description={restaurant.description}
                stars={<Star size={24} color="#E67E22" />}
                btnText="Ver restaurante"
                heart={<Heart size={24} color="#E67E22" />}
                link={`/restaurant/${restaurant.id}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </main>
  );
}
