import { useEffect, useState } from "react";
import { getUsername, logout } from "../Services/auth.service";

export const useLogin = () => {
  const [username, setUsername] = useState("");

  //   take username and store in localstorage
  useEffect(() => {
    const token = localStorage.getItem("token");

    // check token, if token is set take the username
    // if token not exist, user move to login page
    if (token) {
      const userNameDecode = getUsername(token);

      if (userNameDecode) {
        setUsername(userNameDecode);
      } else {
        // if token is not valid, go to login page
        logout();
        window.location.href = "/login";
      }
    } else {
      window.location.href = "/login";
    }
  }, []);

  return username;
};
