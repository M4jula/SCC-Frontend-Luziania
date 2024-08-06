import axios from "axios";

const API_LOCAL = "http://localhost";
const cadeado = "kjadsfqweFEOENMCSAKOIWQHEEF5456";

async function createApi() {
  const api = axios.create({
    baseURL: API_LOCAL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return api;
}

export const getApi = createApi;
