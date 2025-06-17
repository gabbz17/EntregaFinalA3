import { X } from "lucide-react";

export function SidebarCart({
  title,
  order,
  price,
  quantity,
  subtotal,
  total,
  total_value,
  onClose,
}) {
  return (
    <aside className="h-screen w-full sm:w-[380px] bg-white p-6 shadow-xl rounded-l-xl relative overflow-y-auto">
      <button
        aria-label="Fechar carrinho"
        onClick={onClose}
        className="absolute top-4 right-4"
      >
        <X className="text-[#E67E22] cursor-pointer" size={28} />
      </button>

      <div className="flex flex-col h-full gap-6">
        <div className="mt-10">
          <h6 className="text-sm text-[#1B1B1B]/70">Seu pedido em</h6>
          <h1 className="text-2xl font-semibold text-[#1B1B1B]">{title}</h1>
        </div>

        <div className="flex flex-col gap-3 border-t border-gray-200 pt-4">
          <div className="flex justify-between text-sm text-[#1B1B1B]">
            <p className="font-medium">{order}</p>
            <p>{quantity}</p>
          </div>
          <p className="text-right text-base font-semibold text-black">
            {price}
          </p>
        </div>

        <div className="flex flex-col gap-2 border-t border-gray-200 pt-4 text-sm text-[#1B1B1B]/80">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>R$ {subtotal}</p>
          </div>
          <div className="flex justify-between">
            <p>Total do serviço</p>
            <p>R$ {total}</p>
          </div>
          <div className="flex justify-between">
            <p>Taxa de entrega</p>
            <p>R$ {total_value}</p>
          </div>
        </div>

        <div className="flex justify-between items-center text-base font-bold text-black border-t border-gray-200 pt-4">
          <p>Total</p>
          <p>R$ {total_value}</p>
        </div>

        <button className="mt-auto w-full bg-[#E67E22] hover:bg-[#cf6c15] text-white font-medium py-3 rounded-md transition cursor-pointer">
          Confirmar o pedido
        </button>
      </div>
    </aside>
  );
}
