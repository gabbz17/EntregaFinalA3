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
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow duration-300 max-w-sm w-full">
      <div className="flex flex-col gap-4">
        <div className="relative rounded-lg overflow-hidden">
          <img
            src={img}
            alt={title}
            className="w-full h-full"
          />
          <div className="absolute top-3 right-3">
            {heart}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-semibold text-[#1b1b1b] line-clamp-1">
              {title}
            </h2>
            <div className="flex items-center gap-1">
              {stars}
            </div>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

          <Link
            to={`/${link}`}
            className="mt-2 bg-[#E67E22] hover:bg-[#cf6d13] text-white text-center py-2 rounded-md font-medium transition-colors w-full"
          >
            {btnText}
          </Link>
        </div>
      </div>
    </div>
  );
}
