import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (data, callback) => {
  // take API from users
  try {
    const response = await axios.post(`${API_URL}/users/login`, data);
    console.log(response.data);

    // take the token and save to localstorage
    const { token } = response.data;
    localStorage.setItem("token", token);

    // send callback if login true
    callback(true, response.data);
  } catch (err) {
    // send callback if login error
    callback(false, err.response?.data?.msg || err.message);
  }
};

// get username then decode
export const getUsername = (token) => {
  try {
    const decoded = jwtDecode(token);
    // console.log(decoded);
    return decoded.nameUser;
  } catch (error) {
    console.error("Error decoding jwt ", error);
    return null;
  }
};

// function to logout
export const logout = () => {
  localStorage.removeItem("token");
};
