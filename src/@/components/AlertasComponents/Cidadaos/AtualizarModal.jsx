import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import { getApi } from "@/services/api";
import FormataCelular from "@/services/FormatPhone";
import formatDate from "@/services/FormatData";
import InputMask from "react-input-mask";
import formatCEP from "@/services/FormatCEP";
import formatCPF from "@/services/FormatCPF";
import CadastroSucesso from "./CadastroSucesso";
import MensagemCarregando from "./Carregando";

export default function AtualizarModal({ isOpen, onClose, cidadaoId }) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    data_nasc: "",
    rg: "",
    cpf: "",
    endereco: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
    telefone: "",
    email: "",
    whatsapp: "",
    observacao: "",
  });

  useEffect(() => {
    if (isOpen && cidadaoId) {
      // Carregar dados do cidadão para edição
      const fetchCitizenData = async () => {
        setLoading(true);
        try {
          const api = await getApi();
          const response = await api.get(`/cidadaos/${cidadaoId}`);
          setFormData(response.data);
        } catch (error) {
          console.error("Erro ao carregar dados do cidadão:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchCitizenData();
    }
  }, [isOpen, cidadaoId]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const api = await getApi();
      const response = await api.put(
        `/cidadaos/atualizar/${cidadaoId}`, // Corrigido para usar o ID diretamente no endpoint
        formData
      );
      console.log("oq vem aqui?", response);

      if (response.status === 200) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          onClose();
        }, 2000);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Erro ao atualizar cidadão:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-[#004b85]">
            Atualizar Cidadão
          </DialogTitle>
          <DialogDescription>
            Altere os dados ou insira novos dados em um cadastro.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome" className="text-[#004b85]">
                  Nome <Label className="text-red-600">*</Label>
                </Label>
                <Input
                  id="nome"
                  placeholder="Digite o nome completo"
                  minLength={8}
                  maxLength={35}
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="data_nasc" className="text-[#004b85]">
                  Data de Nascimento <Label className="text-red-600">*</Label>
                </Label>
                <Input
                  id="data_nasc"
                  type="date"
                  value={formData.data_nasc}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rg" className="text-[#004b85]">
                  RG
                </Label>
                <Input
                  id="rg"
                  placeholder="Digite o RG"
                  minLength={9}
                  maxLength={9}
                  value={formData.rg}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf" className="text-[#004b85]">
                  CPF
                </Label>
                <Input
                  id="cpf"
                  placeholder="Digite o CPF"
                  value={formData.cpf}
                  onChange={handleChange}
                  minLength={11}
                  maxLength={11}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="endereco" className="text-[#004b85]">
                  Endereço <Label className="text-red-600">*</Label>
                </Label>
                <Input
                  id="endereco"
                  placeholder="Digite o endereço"
                  value={formData.endereco}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bairro" className="text-[#004b85]">
                  Bairro <Label className="text-red-600">*</Label>
                </Label>
                <Input
                  id="bairro"
                  placeholder="Digite o bairro"
                  value={formData.bairro}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cidade" className="text-[#004b85]">
                  Cidade
                </Label>
                <Input
                  id="cidade"
                  placeholder="Digite a cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="estado" className="text-[#004b85]">
                  Estado
                </Label>
                <Select
                  id="estado"
                  value={formData.estado}
                  onValueChange={(value) =>
                    setFormData((prevData) => ({ ...prevData, estado: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AC">Acre</SelectItem>
                    <SelectItem value="AL">Alagoas</SelectItem>
                    <SelectItem value="AP">Amapá</SelectItem>
                    <SelectItem value="AM">Amazonas</SelectItem>
                    <SelectItem value="BA">Bahia</SelectItem>
                    <SelectItem value="CE">Ceará</SelectItem>
                    <SelectItem value="DF">Distrito Federal</SelectItem>
                    <SelectItem value="ES">Espírito Santo</SelectItem>
                    <SelectItem value="GO">Goiás</SelectItem>
                    <SelectItem value="MA">Maranhão</SelectItem>
                    <SelectItem value="MT">Mato Grosso</SelectItem>
                    <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
                    <SelectItem value="MG">Minas Gerais</SelectItem>
                    <SelectItem value="PA">Pará</SelectItem>
                    <SelectItem value="PB">Paraíba</SelectItem>
                    <SelectItem value="PR">Paraná</SelectItem>
                    <SelectItem value="PE">Pernambuco</SelectItem>
                    <SelectItem value="PI">Piauí</SelectItem>
                    <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                    <SelectItem value="RN">Rio Grande do Norte</SelectItem>
                    <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                    <SelectItem value="RO">Rondônia</SelectItem>
                    <SelectItem value="RR">Roraima</SelectItem>
                    <SelectItem value="SC">Santa Catarina</SelectItem>
                    <SelectItem value="SP">São Paulo</SelectItem>
                    <SelectItem value="SE">Sergipe</SelectItem>
                    <SelectItem value="TO">Tocantins</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cep" className="text-[#004b85]">
                  CEP
                </Label>
                <Input
                  id="cep"
                  placeholder="Digite o CEP"
                  value={formData.cep}
                  onChange={handleChange}
                  maxLength={9}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone" className="text-[#004b85]">
                  Telefone
                </Label>
                <Input
                  id="telefone"
                  placeholder="Digite o telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#004b85]">
                  Email <Label className="text-red-600">*</Label>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite o email"
                  maxLength={35}
                  minLength={10}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp" className="text-[#004b85]">
                  WhatsApp <Label className="text-red-600">*</Label>
                </Label>
                <Input
                  id="whatsapp"
                  placeholder="Digite o WhatsApp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="observacao" className="text-[#004b85]">
                Observações
              </Label>
              <Textarea
                id="observacao"
                placeholder="Digite as observações"
                maxLength={250}
                value={formData.observacao}
                onChange={handleChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="ml-auto bg-yellow-400 hover:bg-muted hover:text-yellow-400"
            >
              Atualizar
            </Button>
            <div>
              <Button
                variant="outline"
                onClick={onClose}
                className="text-red-600 hover:bg-red-600 hover:text-[#fff]"
              >
                Fechar
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
      <MensagemCarregando open={loading} />
      <CadastroSucesso
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </Dialog>
  );
}
