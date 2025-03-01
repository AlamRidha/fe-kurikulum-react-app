import { useEffect } from "react";
import { logout } from "../Services/auth.service";
import { useSelector } from "react-redux";
import { loginUser, userSelect } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import store from "../redux/store";
import { decodeDataJwt } from "../helper/decodejwt";

const useLogin = () => {
  // navigate
  const navigate = useNavigate();

  // get data user from store
  const userData = useSelector(userSelect);

  useEffect(() => {
    // take token from localstorage
    const token = localStorage.getItem("token");

    // if token exist decode the token and dispathc login
    if (token) {
      const dataUser = decodeDataJwt(token);
      const currentTime = Math.floor(Date.now() / 1000); // get current time in second
      const expiresIn = (dataUser.exp - currentTime) * 1000; // get expires time in millisecond

      if (dataUser.exp < currentTime) {
        logout();
        navigate("/");
      } else {
        store.dispatch(loginUser(dataUser));

        // set timeout to logout otomatic when token expired
        setTimeout(() => {
          logout();
          navigate("/");
        }, expiresIn);
      }
    } else {
      logout();
      navigate("/");
    }
  }, [navigate]);

  return userData;
};

export default useLogin;
