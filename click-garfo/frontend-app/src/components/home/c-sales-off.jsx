export function SalesOff({ img, title, description }) {

    const countWords = (text, maxLenght) => {
      if (!text) return "";
      return text.length > maxLenght ? text.slice(0, maxLenght) + "..." : text;
    }
  
    return (
      <div className="flex gap-4"> {/* Adicionando um gap entre os cards */}
        <figure className="bg-white rounded-lg p-2 flex flex-col gap-3 w-full">
          <div className="flex items-center gap-3">
            <img className="w-16 h-16 rounded-md" src={`http://localhost:3000/img/${img}`} alt={title} />
            <article className="flex justify-start flex-col gap-2">
              <h1 className="text-[#1b1b1b] font-medium text-start">{title}</h1>
              <p className="text-gray-500 text-sm text-start max-w-[400px]">{countWords(description, 120)}</p>
            </article>
          </div>
        </figure>
      </div>
    )
  }
  