import { useEffect, useRef, useState } from "react";
import InputForm from "../Elements/Input";
import Button from "../Elements/Button";
import { login } from "../../Services/auth.service";
import Alert from "../Elements/Alerts/Alerts";

const FormLogin = () => {
  const [loginFailed, setLoginFailed] = useState("");
  const [formData, setFormData] = useState({
    nip: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "", // delete error when user write something
    });
  };

  // check form is empty or not?
  const validateForm = () => {
    const newError = {};
    if (!formData.nip) {
      newError.nip = "NIP Wajib Diisi";
    }

    if (!formData.password) {
      newError.password = "Password Wajib Diisi";
    }

    setErrors(newError);
    return Object.keys(newError).length === 0; // true if not found error
  };

  // focusing to form when page is first rendered
  const nip = useRef(null);

  useEffect(() => {
    nip.current.focus();
  }, []);

  // handle login function
  const handleLogin = (e) => {
    e.preventDefault();

    // check if validate is clear login
    if (validateForm()) {
      login(formData, (status, res) => {
        if (status) {
          console.log("Respon data: ", res);
          window.location.href = "/dashboard";
        } else {
          setLoginFailed(res);
        }
      });
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <InputForm
        label="NIP"
        type="text"
        placeholder="Masukkan NIP"
        name="nip"
        ref={nip}
        value={formData.nip}
        onChange={handleChange}
        errors={errors.nip}
      />

      <InputForm
        label="Password"
        type="password"
        placeholder="Masukkan Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        errors={errors.password}
      />

      <Button classname="bg-blue-600 w-full" type="submit">
        Login
      </Button>

      {loginFailed && <Alert msg={loginFailed} statusMsg="Login Error!" />}
    </form>
  );
};

export default FormLogin;
