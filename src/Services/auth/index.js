import axios from "axios";
import { decodeDataJwt } from "../../helper/decodejwt";
import { logout } from "../auth.service";

const API_URL = import.meta.env.VITE_API_URL;

// Make instace for axios
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Interceptor for request and response need authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      const dataUser = decodeDataJwt(token);
      const currentTime = Math.floor(Date.now() / 1000); // get current time in second

      if (dataUser.exp < currentTime) {
        logout();
        window.location.href = "/";
        return Promise.reject("Token Expired");
      }

      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      logout();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
