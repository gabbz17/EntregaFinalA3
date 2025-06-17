import { useEffect, useState } from "react";
import api from "../../services/api";

export function TableBuyOrder() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await api.get('/cart');
        setCartItems(response.data);
      } catch (error) {
        console.error('Erro ao buscar itens do carrinho:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveItem = async (itemId) => {
    try {
      await api.delete(`/cart/${itemId}`);
      setCartItems(cartItems.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Erro ao remover item do carrinho:', error);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="w-full overflow-x-auto mt-8">
      <table className="min-w-[600px] w-full border-collapse border rounded-md overflow-hidden">
        <thead className="text-left bg-gray-100">
          <tr>
            <th className="p-3">Itens</th>
            <th className="p-3">Título</th>
            <th className="p-3">Preço</th>
            <th className="p-3">Quantidade</th>
            <th className="p-3">Total</th>
            <th className="p-3">Remover</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id} className="border-b border-gray-500">
              <td className="p-3">
                <div className="mt-2">
                  <img
                    src={item.product.photo}
                    alt={item.product.title}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                </div>
              </td>
              <td className="p-3">{item.product.title}</td>
              <td className="p-3">R$ {item.product.price.toFixed(2)}</td>
              <td className="p-3">{item.quantity}</td>
              <td className="p-3">R$ {(item.product.price * item.quantity).toFixed(2)}</td>
              <td className="p-3">
                <button 
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500 cursor-pointer hover:underline"
                >
                  Cancelar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
