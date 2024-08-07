import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
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
import { getApi } from "@/services/api";
import AtualizadoSucesso from "@/components/AlertasComponents/Usuarios/AtualizadoSucesso";
import ErroAtualizar from "./ErroAtualizar";
import MensagemCarregando from "./Carregando";
import FormataCelular from "@/services/FormatPhone";

export default function EditarComponent({ user, onClose, open }) {
  const [nome, setNome] = useState(user.nome);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [whatsapp, setWhatsapp] = useState(user.whatsapp || "");
  const [acess, setAcess] = useState(user.acess || "");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setNome(user.nome);
      setEmail(user.email);
      setPassword(""); // Deixa a senha vazia por padrão
      setWhatsapp(user.whatsapp || "");
      setAcess(user.acess || "");
    }
  }, [user]);

  const handleUpdate = async () => {
    try {
      const updates = {}; // Objeto para armazenar apenas os campos alterados

      if (nome !== user.nome) updates.nome = nome;
      if (email !== user.email) updates.email = email;
      if (password) updates.password = password;
      if (whatsapp !== user.whatsapp) updates.whatsapp = whatsapp;
      if (acess !== user.acess) updates.acess = acess;

      if (Object.keys(updates).length === 0) {
        alert("Nenhum campo foi alterado");
        return;
      }
      setLoading(true);
      const api = await getApi();
      await api.put(`/atualizar-usuario/${user.id}`, updates);

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose(); // Fecha o modal após sucesso
      }, 2000);
    } catch (error) {
      console.error("Erro ao atualizar o usuário:", error);
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-[#2e3192]">
            Atualizar Usuário
          </DialogTitle>
          <DialogDescription>
            Atualize as informações desse usuário
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="nome" className="text-right text-[#2e3192]">
              Nome
            </Label>
            <Input
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome"
              className="col-span-3"
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="email" className="text-right text-[#2e3192]">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              maxLength={30}
              minLength={10}
              className="col-span-3"
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="password" className="text-right text-[#2e3192]">
              Senha
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              maxLength={12}
              minLength={6}
              className="col-span-3"
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="whatsapp" className="text-right text-[#2e3192]">
              WhatsApp
            </Label>
            <Input
              id="whatsapp"
              value={FormataCelular(whatsapp)}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="Digite seu WhatsApp"
              maxLength={11}
              className="col-span-3"
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="acess" className="text-right text-[#2e3192]">
              Função
            </Label>
            <Select
              id="acess"
              className="col-span-3"
              value={acess}
              onValueChange={(value) => setAcess(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o nível de acesso" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="governanca">Governança</SelectItem>
                <SelectItem value="lideranca">Liderança</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="ghost"
            type="button"
            className="ml-auto bg-yellow-500 text-[#fff] hover:text-yellow-500 hover:bg-muted"
            onClick={handleUpdate}
          >
            Atualizar
          </Button>
          <div>
            <Button
              className="bg-red-500 text-[#fff] hover:text-red-500"
              variant="ghost"
              onClick={() => onClose()} // Fecha o modal
            >
              Fechar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
      <AtualizadoSucesso
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
      {showError && (
        <ErroAtualizar open={showError} onClose={() => setShowError(false)} />
      )}
      {loading && <MensagemCarregando open={loading} />}
    </Dialog>
  );
}
