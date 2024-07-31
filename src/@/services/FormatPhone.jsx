import React from "react";
import InputMask from "react-input-mask";

const FormataCelular = (value) => {
  // Remove todos os caracteres não numéricos
  const cleaned = ("" + value).replace(/\D/g, "");

  // Limita o comprimento a 12 dígitos
  const limited = cleaned.slice(0, 11);

  // Adiciona a formatação
  const match = limited.match(/^(\d{2})(\d{5})(\d{4})$/);

  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  return limited;
};
export default FormataCelular;
