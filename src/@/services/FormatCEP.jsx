function formatCEP(cep) {
  cep = cep.replace(/\D/g, ""); // Remove tudo que não é dígito
  if (cep.length === 8) {
    return cep.replace(/(\d{5})(\d{3})/, "$1-$2");
  }
}

export default formatCEP;
