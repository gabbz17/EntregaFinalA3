export function PaymentForPixWebsite() {
   return (
    <div className="flex flex-col gap-3">
    <div className="mt-8">
        <h1 className="text-xl text-[#E67E22] mb-0.5">Pague pelo site</h1>
        <div className="h-1 w-36 rounded-md bg-[#E67E22]"></div>
    </div>
    <div>
        <button type="button" className="cursor-pointer p-2 border-1 border-[#D9D9D9] rounded-md flex items-center gap-2">
            <img src="/PIX_symbol.svg" alt="" />
            <div className="flex flex-col justify-start items-start gap-1">
                <h1 className="text-[#1b1b1b] text-base">Pague com PIX</h1>
                <p className="text-gray-500 text-sm text-start">Use o QR Code ou copie e cole o código</p>
            </div>
        </button>
    </div>
    <input type="number" placeholder="CPF/CNPJ na nota" className="p-2 w-full md:w-1/2 lg:w-1/4 bg-white rounded-md" />
    </div>
   )
}