import { Search } from "lucide-react";
import { useState } from "react";


export function OrderTable() {
    const [selectedOrder, setSelectedOrder] = useState(null);

    const orders = [
        {
            id: "#1234",
            createdAt: "2h atrás",
            status: "Pendente",
            client: "João Silva",
            total: "R$ 150,00",
            items: ["Hambúrguer X", "Batata Média", "Coca 350ml"],
            address: "Rua das Flores, 123",
        },
        {
            id: "#1235",
            createdAt: "1h atrás",
            status: "Em preparo",
            client: "Maria Oliveira",
            total: "R$ 200,00",
            items: ["Pizza Margherita", "Suco de Laranja"],
            address: "Av. Brasil, 456",
        },
        {
            id: "#1235",
            createdAt: "1h atrás",
            status: "Em preparo",
            client: "Maria Oliveira",
            total: "R$ 200,00",
            items: ["Pizza Margherita", "Suco de Laranja"],
            address: "Av. Brasil, 456",
        },
        {
            id: "#1235",
            createdAt: "1h atrás",
            status: "Em preparo",
            client: "Maria Oliveira",
            total: "R$ 200,00",
            items: ["Pizza Margherita", "Suco de Laranja"],
            address: "Av. Brasil, 456",
        },
        {
            id: "#1235",
            createdAt: "1h atrás",
            status: "Em preparo",
            client: "Maria Oliveira",
            total: "R$ 200,00",
            items: ["Pizza Margherita", "Suco de Laranja"],
            address: "Av. Brasil, 456",
        },
    ];

    return (
        <>
            <div className="overflow-x-auto border border-gray-200 rounded-md">
                <table className="min-w-full text-sm">
                    <thead className="text-left text-[#1B1B1B]">
                        <tr>
                            <th className="p-3 w-10"></th>
                            <th className="p-3">Identificador</th>
                            <th className="p-3">Realizado há</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Cliente</th>
                            <th className="p-3">Total</th>
                            <th className="p-3">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index} className="border-t border-t-gray-300">
                                <td className="p-3">
                                    <button
                                        onClick={() => setSelectedOrder(order)}
                                        className="text-[#E67E22] hover:text-orange-600 cursor-pointer"
                                        title="Ver detalhes"
                                    >
                                        <Search />
                                    </button>
                                </td>
                                <td className="p-3">{order.id}</td>
                                <td className="p-3">{order.createdAt}</td>
                                <td className="p-3">{order.status}</td>
                                <td className="p-3">{order.client}</td>
                                <td className="p-3">{order.total}</td>
                                <td className="p-3 flex flex-col lg:flex-row gap-2">
                                    <button type="button" className="bg-green-500 cursor-pointer text-white px-3 py-1 rounded-md text-xs hover:bg-green-600 transition">
                                        Aprovar
                                    </button>
                                    <button type="button" className="bg-red-500 cursor-pointer text-white px-3 py-1 rounded-md text-xs hover:bg-red-600 transition">
                                        Cancelar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedOrder && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md relative">
                        <button
                            onClick={() => setSelectedOrder(null)}
                            className="absolute top-2 right-3 cursor-pointer text-gray-500 hover:text-gray-700 text-xl"
                        >
                            ✕
                        </button>
                        <h2 className="text-xl font-bold text-[#E67E22] mb-2">
                            Pedido {selectedOrder.id}
                        </h2>
                        <p className="text-sm text-gray-700 mb-1"><strong>Cliente:</strong> {selectedOrder.client}</p>
                        <p className="text-sm text-gray-700 mb-1"><strong>Status:</strong> {selectedOrder.status}</p>
                        <p className="text-sm text-gray-700 mb-1"><strong>Endereço:</strong> {selectedOrder.address}</p>
                        <p className="text-sm text-gray-700 mb-1"><strong>Total:</strong> {selectedOrder.total}</p>
                        <p className="text-sm text-gray-700 mt-2 font-medium">Itens:</p>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                            {selectedOrder.items.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}
