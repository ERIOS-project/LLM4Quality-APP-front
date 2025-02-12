import axios from "axios";
import { getUserToken } from "../authConfig"; // Assurez-vous que le chemin est correct

if(!window.env){
  window.env = import.meta.env;
}

const apiURL = window.env.VITE_API_URL;

const API = axios.create({
  baseURL: apiURL, // Utilisez la variable d'environnement pour l'URL de votre back-end
  timeout: 10000,
  headers: {
    "Content-Type": "application/json", // En-tête pour spécifier le type de contenu
  },
});

API.interceptors.request.use(
  async (config) => {
    try {
      const token = await getUserToken(); // Récupérez le token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error fetching token", error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirection ou notification en cas d'authentification échouée
      console.error("Unauthorized. Please login again.");
    }
    return Promise.reject(error);
  }
);

export default API;