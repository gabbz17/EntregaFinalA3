import { Star } from "lucide-react";

export function AboutRestaurant({ name, description, rating, category }) {
    return (
        <>
        <div className="flex flex-col justify-center gap-4 lg:flex-row lg:justify-between mt-10">
                <div className="flex flex-col lg:flex-row justify-center gap-2 items-center">
                  <img src="/imagemRestaurante.svg" alt={name} className="w-32 h-32 rounded-md" />
                  <div className="flex flex-col items-start gap-1">
                    <h3 className="text-2xl lg:text-3xl text-[#1b1b1b]">{name}</h3>
                    <div className="flex items-center gap-2">
                        <Star className="text-[#E67E22]" size={32} />
                        <span className="text-[#1b1b1b]">{rating?.toFixed(1) || '0.0'}</span>
                    </div>
                    <p className="text-[#1b1b1b]/70">{category}</p>
                  </div>
                </div>
                <article className="flex items-center justify-center gap-2">
                    <button type="button" className="text-xl font-medium text-[#E67E22]">Ver mais</button>
                    <button type="button" className="text-xl font-medium text-[#1b1b1b]/70">Avaliar</button>
                </article>
            </div>
            <p className="mt-4 text-[#1b1b1b]/70">{description}</p>
        </>
    )
}