import { Search, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { SidebarCart } from "../ui/c-sidebar-cart";
import { cartService } from "../../services/cart";

export function Header() {
  const [openSheetCart, setOpenSheetCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const items = await cartService.getItems();
        setCartItems(items);
        setError(null);
      } catch (error) {
        console.error('Erro ao buscar itens do carrinho:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  function searchProducts(event) {
    const value = event.target.value;
    console.log(value);
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateServiceFee = () => {
    return calculateTotal() * 0.1; // 10% de taxa de serviço
  };

  const calculateDeliveryFee = () => {
    return 5.00; // Taxa fixa de entrega
  };

  const calculateFinalTotal = () => {
    return calculateTotal() + calculateServiceFee() + calculateDeliveryFee();
  };

  if (loading) {
    return <div>Carregando carrinho...</div>;
  }

  if (error) {
    return <div>Erro ao carregar carrinho: {error}</div>;
  }

  return (
    <section>
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex items-center w-full border border-gray-300 rounded-lg px-3 py-2 focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500">
          <input
            onChange={searchProducts}
            type="search"
            placeholder="Pesquisar..."
            className="flex-1 outline-none text-sm"
          />
          <Search size={18} className="text-[#E67E22] ml-2" />
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setOpenSheetCart(true)}
            className="cursor-pointer relative"
            aria-label="Abrir carrinho"
          >
            <ShoppingCart size={24} className="text-[#E67E22]" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#E67E22] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>

          {openSheetCart && (
            <>
              <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setOpenSheetCart(false)}></div>
              <div className="fixed top-0 right-0 z-50">
                <SidebarCart
                  title={cartItems[0]?.restaurant_name || "Seu carrinho"}
                  order={cartItems.map(item => `${item.quantity}x ${item.title}`).join(", ")}
                  price={`R$ ${calculateTotal().toFixed(2)}`}
                  quantity={cartItems.length}
                  subtotal={calculateTotal().toFixed(2)}
                  total={calculateServiceFee().toFixed(2)}
                  total_value={calculateFinalTotal().toFixed(2)}
                  onClose={() => setOpenSheetCart(false)}
                />
              </div>
            </>
          )}

          <h1 className="text-lg lg:text-xl font-semibold text-end">
            Olá, <span className="text-[#E67E22]">Gustavo</span> 👋
          </h1>
        </div>
      </div>
    </section>
  );
}
  