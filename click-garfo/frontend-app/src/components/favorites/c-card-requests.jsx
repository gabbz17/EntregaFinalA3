

export function   CardRequests({title, img, description, price, icon, like}) {

    function handleFavoriteFood(event) {
        const value = event.target.value;
        console.log(value);
    }

    return (
        <div className="bg-white rounded-xl p-6">
  <div className="flex flex-col gap-4">
    <div className="relative">
      <div className="absolute top-4 bottom-0 right-4">
        <button onClick={handleFavoriteFood} className="text-[#E67E22] font-medium">{like}</button>
      </div>
      <img src={img} alt="Food Request Photo" className="w-full h-52 object-cover rounded-md" />
    </div>
    <article className="flex flex-col justify-start gap-4">
      <h1 className="text-xl text-[#1b1b1b] font-semibold">{title}</h1>
      <p className="text-start text-gray-500 text-sm lg:text-base max-w-[300px]">{description}</p>
      <div className="flex items-center justify-between gap-6">
        <h3 className="font-bold text-[#E67E22] text-xl lg:text-3xl">{price}</h3>
        <button className="bg-[#E67E22] rounded-md p-2">
          <p className="text-white">{icon}</p>
        </button>
      </div>
    </article>
  </div>
</div>
    )
}