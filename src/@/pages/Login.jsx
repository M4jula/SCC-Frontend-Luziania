"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getApi } from "@/services/api";
import MensagemCarregando from "@/components/AlertasComponents/Login/Carregando";
import MensagemErro from "@/components/AlertasComponents/Login/LoginError";
import LoginSucesso from "@/components/AlertasComponents/Login/LoginSucesso";
import { useUserContext } from "@/context/UserContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const api = await getApi();
      const response = await api.post(
        "/autentication",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      const { user, token } = response.data;
      localStorage.setItem("token", "kjadsfqweFEOENMCSAKOIWQHEEF5456");
      setUser(user);
      setSuccess(response.data.message);
      setError("");
      setShowError(false);
      setShowSuccess(true);
      navigate("/home");
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.error);
      } else {
        setError("Erro ao conectar com o servidor");
      }
      setSuccess("");
      setShowError(true);
      setShowSuccess(false);
    } finally {
      setLoading(false); // Para o carregamento
    }
  };

  // Definindo imagens como um array de objetos
  const [currentImage, setCurrentImage] = useState(0);
  const images = ["/img/Luziania_01.jpeg", "/img/Luziania_02.jpg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="flex min-h-screen">
      <div className="flex items-center justify-center w-full max-w-md p-4 bg-white">
        <Card className="w-full shadow-lg rounded-lg">
          <CardHeader className="flex flex-col items-center py-6  text-primary-foreground ">
            <img
              src="/img/logo_luziania.png"
              alt="Logo"
              width={100}
              height={100}
            />
            <CardTitle className="text-3xl font-bold mt-4 text-[#3f4196]">
              Cadastro Cidadão
            </CardTitle>
          </CardHeader>
          <CardContent className="px-8 py-6">
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-input bg-background focus:border-[#004b85] focus:outline-none text-lg"
              />
              <Input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-input bg-background focus:border-[#004b85] focus:outline-none text-lg"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center px-8 py-6 bg-[#3f4196] rounded-b-lg">
            <Button
              onClick={handleSubmit}
              className="w-full bg-[#ffff] text-[#3f4196] font-medium py-3 rounded-lg hover:bg-slate-200 hover:text-[#004b85] focus:outline-none focus:ring-2 text-lg"
            >
              Entrar
            </Button>
            <p className="mt-4 text-sm text-[#fff]">© 2024</p>
            <div className="flex items-center mt-4">
              <p className="ml-2 text-xs text-[#fff]">v1.0</p>
            </div>
          </CardFooter>
        </Card>
      </div>
      <div className="relative flex-1">
        <div className="relative w-full h-full overflow-hidden">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Carousel image ${index + 1}`}
              className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentImage ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>
      {loading && <MensagemCarregando />}
      {showError && (
        <MensagemErro
          show={showError}
          onClose={() => setShowError(false)}
          message={error}
        />
      )}
      {showSuccess && (
        <LoginSucesso
          show={showSuccess}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </div>
  );
}
