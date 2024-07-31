import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import FormataCelular from "@/services/FormatPhone";
import CadastroSucesso from "@/components/AlertasComponents/Usuarios/CadastroSucesso";
import React, { useEffect, useState } from "react";
import { getApi } from "@/services/api";

const AddUser = ({ open, onClose }) => {
  const [newUser, setNewUser] = useState({
    nome: "",
    email: "",
    whatsapp: "",
    password: "",
    acess: "",
  });
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewUser((prev) => ({ ...prev, [id]: value }));
  };

  const handleCreateUser = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const api = await getApi();
      const response = await api.post("/adicionar-usuarios", newUser);

      setShowSuccess(true);
      setNewUser({
        nome: "",
        email: "",
        whatsapp: "",
        password: "",
        acess: "",
      });
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose(); // Fecha o modal após sucesso
      }, 2000);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#004b85]">
            Adicionar Usuário
          </DialogTitle>
          <DialogDescription>
            Crie um usuário com a função ideal para seu tipo de acesso
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCreateUser} className="space-y-4 py-4">
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nome" className="text-right text-[#004b85]">
                Nome
              </Label>
              <Input
                id="nome"
                className="col-span-3"
                minLength={3}
                maxLength={30}
                value={newUser.nome}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right text-[#004b85]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                className="col-span-3"
                minLength={10}
                maxLength={30}
                value={newUser.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="whatsapp" className="text-right text-[#004b85]">
                WhatsApp
              </Label>
              <Input
                id="whatsapp"
                value={FormataCelular(newUser.whatsapp)}
                onChange={handleInputChange}
                placeholder="Digite seu WhatsApp"
                maxLength={11}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="access" className="text-right text-[#004b85]">
                Função
              </Label>
              <Select
                id="acess" // Corrigido o id para coincidir com o campo
                className="col-span-3"
                value={newUser.acess}
                onValueChange={(value) =>
                  setNewUser((prev) => ({ ...prev, acess: value }))
                }
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right text-[#004b85]">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                className="col-span-3"
                minLength={6}
                maxLength={12}
                value={newUser.password}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-[#004b85] hover:bg-green-600">
              Cadastrar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
      {/* Modal de sucesso */}
      <CadastroSucesso
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </Dialog>
  );
};

export default AddUser;
