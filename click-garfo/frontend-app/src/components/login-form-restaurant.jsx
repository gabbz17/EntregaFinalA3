import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Lock } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const formSchema = z.object({
  name: z
    .string()
    .min(4, "Por favor preencha este campo, o nome do restaurante é obrigatório."),
  password: z.string().min(8, "A senha precisa ter no mínimo 8 caracteres."),
});

export function LoginFormRestaurant() {
  const [isLoading, setIsLoading] = useState(false);
  const [isAceppted, setIsAceppted] = useState("");

  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const { name, password } = data;
    setIsLoading(true);
    try {
      const response = await axios.post("api/rota/do/formulario", {
        name,
        password,
      });
      console.log("Login feito com sucesso:", response.data);
      setIsAceppted(`Restaurante ${name} logado com sucesso!`);
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      console.error("Erro na requisição POST:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="p-8 md:p-0">
      <div className="bg-white w-full lg:w-[487px] p-8 rounded-xl border-1 border-[#D9D9D9] shadow-md mt-32">
        <div className="text-start flex flex-col gap-2">
          <h1 className="text-[#1b1b1b] font-semibold text-3xl">Login para Restaurantes</h1>
          <p className="text-black/50 text-start text-sm">
            Acesse sua conta de restaurante na plataforma.
          </p>
        </div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-4"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Nome do Restaurante</label>
            <div className="flex items-center border border-[#D9D9D9]/50 rounded-lg px-2 focus-within:border-[#E67E22] focus-within:ring-1 focus-within:ring-[#E67E22]">
              <input
                type="text"
                {...form.register("name")}
                placeholder="Digite o nome do restaurante..."
                className="p-2 outline-none text-sm w-full bg-transparent"
              />
              <User size={18} className="text-[#1b1b1b]/50" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Senha</label>
            <div className="flex items-center border border-[#D9D9D9]/50 rounded-lg px-2 focus-within:border-[#E67E22] focus-within:ring-1 focus-within:ring-[#E67E22]">
              <input
                type="password"
                {...form.register("password")}
                placeholder="Digite sua senha..."
                className="p-2 outline-none text-sm w-full bg-transparent"
              />
              <Lock size={18} className="text-[#1b1b1b]/50" />
            </div>
            <p className="text-[#1b1b1b] text-end text-sm cursor-pointer">
              Esqueceu sua senha?
            </p>
          </div>

          <div className="w-full flex flex-col gap-3 mt-4">
            <button
              disabled={isLoading}
              type="submit"
              className="w-full cursor-pointer bg-[#E67E22] rounded-lg text-white font-semibold py-2"
            >
              {isLoading ? "Carregando..." : "Entrar"}
            </button>
            <button className="w-full cursor-pointer bg-[#F5F5F5] rounded-lg text-[#1b1b1b] font-semibold border-1 border-[#D9D9D9] py-2">
              <Link to="/register-restaurant">Cadastrar restaurante</Link>
            </button>
            <p className="text-green-500 text-sm text-center">{isAceppted}</p>
          </div>
        </form>
      </div>
    </div>
  );
}
