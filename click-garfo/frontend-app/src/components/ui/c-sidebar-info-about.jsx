export function SidebarAboutRestaurant() {
    return (
        <aside className="h-screen bg-white w-1/2 p-4 rounded-l-md">
            <div className="flex flex-col gap-2">
             <p className="text-[#1B1B1B]/80 max-w-[300px] text-center lg:text-start">
             O melhor hambúrguer de Salvador. #burger #batatafrita #aioli #bacon #almoco #artesanal #executivo #lanche #cheddar #combo #smash #hamburger #artesanal #hamburgueria #hamburgueriaartesanal #crispy #bbq #chicken #frango #vegetariano #falafel #gorgonzola #maionese #picles #carne #queijo
             </p>
             <div className="flex flex-col gap-2">
              <h3 className="text-[#1B1B1B] font-semibold">Endereço</h3>
              <ul className="flex flex-col gap-1">
                <li className="text-sm lg:text-base text-[#1b1b1b]/80">R Alexandre Herculano, 45 - Pituba</li>
                <li className="text-sm lg:text-base text-[#1B1B1B]/80">Salvador - BA</li>
                <li className="text-sm lg:text-base text-[#1B1B1B]/80">CEP: 41810-395</li>
              </ul>
              <ul className="flex flex-col gap-2">
              <li className="text-sm lg:text-base text-[#1B1B1B]/80">Segunda-feira <br /> 
              11:00 às 23:00
              </li>
              <li className="text-sm lg:text-base text-[#1B1B1B]/80">Terça-feira <br /> 
              11:00 às 23:00
              </li>
              <li className="text-sm lg:text-base text-[#1B1B1B]/80">Quarta-feira <br /> 
              11:00 às 23:00
              </li>
              <li className="text-sm lg:text-base text-[#1B1B1B]/80">Quinta-feira <br /> 
              11:00 às 23:00
              </li>
              <li className="text-sm lg:text-base text-[#1B1B1B]/80">Sexta-feira <br /> 
              11:00 às 23:59
              </li>
              <li className="text-sm lg:text-base text-[#1B1B1B]/80">Sábado <br /> 
              11:00 às 23:59
              </li>
              <li className="text-sm lg:text-base text-[#1B1B1B]/80">Domingo <br /> 
              11:00 às 23:00
              </li>
              </ul> 
             </div>
             <div className="flex flex-col gap-1">
                <h1 className="text-black font-medium text-xl">Pagamento pelo site</h1>
                <div className="p-2 border-1 border-[#D9D9D9]/20 flex items-center gap-1">
                 <img src="/PIX.svg" alt="" className="w-24 h-24" />
                 <h3 className="text-[#1B1B1B] font-normal text-sm lg:text-base">PIX</h3>
                </div>
             </div>
            </div>
        </aside>
    )
}