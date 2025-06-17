import { ArrowLeft, Box } from "lucide-react";
import { OrderTable } from "../../../components/ui/c-order-table";
import { Link } from "react-router-dom";
import logo from "/Logo_secondary.svg";

export default function OrderPage() {
  const typeOrder = [
    "Pendente",
    "Cancelado",
    "Em preparo",
    "Em entrega",
    "Entregue",
  ];

  return (
    <section className="max-w-[1440px] mx-auto p-8 lg:p-0">
      <div className="flex items-center justify-center gap-2 lg:justify-between">
        <Link to="/login-restaurant" className="flex items-center gap-2 mb-6">
          <ArrowLeft className="text-orange-500" />
          Voltar
        </Link>
        <img src={logo} className="w-40 h-40" alt="" />
      </div>
      <h1 className="text-2xl lg:text-3xl font-bold text-[#E67E22]">Pedidos</h1>

      <div className="p-4">
        <h3 className="text-[#1B1B1B] text-xl mb-4 font-medium">Filtros</h3>

        <div className="flex flex-col lg:flex-row flex-wrap gap-4">
          <input
            className="p-2 border border-[#D9D9D9] rounded-md focus:outline-[#E67E22] transition"
            type="number"
            placeholder="Filtrar por ID do pedido"
          />

          <input
            className="p-2 border border-[#D9D9D9] rounded-md focus:outline-[#E67E22] transition"
            type="text"
            placeholder="Filtrar por nome do cliente"
          />

          <select
            className="p-2 border border-[#D9D9D9] rounded-md text-gray-700 focus:outline-[#E67E22] transition"
            defaultValue=""
          >
            <option value="" disabled>
              Filtrar por status
            </option>
            {typeOrder.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="bg-orange-100 border cursor-pointer border-orange-200 text-[#1B1B1B] px-6 py-2 rounded-lg hover:shadow-md transition-all duration-200 hover:bg-orange-200 active:scale-95"
          >
            <Link
              to="/products-restaurant-page"
              className="flex items-center gap-2 text-sm lg:text-base font-semibold"
            >
              <Box className="text-[#E67E22]" />
              Produtos
            </Link>
          </button>
        </div>
      </div>

      <div className="mt-8">
        <OrderTable />
      </div>
    </section>
  );
}
