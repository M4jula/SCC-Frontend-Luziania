function formatCPF(cpf) {
  cpf = cpf.replace(/\D/g, ""); // Remove tudo que não é dígito
  if (cpf.length === 11) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }
}

export default formatCPF;
