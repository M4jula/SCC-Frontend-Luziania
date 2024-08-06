import "tailwindcss/tailwind.css";
import { Link } from "react-router-dom";
import React from "react";
import NavSidebar from "@/components/nav_sidebar";
import { useUserContext } from "@/context/UserContext";

export default function Home() {
  const { user } = useUserContext();

  return (
    <NavSidebar>
      <section className="w-full h-[100vh] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900/80 z-10 pointer-events-none" />
        <img
          src="/img/planaltina_03.jpg"
          width={1920}
          height={1080}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover "
        />
        <div className="relative z-20 container h-full flex flex-col items-center justify-center px-4 md:px-6 text-center space-y-6">
          <div className="max-w-2xl space-y-4">
            {user ? (
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                Bem-vindo {user?.nome} ao Sistema de Cadastro Cidadão. SCC
              </h1>
            ) : (
              <p>Usuario Não autenticado</p>
            )}
            <p className="text-lg md:text-xl text-gray-300 dark:text-gray-300">
              nome do idealizador, e um breve discurso sobre as propostas dele.
            </p>

            <Link
              to={"#"}
              className="inline-flex h-10 items-center justify-center rounded-md bg-gray-50 px-8 text-sm font-medium text-gray-900 shadow transition-colors hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-900 dark:text-gray-50 dark:hover:bg-gray-800"
            >
              Saiba Mais
            </Link>
          </div>
        </div>
      </section>
    </NavSidebar>
  );
}
