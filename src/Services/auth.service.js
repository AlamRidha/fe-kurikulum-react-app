import store from "../redux/store";
import { loginUser, logoutUser } from "../redux/slices/userSlice";
import { decodeDataJwt } from "../helper/decodejwt";
import axiosInstace from "./auth";

export const login = async (data, callback) => {
  // take API from users
  try {
    const response = await axiosInstace.post(`/users/login`, data);

    // take the token and save to localstorage
    const { token } = response.data;
    localStorage.setItem("token", token);

    // Decode jwt token
    const dataUser = decodeDataJwt(response.data.token);

    // Dispatch login action to save user data in store
    store.dispatch(loginUser(dataUser));

    // send callback if login true
    callback(true, response.data);
  } catch (err) {
    // send callback if login error
    callback(false, err.response?.data?.msg || err.message);
  }
};

// function to logout
export const logout = () => {
  store.dispatch(logoutUser());
  localStorage.removeItem("token");
};
