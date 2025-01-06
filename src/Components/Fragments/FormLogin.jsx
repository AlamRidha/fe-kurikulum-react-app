import { useEffect, useRef, useState } from "react";
import InputForm from "../Elements/Input";
import Button from "../Elements/Button";
import { login } from "../../Services/auth.service";
import Alert from "../Elements/Alerts/Alerts";

const FormLogin = () => {
  const [loginFailed, setLoginFailed] = useState("");

  // focusing to form when page is first rendered
  const nip = useRef(null);

  useEffect(() => {
    nip.current.focus();
  }, []);

  // handle login function
  const handleLogin = (e) => {
    e.preventDefault();

    const data = {
      nip: e.target.nip.value,
      password: e.target.password.value,
    };

    login(data, (status, res) => {
      if (status) {
        console.log("Respon data: ", res);
        window.location.href = "/dashboard";
      } else {
        setLoginFailed(res);
      }
    });
  };

  return (
    <form onSubmit={handleLogin}>
      <InputForm
        label="NIP"
        type="text"
        placeholder="Masukkan NIP"
        name="nip"
        ref={nip}
      ></InputForm>

      <InputForm
        label="Password"
        type="password"
        placeholder="Masukkan Password"
        name="password"
      ></InputForm>

      <Button classname="bg-blue-600 w-full" type="submit">
        Login
      </Button>

      {loginFailed && <Alert msg={loginFailed} statusMsg="Login Error!" />}

      {/* {loginFailed && (
        <p className="text-red-500 text-center mt-5">{loginFailed}</p>
      )} */}
    </form>
  );
};

export default FormLogin;
