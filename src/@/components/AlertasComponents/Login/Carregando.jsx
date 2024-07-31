export default function MensagemCarregando() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
        <div className="flex items-center space-x-2">
          <p className="text-white text-lg font-medium">Carregando...</p>
        </div>
      </div>
    </div>
  );
}
