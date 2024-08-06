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
import ErroAtualizar from "./ErroAtualizar";
import UpdateSucesso from "./UpdateSucesso";

export default function AtualizarModal({ open, onClose, cidadao }) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [cidadaoData, setCidadaoData] = useState(null);
  const [selectedCidadaoId, setSelectedCidadaoId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState(cidadao.nome);
  const [data_nasc, setData_nasc] = useState(cidadao.data_nasc);
  const [rg, setRG] = useState(cidadao.rg || "");
  const [cpf, setCPF] = useState(cidadao.cpf || "");
  const [endereco, setEndereco] = useState(cidadao.endereco || "");
  const [bairro, setBairro] = useState(cidadao.bairro || "");
  const [cidade, setCidade] = useState(cidadao.cidade || "");
  const [estado, setEstado] = useState(cidadao.estado || "");
  const [cep, setCEP] = useState(cidadao.cep || "");
  const [telefone, setTelefone] = useState(cidadao.telefone || "");
  const [email, setEmail] = useState(cidadao.email || "");
  const [whatsapp, setWhatsapp] = useState(cidadao.whatsapp || "");
  const [observacao, setObservacao] = useState(cidadao.observacao || "");

  useEffect(() => {
    if (cidadao) {
      setNome(cidadao.nome);
      setEmail(cidadao.email);
      setData_nasc(cidadao.data_nasc);
      setRG(cidadao.rg || "");
      setCPF(cidadao.cpf || "");
      setEndereco(cidadao.endereco || "");
      setBairro(cidadao.bairro || "");
      setCidade(cidadao.cidade || "");
      setEstado(cidadao.estado || "");
      setTelefone(cidadao.telefone || "");
      setWhatsapp(cidadao.whatsapp || "");
      setObservacao(cidadao.observacao || "");
      setCEP(cidadao.cep || "");
    }
  }, [cidadao]);

  const handleUpdate = async () => {
    try {
      const updates = {}; // Objeto para armazenar apenas os campos alterados

      if (nome !== cidadao.nome) updates.nome = nome;
      if (email !== cidadao.email) updates.email = email;
      if (data_nasc !== cidadao.data_nasc) updates.data_nasc = data_nasc;
      if (rg !== cidadao.rg) updates.rg = rg;
      if (cpf !== cidadao.cpf) updates.cpf = cpf;
      if (endereco !== cidadao.endereco) updates.endereco = endereco;
      if (bairro !== cidadao.bairro) updates.bairro = bairro;
      if (cidade !== cidadao.cidade) updates.cidade = cidade;
      if (estado !== cidadao.estado) updates.estado = estado;
      if (telefone !== cidadao.telefone) updates.telefone = telefone;
      if (whatsapp !== cidadao.whatsapp) updates.whatsapp = whatsapp;
      if (observacao !== cidadao.observacao) updates.observacao = observacao;
      if (cep !== cidadao.cep) updates.cep = cep;

      if (Object.keys(updates).length === 0) {
        alert("Nenhum campo foi alterado");
        return;
      }
      setLoading(true);
      const api = await getApi();
      await api.put(`/cidadaos/${cidadao.id}`, updates, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose(); // Fecha o modal após sucesso
      }, 2000);
    } catch (error) {
      console.error(
        "Erro ao atualizar o Cidadão:",
        error.response ? error.response.data : error.message
      );

      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-[#004b85]">
            Atualizar Cidadão
          </DialogTitle>
          <DialogDescription>
            Altere os dados ou insira novos dados em um cadastro.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4">
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
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
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
                  value={data_nasc}
                  onChange={(e) => setData_nasc(e.target.value)}
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
                  value={rg}
                  onChange={(e) => setRG(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf" className="text-[#004b85]">
                  CPF
                </Label>
                <Input
                  id="cpf"
                  placeholder="Digite o CPF"
                  value={formatCPF(cpf)}
                  onChange={(e) => setCPF(e.target.value)}
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
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bairro" className="text-[#004b85]">
                  Bairro <Label className="text-red-600">*</Label>
                </Label>
                <Input
                  id="bairro"
                  placeholder="Digite o bairro"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
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
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
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
                  value={estado}
                  onValueChange={(value) => setEstado(value)}
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
                  value={formatCEP(cep)}
                  onChange={(e) => setCEP(e.target.value)}
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
                  value={FormataCelular(telefone)}
                  onChange={(e) => setTelefone(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={FormataCelular(whatsapp)}
                  onChange={(e) => setWhatsapp(e.target.value)}
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
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              onClick={handleUpdate}
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
      <UpdateSucesso show={showSuccess} onClose={() => setShowSuccess(false)} />
      {showError && (
        <ErroAtualizar open={showError} onClose={() => setShowError(false)} />
      )}
    </Dialog>
  );
}
