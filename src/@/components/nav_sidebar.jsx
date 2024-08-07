import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useUserContext } from "@/context/UserContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import EditProfileModal from "@/components/AlertasComponents/Usuarios/EditPerfil";
import Footer from "./footer";
export default function NavSidebar({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUserContext();

  const handleIconClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="flex min-h-screen">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-muted transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2 mb-5 ml-14">
            <Link to={"/home"} prefetch={false}>
              <img
                src="/img/logo_luziania.png"
                alt="Company Logo"
                width={90}
                height={100}
                className="text-white"
              />
            </Link>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
          >
            <XIcon className="w-6 h-6 text-red-600" />
          </Button>
        </div>
        <nav className="p-4 space-y-4 text-lg ">
          <div className="flex items-center gap-2 text-[#2e3192] hover:bg-[#2e3192] hover:text-[#fff] hover:rounded-md p-2 transition-colors ">
            <HomeIcon className="w-5 h-5" />
            <Link to={"/home"} className="flex items-center w-full">
              Home
            </Link>
          </div>
          <div className="flex items-center gap-2 text-[#2e3192] hover:bg-[#2e3192] hover:text-[#fff] hover:rounded-md p-2 transition-colors ">
            <UsersIcon className="w-5 h-5" />
            <Link to={"/usuarios"} className="flex items-center w-full">
              Usuários
            </Link>
          </div>
          <div className="flex items-center gap-2 text-[#2e3192] hover:bg-[#2e3192] hover:text-[#fff] hover:rounded-md p-2 transition-colors ">
            <FileTextIcon className="w-5 h-5" />
            <Link to={"/cidadaos"} className="flex items-center w-full">
              Cidadãos
            </Link>
          </div>
          <div className="flex items-center gap-2 text-[#2e3192] hover:bg-[#2e3192] hover:text-[#fff] hover:rounded-md p-2 transition-colors ">
            <CalendarIcon className="w-5 h-5" />
            <Link to={"/solicitacoes"} className="flex items-center w-full">
              Solicitações
            </Link>
          </div>
          <div className="flex items-center gap-2 text-[#2e3192] hover:bg-[#2e3192] hover:text-[#fff] hover:rounded-md p-2 transition-colors ">
            <ClipboardIcon className="w-5 h-5" />
            <Link to={"#"} className="flex items-center w-full">
              Relatórios
            </Link>
          </div>
        </nav>
      </aside>
      <div className="flex flex-col flex-1">
        <header className="flex items-center justify-between p-4 bg-gradient-to-r from-[#39b54a] to-[#2e3192]">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
          >
            <MenuIcon className="w-6 h-6 text-white" />
          </Button>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">
              Sistema Cadastro Cidadão
            </h1>
            <p className="text-sm text-white">Luziânia</p>
          </div>
          <div className="flex items-center space-x-2">
            <div onClick={handleIconClick} style={{ cursor: "pointer" }}>
              <Avatar>
                <AvatarImage src="/img/user-icon.jpg" />
                <AvatarFallback></AvatarFallback>
              </Avatar>
            </div>
            {user ? (
              <div className="text-white">
                <p>Olá, {user?.email || ""}</p>
                {/**Adicionar regra que pega na sessão o email do usuario */}
                <p>{user?.acess || ""}</p>
                {/**Adicionar regra que pega na sessão o nome do usuario */}
              </div>
            ) : (
              <p>Usuario Não autenticado</p>
            )}
          </div>
        </header>
        <main className="flex-1 p-4 space-y-4 bg-gray-50">
          {/**Todo o conteudo das minhas paginas */}
          {children}
        </main>
        <Footer />
      </div>
      {isModalOpen && (
        <EditProfileModal user={user} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function ClipboardIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  );
}

function FileTextIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  );
}

function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
