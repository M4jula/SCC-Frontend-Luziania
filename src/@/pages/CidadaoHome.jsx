import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { getApi } from "@/services/api";
import NavSidebar from "@/components/nav_sidebar";
import CadastroModal from "@/components/AlertasComponents/Cidadaos/CadastroModal";
import formatDate from "@/services/FormatData";
import MensagemCarregando from "@/components/AlertasComponents/Cidadaos/Carregando";
import AtualizarModal from "@/components/AlertasComponents/Cidadaos/AtualizarModal";
import ConfirmDeleteModal from "@/components/AlertasComponents/Cidadaos/ConfirmarExcluir";

export default function CidadaoHome() {
  const [cidadaos, setCidadaos] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCidadaoId, setSelectedCidadaoId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [cidadaoData, setCidadaoData] = useState(null);

  useEffect(() => {
    const fetchCidadaos = async () => {
      try {
        setLoading(true);
        const api = await getApi();
        const response = await api.get("/cidadaos");
        setCidadaos(response.data);
        setError(null);
      } catch (error) {
        console.error("Erro ao buscar dados dos cidadãos:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCidadaos();
  }, []);

  const handleEditClose = (isSuccess) => {
    setIsEditModalOpen(false);
    if (isSuccess) {
      setShowSuccess(true);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openDeleteModal = (cidadaoId) => {
    setSelectedCidadaoId(cidadaoId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedCidadaoId(null);
  };

  const confirmDelete = async () => {
    if (!selectedCidadaoId) return;

    try {
      const api = await getApi();
      await api.delete(`/cidadao/${selectedCidadaoId}`); // Corrigido para corresponder à rota da API
      setCidadaos(
        cidadaos.filter((cidadao) => cidadao.id !== selectedCidadaoId)
      );
    } catch (error) {
      console.error("Erro ao excluir cidadão:", error);
      setError("Erro ao excluir cidadão.");
    }
  };

  if (error) return <div>{error}</div>;

  const indexOfLastCidadaos = currentPage * itemsPerPage;
  const indexOfFirstCidadao = indexOfLastCidadaos - itemsPerPage;
  const currentCidadaos = cidadaos.slice(
    indexOfFirstCidadao,
    indexOfLastCidadaos
  );
  const totalPages = Math.ceil(cidadaos.length / itemsPerPage);
  return (
    <NavSidebar>
      <div className="bg-white text-[#004b85]">
        <header className="bg-[#2e3192] py-4 px-6">
          <h1 className="text-2xl font-bold text-white">CIDADÃOS</h1>
        </header>
        <main className="p-6">
          <div className="mb-4 flex justify-end">
            <Button
              className="bg-green-700 hover:bg-muted hover:text-green-700"
              onClick={openModal}
            >
              + CIDADÃO
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-[#2e3192] hover:bg-[#2e3192] text-[#FFF]">
                <TableHead className="px-4 py-3 text-left text-[#fff]">
                  ID
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-[#fff]">
                  NOME
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-[#fff]">
                  E-MAIL
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-[#fff]">
                  DATA NASC
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-[#fff]">
                  BAIRRO
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-[#fff]">
                  OPÇÕES
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentCidadaos?.map((cidadao) => (
                <TableRow
                  key={cidadao.id}
                  onClick={() => {
                    setSelectedCidadaoId(cidadao);
                    setIsEditModalOpen(true);
                  }}
                  className="border-b text-gray-600  hover:bg-[#2e3192] hover:text-[#fff] cursor-pointer "
                >
                  <TableCell className="px-4 py-3 font-semibold  ">
                    {cidadao?.id}
                  </TableCell>
                  <TableCell className="px-4 py-3 font-semibold  ">
                    {cidadao?.nome}
                  </TableCell>
                  <TableCell className="px-4 py-3 font-semibold  ">
                    {cidadao?.email}
                  </TableCell>
                  <TableCell className="px-4 py-3 font-semibold  ">
                    {formatDate(cidadao?.data_nasc)}
                  </TableCell>
                  <TableCell className="px-4 py-3 font-semibold  ">
                    {cidadao?.bairro}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          openDeleteModal(cidadao.id);
                        }}
                      >
                        <TrashIcon className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
        </main>
        {/** Criar Cidadão */}
        <MensagemCarregando open={loading} />
        <CadastroModal isOpen={isModalOpen} onClose={closeModal} />
        {isEditModalOpen && selectedCidadaoId && (
          <AtualizarModal
            cidadao={selectedCidadaoId}
            open={isEditModalOpen}
            onClose={(isSuccess) => handleEditClose(isSuccess)}
            recarga={() => setLoading(true)}
          />
        )}

        <ConfirmDeleteModal
          open={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={confirmDelete}
        />
      </div>
    </NavSidebar>
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
