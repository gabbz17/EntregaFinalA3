import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

export function PopularCategorys({ categories }) {
  return (
    <Swiper
      spaceBetween={12}
      slidesPerView={2}
      breakpoints={{
        320: { slidesPerView: 2 },    
        480: { slidesPerView: 3 },     
        640: { slidesPerView: 4 },  
        768: { slidesPerView: 5 },    
        1024: { slidesPerView: 6 },    
        1280: { slidesPerView: 7 },  
        1536: { slidesPerView: 8 },    
      }}
      modules={[Pagination]}
    >
      {categories.map((category) => (
        <SwiperSlide key={category.id}>
          <Link to={`/category/${category.id}`} className="flex flex-col items-center gap-2 cursor-pointer">
            <div className="w-16 h-16 rounded-full bg-[#F5F5F5] flex items-center justify-center">
              <img
                src={category.photo ? `http://localhost:3000/img/${category.photo}` : "marguerita.png"}
                alt={category.title}
                className="w-8 h-8"
              />
            </div>
            <span className="text-sm text-[#1b1b1b]">{category.title}</span>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
