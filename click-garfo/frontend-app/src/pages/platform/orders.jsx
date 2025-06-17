import { useEffect, useState } from "react";
import { orderService } from "../../services/order";
import { CardRequests } from "../../components/home/c-card-requests";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        console.log('Buscando pedidos...');
        const ordersData = await orderService.getAll();
        console.log('Pedidos encontrados:', ordersData);
        setOrders(ordersData);
        setError(null);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    try {
      console.log('Cancelando pedido:', orderId);
      await orderService.cancel(orderId);
      console.log('Pedido cancelado com sucesso!');
      
      // Atualizar lista de pedidos
      const updatedOrders = orders.filter(order => order.id !== orderId);
      setOrders(updatedOrders);
      
      // Aqui você pode adicionar uma notificação de sucesso
    } catch (error) {
      console.error('Erro ao cancelar pedido:', error);
      // Aqui você pode adicionar uma notificação de erro
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar pedidos: {error}</div>;
  }

  return (
    <main className="max-w-[1400px] mx-auto p-8">
      <h1 className="text-3xl font-bold text-[#E67E22] mb-8">Meus Pedidos</h1>

      {orders.length === 0 ? (
        <p className="text-gray-600">Você ainda não fez nenhum pedido.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4">
              <CardRequests
                img={order.restaurant.photo}
                title={order.restaurant.name}
                description={`Pedido #${order.id}`}
                price={`R$ ${order.total.toFixed(2)}`}
                status={order.status}
              />
              <div className="mt-4">
                <p className="text-gray-600">Status: {order.status}</p>
                <p className="text-gray-600">Data: {new Date(order.created_at).toLocaleDateString()}</p>
                {order.status === 'pending' && (
                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Cancelar Pedido
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
} 