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

export default function CidadaoHome() {
  const [cidadaos, setCidadaos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCidadaos = async () => {
      try {
        const api = await getApi();
        const response = await api.get("/cidadaos");
        setCidadaos(response.data);
        setError(null);
      } catch (error) {
        console.error("Erro ao buscar dados dos cidadãos:", error);
        setError("Erro ao buscar dados dos cidadãos.");
      } finally {
        setLoading(false);
      }
    };

    fetchCidadaos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Você tem certeza que deseja excluir este cidadão?")) {
      try {
        const api = await getApi();
        await api.delete(`/cidadaos/${id}`);
        setCidadaos(cidadaos.filter((cidadao) => cidadao.id !== id));
      } catch (error) {
        console.error("Erro ao excluir cidadão:", error);
        setError("Erro ao excluir cidadão.");
      }
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <NavSidebar>
      <div className="bg-white text-[#004b85]">
        <header className="bg-[#004b85] py-4 px-6">
          <h1 className="text-2xl font-bold text-white">CIDADÃOS</h1>
        </header>
        <main className="p-6">
          <div className="mb-4 flex justify-end">
            <Button className="bg-green-700 hover:bg-muted hover:text-green-700">
              + CIDADÃO
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-[#004b85] hover:bg-[#004b85] text-[#FFF]">
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
              {cidadaos.map((cidadao) => (
                <TableRow
                  key={cidadao.id}
                  className="border-b text-gray-600  hover:bg-[#004b85] hover:text-[#fff] cursor-pointer "
                >
                  <TableCell className="px-4 py-3 font-semibold  ">
                    {cidadao.id}
                  </TableCell>
                  <TableCell className="px-4 py-3 font-semibold  ">
                    {cidadao.nome}
                  </TableCell>
                  <TableCell className="px-4 py-3 font-semibold  ">
                    {cidadao.email}
                  </TableCell>
                  <TableCell className="px-4 py-3 font-semibold  ">
                    {cidadao.data_nasc}
                  </TableCell>
                  <TableCell className="px-4 py-3 font-semibold  ">
                    {cidadao.bairro}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(cidadao.id)}
                      >
                        <TrashIcon className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </main>
        {/** Criar Cidadão */}
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
