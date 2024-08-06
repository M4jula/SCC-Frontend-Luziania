import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

const CidadaoSelect = ({ onCidadaoSelect }) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  const fetchCidadaos = async (query) => {
    try {
      const response = await axios.get(`/cidadaos/search`, {
        params: { search: query },
      });

      // Verifique a estrutura dos dados retornados
      console.log("Dados retornados:", response.data);

      // Transforme os dados no formato esperado pelo react-select
      const cidadaos = response.data.map((c) => ({
        value: c.id,
        label: c.nome,
      }));

      console.log("Opções transformadas:", cidadaos);

      setOptions(cidadaos);
    } catch (error) {
      console.error("Erro ao buscar cidadãos:", error);
    }
  };

  useEffect(() => {
    if (inputValue.length > 1) {
      fetchCidadaos(inputValue);
    } else {
      setOptions([]);
    }
  }, [inputValue]);

  const handleChange = (selectedOption) => {
    onCidadaoSelect(selectedOption);
  };

  return (
    <Select
      placeholder="Selecione um cidadão"
      options={options}
      onInputChange={(value) => setInputValue(value)}
      onChange={handleChange}
      isClearable
    />
  );
};

export default CidadaoSelect;
