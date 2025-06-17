import {
  Box,
  Home,
  LogOut, 
  ShoppingCart,
  UtensilsCrossed,
  Menu,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const routes = [
  { icon: Home, route: "Início", href: "/home" },
  { icon: UtensilsCrossed, route: "Restaurantes", href: "/restaurants" },
  { icon: ShoppingCart, route: "Meu carrinho", href: "/cart" },
  { icon: Box, route: "Meus favoritos", href: "/favorites" },
  { icon: LogOut, route: "Sair", href: "/ " },
];

export function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botão mobile */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 bg-white border border-[#E67E22] rounded-lg"
        >
          <Menu size={24} className="text-[#E67E22]" />
        </button>
      </div>

      {/* Sidebar Mobile (Sheet) */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex">
          {/* Backdrop */}
          <div
            className="bg-black/40 w-full h-full"
            onClick={() => setIsOpen(false)}
          />
          {/* Sidebar */}
          <aside className="bg-white p-6 border-r border-[#E67E22] w-64 h-full z-50 relative animate-slide-in">
            {/* Botão fechar */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4"
            >
              <X size={24} className="text-[#E67E22]" />
            </button>

            <div className="mb-6">
              <img src="/Logo_secondary.svg" alt="Logo" />
            </div>

            <nav className="flex flex-col gap-6 items-start">
              <ul className="flex flex-col justify-start items-start gap-6">
                {routes.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <li className="w-full" key={index}>
                      <Link
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-r-2xl transition-colors ${
                          isActive
                            ? "bg-[#E67E22]/20 text-[#1b1b1b]"
                            : "text-[#333] hover:text-[#E67E22]"
                        }`}
                      >
                        <Icon size={20} />
                        <span>{item.route}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>
        </div>
      )}

      {/* Sidebar Desktop (sem alterações) */}
      <aside className="bg-white p-6 border border-[#E67E22] rounded-r-4xl w-16 sm:w-20 lg:w-56 h-screen hidden md:block">
        <nav className="flex flex-col gap-6 items-start">
          <ul className="flex flex-col justify-start items-start gap-6">
            <div className="hidden md:flex">
              <img src="/Logo_secondary.svg" alt="" />
            </div>
            {routes.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <li className="w-full" key={index}>
                  <Link
                    to={item.href}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-r-2xl transition-colors ${
                      isActive
                        ? "md:bg-[#E67E22]/20 text-[#1b1b1b] lg:w-42"
                        : "text-[#333] hover:text-[#E67E22]"
                    }`}
                  >
                    <Icon size={20} />
                    <span className="hidden lg:block">{item.route}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
