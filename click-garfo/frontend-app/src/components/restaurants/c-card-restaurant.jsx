import { Link } from "react-router-dom";

export function CardRestaurant({
  img,
  title,
  description,
  stars,
  btnText,
  heart,
  link,
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col gap-4">
        <div className="relative rounded-lg overflow-hidden">
          <img
            src={img}
            alt="Restaurant"
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 right-3">
            <span className="text-white text-xl">{heart}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-[#1b1b1b]">{title}</h2>
            <div className="flex items-center gap-1">{stars}</div>
          </div>

          <p className="text-sm text-gray-600">{description}</p>
          <Link
            to={`/${link}`}
            className="w-full mt-2 bg-[#E67E22] hover:bg-[#cf6d13] text-white text-center py-2 rounded-md font-medium transition-colors"
          >
            {btnText}
          </Link>
        </div>
      </div>
    </div>
  );
}
