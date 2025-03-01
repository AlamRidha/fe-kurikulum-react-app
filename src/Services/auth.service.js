import store from "../redux/store";
import { loginUser, logoutUser } from "../redux/slices/userSlice";
import { decodeDataJwt } from "../helper/decodejwt";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (data, callback) => {
  // take API from users
  try {
    const response = await axios.post(`${API_URL}/users/login`, data);

    // take the token and save to localstorage
    const { token } = response.data;
    localStorage.setItem("token", token);

    // Decode jwt token
    const dataUser = decodeDataJwt(response.data.token);

    // Dispatch login action to save user data in store
    store.dispatch(loginUser(dataUser));

    const currentTime = Math.floor(Date.now() / 1000);
    const expiresIn = (dataUser.exp - currentTime) * 1000;

    setTimeout(() => {
      logout();
      window.location.href = "/";
    }, expiresIn);

    // send callback if login true
    callback(true, response.data);
  } catch (err) {
    console.log("erro");
    // send callback if login error
    callback(false, err.response?.data?.msg || err.message);
  }
};

// function to logout
export const logout = () => {
  store.dispatch(logoutUser());
  localStorage.removeItem("token");
};
