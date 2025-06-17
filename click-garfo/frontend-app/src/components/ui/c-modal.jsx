import { Star, X } from "lucide-react";

export function ModalRateRestaurant() {
    return (
        <div className="bg-white p-4 rounded-md">
            <div className="relative">
                <div className="absolute top-4 right-4 bottom-0">
                    <button type="button">
                        <X size={24} className="text-[#E67E22]"/>
                    </button>
                </div>
            </div>
            <article className="flex flex-col gap-2">
                <h1 className="text-[#1B1B1B] font-medium text-center text-2xl">Avalie esse Restaurante</h1>
                <p className="text-center text-sm lg:text-base text-[#1B1B1B]/70">
                Avalie a sua experiência diante a comida e o atendimento desse estabelecimento 
                </p>
                <div className="flex items-center justify-center gap-2">
                <Star size={24} className="text-black" />
                <Star size={24} className="text-black" />
                <Star size={24} className="text-black" />
                <Star size={24} className="text-black" />
                <Star size={24} className="text-black" />
                </div>
                <form className="flex flex-col gap-2" action="">
                    <label className="text-start text-[#1b1b1b] text-sm lg:text-base" htmlFor="message">Mensagem</label>
                    <textarea name="" id="" cols="30" rows="10" />
                    <div className="mt-3 w-full">
                     <button type="submit" className="p-1 rounded-md bg-[#E67E22] cursor-pointer text-white font-medium">Terminar avaliação</button>
                    </div>
                </form>
            </article>
        </div>
    )
}