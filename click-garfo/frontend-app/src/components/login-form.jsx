import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Lock } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const formSchema = z.object({
  email: z
    .string()
    .email("Por favor, insira um e-mail válido."),
  password: z.string().min(8, "Sua senha precisa ter no mínimo 8 caracteres."),
});

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      console.log('Enviando requisição de login...');
      const response = await api.post('/users/login', {
        email,
        password,
      });

      console.log('Resposta recebida:', response.data);

      // Salvar o token no localStorage
      localStorage.setItem('token', response.data.token);
      
      setSuccess(`Olá ${response.data.user.name}! Bem-vindo à plataforma.`);
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      console.error("Erro no login:", error);
      console.error("Detalhes do erro:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      setError(error.response?.data?.message || "Erro ao fazer login. Verifique suas credenciais.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 md:p-0">
      <div className="bg-white w-full lg:w-[487px] p-8 rounded-xl border-1 border-[#D9D9D9] shadow-md mt-32">
        <div className="text-start flex flex-col gap-2">
          <h1 className="text-[#1b1b1b] font-semibold text-3xl">Log in</h1>
          <p className="text-black/50 text-start text-sm">
            Preencha os campos abaixo para entrar na plataforma.
          </p>
        </div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-4"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="email">E-mail</label>
            <div className="flex items-center border border-[#D9D9D9]/50 rounded-lg px-2 focus-within:border-[#E67E22] focus-within:ring-1 focus-within:ring-[#E67E22]">
              <input
                type="text"
                {...form.register("email")}
                placeholder="Digite seu email..."
                className="p-2 outline-none text-sm w-full bg-transparent"
              />
              <User size={18} className="text-[#1b1b1b]/50" />
            </div>
            {form.formState.errors.email && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
            )}
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
            {form.formState.errors.password && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.password.message}</p>
            )}
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
              <Link to="/register">Cadastrar-se</Link>
            </button>
            {success && <p className="text-green-500 text-sm text-center">{success}</p>}
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          </div>
        </form>
        <div className="flex items-center justify-center mt-4">
          <Link className="text-gray-500 text-sm underline text-center transition-all duration-700 hover:text-orange-500" to="/login-restaurant">
          Entrar como restaurante
          </Link>
        </div>
      </div>
    </div>
  );
}
