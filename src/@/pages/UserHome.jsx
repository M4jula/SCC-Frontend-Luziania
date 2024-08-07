import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import NavSidebar from "@/components/nav_sidebar";

import React, { useEffect, useState } from "react";
import { getApi } from "@/services/api";
import EditarComponent from "@/components/AlertasComponents/Usuarios/EditarComponent";
import MensagemCarregando from "@/components/AlertasComponents/Usuarios/Carregando";
import ErroAtualizar from "@/components/AlertasComponents/Usuarios/ErroAtualizar";
import AddUser from "@/components/AlertasComponents/Usuarios/AddUser";
import deleteUser from "@/components/AlertasComponents/Usuarios/ExcluirUser";
import ConfirmDeleteModal from "@/components/AlertasComponents/Usuarios/ConfirmaExcluir";

export default function HomeUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        setLoading(true);
        const api = await getApi();
        const response = await api.get("/home-usuarios");

        setUsuarios(response.data);
        setShowError(false);
      } catch (error) {
        console.error("Erro ao buscar dados dos Usuários:", error);
        setError(error.message);
        setShowError(true);
        setShowSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  const handleEditClose = (isSuccess) => {
    setIsEditModalOpen(false);
    if (isSuccess) {
      setShowSuccess(true); // Mostrar mensagem de sucesso somente em caso de sucesso
    }
  };
  const handleAddUserClose = () => {
    setIsAddUserModalOpen(false);
    // Mostrar mensagem de sucesso após adicionar um usuário
    setShowSuccess(true);
  };

  const handleDelete = (userId) => {
    setSelectedUser(userId); // Armazena o ID do usuário selecionado
    setIsConfirmDeleteModalOpen(true); // Abre o modal de confirmação
  };

  const confirmDelete = async () => {
    try {
      await deleteUser(selectedUser);
      setUsuarios(usuarios.filter((usuario) => usuario.id !== selectedUser));
      setShowSuccess(true);
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      setShowError(true);
    }
  };

  if (loading) return <MensagemCarregando open={loading} />;
  if (showError)
    return (
      <ErroAtualizar
        show={showError}
        onClose={() => setShowError(false)}
        message={error}
      />
    );

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = usuarios.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(usuarios.length / itemsPerPage);
  return (
    <NavSidebar>
      <div className="flex flex-col h-full">
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-[#2e3192]">USUÁRIOS</h1>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-[#2e3192] text-[#FFF]">
                  <th className="px-4 py-3 text-left">NOME</th>
                  <th className="px-4 py-3 text-left">E-MAIL</th>
                  <th className="px-4 py-3 text-left">FUNÇÃO</th>
                  <th className="px-4 py-3 text-right">AÇÕES</th>
                </tr>
              </thead>
              <tbody className="hover:text-[#ffff]">
                {currentUsers?.map((usuario) => (
                  <tr
                    className="border-b text-gray-600  hover:bg-[#2e3192] hover:text-[#fff] cursor-pointer "
                    key={usuario.id}
                    onClick={() => {
                      setSelectedUser(usuario);
                      setIsEditModalOpen(true);
                    }}
                  >
                    <td className="px-4 py-3 font-semibold  ">
                      {usuario?.nome}
                    </td>
                    {/**NOME */}
                    <td className="px-4 py-3 font-semibold  ">
                      {usuario?.email}
                    </td>
                    {/**EMAIL */}
                    <td className="px-4 py-3 font-semibold ">
                      {usuario?.acess}
                    </td>
                    {/**FUNÇÃO */}
                    <td className="px-4 py-3 text-right">
                      {/**AÇÕES */}

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation(); // Evita que o clique no botão acione o onClick da linha
                          handleDelete(usuario.id);
                        }}
                        className="text-red-500"
                      >
                        <TrashIcon className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex justify-between items-center">
            <Button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="bg-[#2e3192] text-white"
            >
              Anterior
            </Button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <Button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="bg-[#2e3192] text-white"
            >
              Próxima
            </Button>
          </div>
          <div className="mt-6 flex justify-end">
            <Button
              onClick={() => setIsAddUserModalOpen(true)}
              className="bg-green-600 text-white hover:bg-muted hover:text-green-600"
            >
              + USUÁRIO
            </Button>
            {/**Editar usuario */}
            {isEditModalOpen && selectedUser && (
              <EditarComponent
                user={selectedUser}
                open={isEditModalOpen}
                onClose={(isSuccess) => handleEditClose(isSuccess)}
                recarga={() => setLoading(true)} // Adicione a função de recarregar se necessário
              />
            )}

            {/**Criar usuario */}
            {isAddUserModalOpen && (
              <AddUser open={isAddUserModalOpen} onClose={handleAddUserClose} />
            )}
            {/**Confirmar exclusão */}
            {isConfirmDeleteModalOpen && (
              <ConfirmDeleteModal
                open={isConfirmDeleteModalOpen}
                onClose={() => setIsConfirmDeleteModalOpen(false)}
                onConfirm={confirmDelete}
              />
            )}
          </div>
        </main>
      </div>
    </NavSidebar>
  );
}

function FilePenIcon(props) {
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
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function TrashIcon(props) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
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
