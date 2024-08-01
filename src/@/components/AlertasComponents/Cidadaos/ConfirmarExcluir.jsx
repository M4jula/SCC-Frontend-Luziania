import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ConfirmDeleteModal({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm">
        <div className="text-center py-4">
          <p className="text-lg font-medium">
            Você tem certeza que deseja excluir este Cidadão?
          </p>
        </div>
        <DialogFooter>
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onConfirm(); // Chama a função de confirmação
                onClose(); // Fecha o modal
              }}
              className="bg-red-500 text-white hover:bg-muted hover:text-red-500"
            >
              Confirmar
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="bg-[#004b85] text-white hover:bg-muted hover:text-[#004b85] ml-4"
            >
              Cancelar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
