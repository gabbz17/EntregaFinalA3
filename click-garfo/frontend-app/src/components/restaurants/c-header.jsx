import { Search, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { SidebarCart } from "../ui/c-sidebar-cart";

export function Header() {
  const filterRestaurants = ["Tipo de restaurante", "Massas", "Carnes", "Hamburguer"];
  const [openSheetCart, setOpenSheetCart] = useState(false);

  function searchRestaurants(event) {
    const value = event.target.value;
    console.log(value);
  }

  return (
    <header className="max-w-[1400px] mx-auto">
        <div className="flex flex-col gap-2 text-start mb-4">
        <h1 className="text-2xl lg:text-3xl font-semibold text-[#E67E22]">Restaurantes</h1>
        <p className="text-gray-500 text-sm lg:text-base">
        Descubra os melhores restaurantes da região — sabores únicos, experiências inesquecíveis e opções para todos os gostos, do tradicional ao moderno, sem sair de casa.
        </p>
        </div>
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex items-start lg:items-center flex-col md:flex-row w-1/2 gap-2">
          <div className="flex items-center flex-1 border border-gray-300 rounded-lg px-3 py-2 focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500">
            <input
              onChange={searchRestaurants}
              type="search"
              placeholder="Pesquisar..."
              className="flex-1 outline-none text-sm"
            />
            <Search size={18} className="text-[#E67E22] ml-2" />
          </div>
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-[#1b1b1b] focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          >
            {filterRestaurants.map((category, index) => (
              <option key={index} value={category}>
                {category || "Todos"}
              </option>
            ))}
          </select>
        </div>

        {/* Carrinho */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setOpenSheetCart(true)}
            className="cursor-pointer"
            aria-label="Abrir carrinho"
          >
            <ShoppingCart size={24} className="text-[#E67E22]" />
          </button>
          {openSheetCart && (
            <>
            <div className="fixed inset-0 bg-black/30 z-40"></div>
            <div className="fixed top-0 right-0 z-50">
              <SidebarCart
                title="Restaurante Exemplo"
                order="Pedido 1"
                price="R$ 49,90"
                quantity="1x"
                subtotal="49,90"
                total="5,00"
                total_value="54,90"
                onClose={() => setOpenSheetCart(false)}
              />
            </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
