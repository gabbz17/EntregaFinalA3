import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cartService } from "../../services/cart";
import { orderService } from "../../services/order";
import { CardRequests } from "../../components/home/c-card-requests";

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        console.log('Buscando itens do carrinho...');
        const items = await cartService.getItems();
        console.log('Itens do carrinho:', items);
        setCartItems(items);
        
        // Calcular total
        const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setTotal(totalAmount);
        
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

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    try {
      console.log('Atualizando quantidade:', itemId, newQuantity);
      await cartService.updateQuantity(itemId, newQuantity);
      
      // Atualizar lista de itens
      const updatedItems = cartItems.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedItems);
      
      // Recalcular total
      const newTotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      setTotal(newTotal);
      
      // Aqui você pode adicionar uma notificação de sucesso
    } catch (error) {
      console.error('Erro ao atualizar quantidade:', error);
      // Aqui você pode adicionar uma notificação de erro
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      console.log('Removendo item:', itemId);
      await cartService.removeItem(itemId);
      
      // Atualizar lista de itens
      const updatedItems = cartItems.filter(item => item.id !== itemId);
      setCartItems(updatedItems);
      
      // Recalcular total
      const newTotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      setTotal(newTotal);
      
      // Aqui você pode adicionar uma notificação de sucesso
    } catch (error) {
      console.error('Erro ao remover item:', error);
      // Aqui você pode adicionar uma notificação de erro
    }
  };

  const handleCheckout = async () => {
    try {
      console.log('Finalizando pedido...');
      const orderData = {
        items: cartItems,
        total: total,
        // Adicione outros dados necessários para o pedido
      };
      
      await orderService.create(orderData);
      await cartService.clear();
      
      // Redirecionar para página de pedidos
      navigate('/orders');
      
      // Aqui você pode adicionar uma notificação de sucesso
    } catch (error) {
      console.error('Erro ao finalizar pedido:', error);
      // Aqui você pode adicionar uma notificação de erro
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar carrinho: {error}</div>;
  }

  return (
    <main className="max-w-[1400px] mx-auto p-8">
      <h1 className="text-3xl font-bold text-[#E67E22] mb-8">Meu Carrinho</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Seu carrinho está vazio.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems.map((item) => (
              <div key={item.id} className="border rounded-lg p-4">
                <CardRequests
                  img={item.photo}
                  title={item.title}
                  description={item.description}
                  price={`R$ ${(item.price * item.quantity).toFixed(2)}`}
                />
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 border rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-2xl font-bold text-[#E67E22]">
                R$ {total.toFixed(2)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full py-3 bg-[#E67E22] text-white rounded-lg hover:bg-[#D35400]"
            >
              Finalizar Pedido
            </button>
          </div>
        </>
      )}
    </main>
  );
} 