export function CardRequests({ like, img, title, description, price,  icon, onAddToCart, onLikeClick }) {
  return (
    <div className="relative group transition-transform">
      <div className="bg-white border-1 border-[#D9D9D9] p-4 rounded-xl flex flex-col gap-3 w-full transition-colors duration-500">
        <div className="absolute top-2 right-2">
          <button onClick={onLikeClick}>
            {like}
          </button>
        </div>
        <div className="flex items-center justify-center">
          <img
            src={img}
            alt={title}
            className="w-24 h-24 object-fit rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-[#1b1b1b] font-medium text-xl text-start transition-all duration-500">
            {title}
          </h2>
          <p className="text-[#1b1b1b]/50 text-sm text-start transition-all duration-500">
            {description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-[#E67E22] font-semibold text-2xl transition-all duration-500">
              {price}
            </span>
            <button 
              onClick={onAddToCart}
              className="bg-[#E67E22] p-2 rounded-lg transition-all duration-500 group-hover:scale-[1.1] cursor-pointer text-white"
            >
              {icon}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}