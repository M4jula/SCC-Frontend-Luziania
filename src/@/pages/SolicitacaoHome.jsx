import { useState, useMemo, useEffect } from "react";
import { getApi } from "@/services/api";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import NavSidebar from "@/components/nav_sidebar";
import formatDate from "@/services/FormatData";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import SolicitacaoADD from "@/components/Solicitacao/SolicitacaoADD";

const DAYS_NEW_THRESHOLD = 3;

export default function SolicitacaoHome() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchSolicitacoes = async () => {
      try {
        const api = await getApi();
        const response = await api.get("/solicitacoes");
        setSolicitacoes(response.data.solicitacoes);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar solicitações:", error);
        setError("Erro ao carregar solicitações");
        setLoading(false);
      }
    };

    fetchSolicitacoes();
  }, []);

  const isNewRequest = (dateString) => {
    const createdDate = new Date(dateString);
    const now = new Date();
    const daysDifference = (now - createdDate) / (1000 * 60 * 60 * 24);
    return daysDifference <= DAYS_NEW_THRESHOLD;
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <NavSidebar>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#2e3192]">Solicitações</h1>
          <div className="flex items-center gap-4">
            <Button
              className="flex items-center gap-2 bg-green-600 hover:text-green-600 hover:bg-muted"
              onClick={openModal}
            >
              <PlusIcon className="w-4 h-4" />
              <span>SOLICITAÇÃO</span>
            </Button>
          </div>
        </div>
        <Table className="border rounded-lg ">
          <TableHeader>
            <TableRow className="bg-[#2e3192] hover:bg-[#2e3192] ">
              <TableHead className="w-[200px] text-[#fff]  p-4">
                SOLICITANTE
              </TableHead>
              <TableHead className="w-[150px] text-[#fff]  p-4">
                CATEGORIA
              </TableHead>
              <TableHead className="w-[150px] text-[#fff] p-4">DATA</TableHead>
              <TableHead className="w-[150px] text-[#fff]  p-4">
                URGÊNCIA
              </TableHead>
              <TableHead className="w-[150px] text-[#fff]  p-4">
                STATUS
              </TableHead>
              <TableHead className="w-[200px] text-[#fff]  p-4">
                LIDERANÇA
              </TableHead>
              <TableHead className="w-[200px] text-[#fff]  p-4">
                OPÇÕES
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {solicitacoes.map((solicitacao) => (
              <TableRow
                className=" transition-colors hover:bg-[#2e3192] hover:text-[#fff] font-semibold text-gray-600"
                key={solicitacao.id}
              >
                <TableCell className="p-4">
                  {isNewRequest(solicitacao?.data_sol) && (
                    <FiberNewIcon className="w-4 h-4 text-red-500 mr-2" />
                  )}
                  {solicitacao?.nome}
                </TableCell>
                <TableCell className="p-4">{solicitacao?.categoria}</TableCell>
                <TableCell className="p-4">
                  {formatDate(solicitacao?.data_sol)}
                </TableCell>
                <TableCell className="p-4">{solicitacao?.urgencia}</TableCell>
                <TableCell className="p-4">{solicitacao?.status_sol}</TableCell>
                <TableCell className="p-4">
                  {solicitacao["usuarioCadastrou.nome"]}
                </TableCell>
                <TableCell className="p-4">
                  <Button variant="ghost" size="icon" className="text-red-500">
                    <TrashIcon className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <SolicitacaoADD isOpen={isModalOpen} onClose={closeModal} />
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

function FilterIcon(props) {
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function ListOrderedIcon(props) {
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
      <line x1="10" x2="21" y1="6" y2="6" />
      <line x1="10" x2="21" y1="12" y2="12" />
      <line x1="10" x2="21" y1="18" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </svg>
  );
}

function PlusIcon(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
