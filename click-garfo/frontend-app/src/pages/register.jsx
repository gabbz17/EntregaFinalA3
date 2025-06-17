import { Link } from "react-router-dom";
import { RegisterForm } from "../components/register-form";
import logo from "/logo.svg";
import { ArrowLeft } from "lucide-react";

export default function Register() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="size-full bg-gradient-to-r from-black to-[#1b1b1b] rounded-r-3xl relative">
        <figure className="hidden lg:flex h-72 w-72 rounded-full blur-3xl brightness-50 bg-[#E67E22] absolute right-20 opacity-50 -top-24"></figure>
        <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 text-center">
          <img src={logo} alt="Logo Click & Garfo" className="mx-auto mb-4" />
          <h3 className="text-white text-2xl mt-2">
            Entre e peça em segundos! Sua comida a poucos cliques de distância.
          </h3>
          <p className="text-white/50 text-sm mt-2">
            Faça login para acessar restaurantes perto de você, repetir seus
            pedidos favoritos e receber tudo com agilidade.
          </p>
        </div>
      </div>
      <div className="mt-6">
      <Link
            to="/"
            className="flex items-center justify-center lg:justify-start gap-2 text-start"
          >
            <ArrowLeft className="text-[#E67E22]" size={18} />
            Voltar
          </Link>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div>
          <RegisterForm />
        </div>
      </div>
      </div>
    </section>
  );
}
