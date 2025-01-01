import { useRef, useState } from "react";
import InputForm from "../Elements/Input";
import Button from "../Elements/Button";

const FormLogin = () => {
  const [loginFailed, setLoginFailed] = useState("");

  const nip = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      nip: e.target.nip.value,
      password: e.target.password.value,
    };
    console.log("Anda Login ", data);
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
    </form>
  );
};

export default FormLogin;
