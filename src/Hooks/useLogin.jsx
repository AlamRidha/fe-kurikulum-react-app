import { useEffect } from "react";
import { logout } from "../Services/auth.service";
import { useSelector } from "react-redux";
import { loginUser, userSelect } from "../redux/slices/userslice";
import { useNavigate } from "react-router-dom";
import store from "../redux/store";
import { decodeDataJwt } from "../helper";

export const useLogin = () => {
  // navigate
  const navigate = useNavigate();

  // get data user from store
  const userData = useSelector(userSelect);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const dataUser = decodeDataJwt(token);
      store.dispatch(loginUser(dataUser));
    } else {
      logout();
      navigate("/login");
    }
  }, [navigate]);

  //   if (!token) {
  //     // if token not exist go to login page
  //     logout();
  //     navigate("/login");
  //   } else if (!userData) {
  //     // if data user not exist go to login page
  //     console.log("User data is not available yet.");
  //     logout();
  //     navigate("/login");
  //   } else {
  //     console.log("Succesfully Login:");
  //     // console.log("User logged in:", userData);
  //   }
  // }, [navigate, userData]);

  return userData;
};
