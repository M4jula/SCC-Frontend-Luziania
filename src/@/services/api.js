import axios from "axios";

const API_LOCAL = "http://localhost";

async function createApi() {
  const api = axios.create({
    baseURL: API_LOCAL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return api;
}

export const getApi = createApi;
