import { Link } from "react-router-dom";
import { FormRestaurant } from "../components/register-form-restaurant";
import logo from "/logo.svg";
import { ArrowLeft } from "lucide-react";

export default function RegisterRestaurant() {
    return (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-0">
        <figure className="hidden lg:flex bg-gradient-to-t from-black to-[#1b1b1b] h-screen rounded-r-2xl relative">
                <div className="absolute -top-20 right-20 rounded-full bg-[#E67E22] blur-3xl opacity-50 brightness-50 w-72 h-72"></div>
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center">
                  <img src={logo} alt="Logo Click & Garfo" className="mx-auto mb-4" />
                  <h3 className="text-white text-2xl mt-2">
                    Entre e peça em segundos!
                    Sua comida a poucos cliques de distância.
                  </h3>
                  <p className="text-white/50 text-sm mt-2">
                    Cadastre seu restaurante para alcançar mais clientes.
                  </p>
                </div>
              </figure>
              <main className="flex flex-col justify-center items-center">
                <Link
            to="/register"
            className="flex items-center justify-center lg:justify-start gap-2 text-start"
          >
            <ArrowLeft className="text-[#E67E22]" size={18} />
            Voltar
          </Link>
                <FormRestaurant />
              </main>
        </section>
    )
}