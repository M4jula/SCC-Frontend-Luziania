import React, { useState } from "react";

const EmailInput = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // Função para validar o e-mail com regex
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  // Manipulador de mudança do campo de entrada
  const handleEmailChange = (e) => {
    const { value } = e.target;

    if (value === "" || validateEmail(value)) {
      setEmail(value);
      setError("");
    } else {
      setError("O e-mail deve ser válido e conter '@'.");
    }
  };
};
export default EmailInput;
