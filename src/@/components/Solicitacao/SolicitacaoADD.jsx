import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { useState, useEffect } from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import MapComponent from "./MAPA";
import axios from "axios";
import CidadaoSelect from "./ListarCidadãos";
import { getApi } from "@/services/api";

export default function SolicitacaoADD({ isOpen, onClose }) {
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [formData, setFormData] = useState({
    nome: "",
    origem_cont: "",
    categoria: "",
    solicitacao: "",
    retorno: "",
    endereco: "",
    urgencia: "",
    status_sol: "",
  });
  const [file, setFile] = useState(null);

  if (!isOpen) return null;

  const handleLocationSelect = async (latlng) => {
    setLocation(`Latitude: ${latlng.lat}, Longitude: ${latlng.lng}`);

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${latlng.lat}&lon=${latlng.lng}&format=json`
      );
      setAddress(response.data.display_name || "Endereço não encontrado");
    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
      setAddress("Erro ao buscar endereço");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (file) {
      data.append("arquivo", file);
    }

    try {
      const api = await getApi();
      const response = await api.post("/solicitacao", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data.message);
      // Aqui você pode exibir uma mensagem de sucesso ou fazer outra ação
    } catch (error) {
      console.error("Erro ao cadastrar solicitação:", error);
      // Aqui você pode exibir uma mensagem de erro
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Card className="max-w-4xl mx-auto p-6 sm:p-8 md:p-10">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-[#2e3192]">
            Cadastrar Solicitação
          </CardTitle>
          <CardDescription>
            Informe os detalhes da sua solicitação.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome" className="text-[#2e3192]">
                  Cidadão
                </Label>
                {/**Componente de listagem de cidadãos */}
                <Input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                ></Input>

                <p className="text-sm text-muted-foreground">
                  Caso o cidadão não esteja cadastrado, clique em "Cadastrar
                  Cidadão" para adicionar um novo.
                </p>
                <Link to={"/cidadaos"}>
                  <Button
                    className="bg-green-600 text-[#fff] hover:bg-muted hover:text-green-600"
                    variant="outline"
                  >
                    Cadastrar Cidadão
                  </Button>
                </Link>
              </div>
              <div className="space-y-2">
                <Label htmlFor="categoria" className="text-[#2e3192]">
                  Categoria
                </Label>
                <Select
                  id="categoria"
                  name="categoria"
                  value={formData.categoria}
                  onValueChange={(value) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      categoria: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="infraestrutura">
                      Infraestrutura
                    </SelectItem>
                    <SelectItem value="limpeza_urbana">
                      Limpeza Urbana
                    </SelectItem>
                    <SelectItem value="saude_publica">Saúde</SelectItem>
                    <SelectItem value="educacao">Educação</SelectItem>
                    <SelectItem value="seguranca_publica">Segurança</SelectItem>
                    <SelectItem value="meio_ambiente">Meio Ambiente</SelectItem>
                    <SelectItem value="servicos_sociais">
                      Serviços Sociais
                    </SelectItem>
                    <SelectItem value="impostos"> Impostos</SelectItem>
                    <SelectItem value="tecnologia_inovacao">
                      Tecnologia e Inovação
                    </SelectItem>
                    <SelectItem value="cultura_lazer">
                      Cultura e Lazer
                    </SelectItem>
                    <SelectItem value="transporte_publico">
                      Transporte Publico
                    </SelectItem>
                    <SelectItem value="planejamento_urbano">
                      Planejamento Urbano
                    </SelectItem>
                    <SelectItem value="5">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="origem_cont" className="text-[#2e3192]">
                  Origem do Contato
                </Label>
                <Select
                  id="origem_cont"
                  name="origem_cont"
                  value={formData.origem_cont}
                  onValueChange={(value) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      origem_cont: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a Origem do Contato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="whatsapp">Whatsapp</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="domicilio">Domicílio</SelectItem>
                    <SelectItem value="5">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="solicitacao" className="text-[#2e3192]">
                  Solicitação
                </Label>
                <Textarea
                  id="solicitacao"
                  name="solicitacao"
                  rows={4}
                  value={formData.solicitacao}
                  onChange={handleChange}
                  placeholder="Descreva sua solicitação"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="retorno" className="text-[#2e3192]">
                  Retorno do Atendimento
                </Label>
                <Textarea
                  id="retorno"
                  name="retorno"
                  rows={4}
                  value={formData.retorno}
                  onChange={handleChange}
                  placeholder="Informe como você gostaria de receber o retorno"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="urgencia" className="text-[#2e3192]">
                  Urgência
                </Label>
                <Select
                  id="urgencia"
                  name="urgencia"
                  value={formData.urgencia}
                  onValueChange={(value) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      urgencia: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a Urgência" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baixa">Baixa</SelectItem>
                    <SelectItem value="media">Media</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                  </SelectContent>
                </Select>
                <Label htmlFor="status_sol" className="text-[#2e3192]">
                  Status
                </Label>
                <Select
                  id="status_sol"
                  name="status_sol"
                  value={formData.status_sol}
                  onValueChange={(value) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      status_sol: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recebido">Recebido</SelectItem>
                    <SelectItem value="analise">Análise</SelectItem>
                    <SelectItem value="encaminhado">Encaminhado</SelectItem>
                    <SelectItem value="concluido">Concluido</SelectItem>
                  </SelectContent>
                </Select>
                <Label htmlFor="endereco" className="text-[#2e3192]">
                  Localização
                </Label>
                <div className="">
                  <Input
                    id="endereco"
                    name="endereco"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Endereço da solicitação"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    className="absolute top-1/2 right-2 -translate-y-1/2"
                  >
                    <MapPinIcon className="w-5 h-5" />
                  </Button>
                </div>
                <div className="relative h-[300px] w-full bg-muted rounded-md overflow-hidden">
                  <MapComponent onLocationSelect={handleLocationSelect} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="arquivo" className="text-[#2e3192]">
                  Fotos
                </Label>
                <Input
                  id="arquivo"
                  name="arquivo"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  multiple
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              className="bg-red-600 text-[#fff] hover:bg-muted hover:text-red-600"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-[#2e3192] text-[#fff] hover:bg-muted hover:text-[#2e3192]"
            >
              Cadastrar Solicitação
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

function MapPinIcon(props) {
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
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
