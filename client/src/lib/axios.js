import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

export const useApi = () => {
  const { getToken } = useAuth();



  // Create axios instance
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request Interceptor: Attach Clerk Token
  api.interceptors.request.use(
    async (config) => {
      try {
        const token = await getToken(); // <-- Ambil token dari Clerk

        console.log(token);

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Error fetching token from Clerk:", error);
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response Interceptor
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.warn("Unauthorized, redirect to login?");
      }
      return Promise.reject(error);
    }
  );

  return api;
};
