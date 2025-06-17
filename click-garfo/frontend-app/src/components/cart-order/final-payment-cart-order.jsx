export function FinalPaymentCartOrder() {
    return (
      <section className="mt-8 px-4">
        <main className="flex flex-col-reverse lg:flex-row items-center justify-center gap-6 lg:justify-between">
          <div className="flex flex-col gap-4 w-full max-w-md">
            <h1 className="text-black text-2xl lg:text-3xl font-semibold">
              Valor total no carrinho
            </h1>
            <table className="w-full border border-gray-400 rounded-md overflow-hidden text-sm lg:text-base">
              <tbody>
                <tr className="border-b border-gray-400">
                  <td className="p-3 font-medium text-gray-700">Subtotal</td>
                  <td className="p-3 text-right text-gray-800">R$ 100,00</td>
                </tr>
                <tr className="border-b border-gray-400">
                  <td className="p-3 font-medium text-gray-700">Valor do frete</td>
                  <td className="p-3 text-right text-gray-800">R$ 10,00</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-black">Total</td>
                  <td className="p-3 text-right font-semibold text-black">
                    R$ 110,00
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="bg-[#E67E22] p-2 rounded-md text-white font-semibold w-full">
              Fazer pedido
            </button>
          </div>
  
          <div className="flex flex-col gap-2 w-full max-w-md">
            <label
              className="text-[#1b1b1b] text-sm lg:text-base"
              htmlFor="code"
            >
              Se você tiver um código promocional, insira-o aqui
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="code"
                placeholder="Insira o código aqui"
                className="flex-1 p-2 rounded-md border border-gray-300 bg-white"
              />
              <button className="bg-black text-white px-4 py-2 rounded-md">
                Enviar
              </button>
            </div>
          </div>
        </main>
      </section>
    );
  }
  