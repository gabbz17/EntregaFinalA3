import { ShoppingCart } from "lucide-react";

export function MenuRestaurant({ products }) {
    return (
        <section className="mt-10">
            <h1 className="text-2xl lg:text-3xl text-black font-medium mb-6">Cardápio</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex flex-col lg:flex-row justify-center items-center gap-4">
                            <figure>
                                <img 
                                    src={product.photo || "/BigBossBurguer.svg"} 
                                    alt={product.title} 
                                    className="w-32 h-32 rounded-md object-cover" 
                                />
                            </figure>
                            <article className="flex flex-col flex-1">
                                <h2 className="text-start text-[#1B1B1B] font-medium">{product.title}</h2>
                                <p className="text-sm lg:text-base text-[#1B1B1B]/50 mt-2">{product.description}</p>
                                <div className="flex justify-between items-center mt-4">
                                    <p className="text-black text-lg font-semibold">
                                        R$ {product.price.toFixed(2)}
                                    </p>
                                    <button 
                                        className="bg-[#E67E22] text-white p-2 rounded-full hover:bg-[#d35400] transition-colors"
                                        onClick={() => {
                                            // TODO: Implementar adição ao carrinho
                                            console.log('Adicionar ao carrinho:', product);
                                        }}
                                    >
                                        <ShoppingCart size={24} />
                                    </button>
                                </div>
                            </article>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}