import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { getApi } from "@/services/api";

import FormataCelular from "@/services/FormatPhone";
import React, { useState, useEffect } from "react";

export default function EditProfileModal({ user, onClose }) {
  const [formData, setFormData] = useState({
    email: user.email,
    nome: user.nome,
    whatsapp: user.whatsapp,
    password: "",
  });

  // Atualizar o estado do formulário quando o usuário muda
  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || "",
        nome: user.nome || "",
        whatsapp: user.whatsapp || "",
        password: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const api = await getApi();
      const response = await api.put(`/atualizar-perfil/${user.id}`, formData, {
        withCredentials: true,
      });
      alert("Perfil atualizado com sucesso!");
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      alert("Erro ao atualizar perfil. Tente novamente.");
    }
  };
  return (
    <Dialog defaultOpen>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[#004b85]">Atualizar Perfil</DialogTitle>
          <DialogDescription>
            Faça alterações no seu perfil aqui. Clique em salvar quando
            terminar.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="nome" className="text-right text-[#004b85]">
                Nome
              </Label>
              <Input
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="email" className="text-right text-[#004b85]">
                E-mail
              </Label>
              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                className="col-span-3"
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="password" className="text-right text-[#004b85]">
                Senha
              </Label>
              <Input
                id="password"
                name="password"
                onChange={handleChange}
                type="password"
                className="col-span-3"
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="whatsapp" className="text-right text-[#004b85]">
                WhatsApp
              </Label>
              <Input
                id="whatsapp"
                name="whatsapp"
                value={FormataCelular(formData.whatsapp)}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="mr-2 bg-[#004b85] hover:bg-muted hover:text-[#004b85]"
            >
              Salvar
            </Button>
            <Button
              variant="ghost"
              type="button"
              onClick={onClose}
              className="bg-muted text-red-600 hover:bg-red-600 hover:text-[#ffff]"
            >
              Fechar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
