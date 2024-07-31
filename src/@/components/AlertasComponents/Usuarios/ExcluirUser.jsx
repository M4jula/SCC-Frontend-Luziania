import { getApi } from "@/services/api";

const deleteUser = async (userId) => {
  try {
    const api = await getApi();
    const response = await api.delete(`/excluir-usuario/${userId}`);

    if (response.status === 200) {
      console.log("Usuário excluído com sucesso!");
    }
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
  }
};

export default deleteUser;
