import { useEffect, useRef, useState } from "react";
import InputForm from "../Elements/Input";
import Button from "../Elements/Button";
import Alert from "../Elements/Alerts/Alerts";
import { createUser, updateUser } from "../../Services/user.service";
import ModalForm from "./Modal";

const FormUser = (props) => {
  const {
    onSubmitSuccess,
    handleClose,
    initialData = null,
    isEditing = false,
    title,
  } = props;
  const [createFailed, setCreateFailed] = useState("");
  const [updateFailed, setUpdateFailed] = useState("");
  // form for new user
  const [formData, setFormData] = useState({
    nip: "",
    nameUser: "",
    password: "",
    email: "",
    noHp: "",
    bidangMataPelajaran: "",
    ...initialData, // spread initial data if provided
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

    if (!formData.nameUser) {
      newError.nameUser = "Nama User Wajib Diisi";
    }

    if (!isEditing && (!formData.password || formData.password.length <= 5)) {
      newError.password = "Password Wajib Diisi dan Lebih dari 5 Karakter";
    }

    if (!formData.email) {
      newError.email = "Email Wajib Diisi";
    }

    if (!formData.noHp || formData.noHp.length >= 13) {
      newError.noHp = "No Hp Wajib Diisi dan Kurang Dari 13 Angka";
    }

    if (!formData.bidangMataPelajaran) {
      newError.bidangMataPelajaran = "Bidang Mata Pelajaran Wajib Diisi";
    }

    setErrors(newError);
    return Object.keys(newError).length === 0; // true if not found error
  };

  // handle submit function
  const onSubmit = async (e) => {
    e.preventDefault();

    console.log("Data: ", formData);
    // check if validate is clear login
    if (validateForm()) {
      if (isEditing) {
        const updateData = { ...formData };
        if (!updateData.password) {
          delete updateData.password;
        }

        updateUser(formData.idUser, updateData, (status, res) => {
          if (status) {
            onSubmitSuccess();
          } else {
            setUpdateFailed(res);
          }
        });
      } else {
        createUser(formData, (status, res) => {
          if (status) {
            onSubmitSuccess();
            handleClose();
            console.log("Respon data Berhasil: ", res);
          } else {
            console.log("Error", res);
            setCreateFailed(res);
          }
        });
      }
    }
  };

  // focusing to form when page is first rendered
  const nip = useRef(null);

  useEffect(() => {
    nip.current.focus();
  }, []);

  return (
    <ModalForm closeModal={handleClose} title={title}>
      <form onSubmit={onSubmit}>
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
          label="Nama Guru"
          type="text"
          placeholder="Masukkan Nama Guru"
          name="nameUser"
          value={formData.nameUser}
          onChange={handleChange}
          errors={errors.nameUser}
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

        <InputForm
          label="Email"
          type="text"
          placeholder="Masukkan Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          errors={errors.email}
        />

        <InputForm
          label="No Handphone"
          type="text"
          placeholder="Masukkan No Handphone"
          name="noHp"
          value={formData.noHp}
          onChange={handleChange}
          errors={errors.noHp}
        />

        <InputForm
          label="Bidang Mata Pelajaran"
          type="text"
          placeholder="Masukkan Bidang Mata Pelajaran"
          name="bidangMataPelajaran"
          value={formData.bidangMataPelajaran}
          onChange={handleChange}
          errors={errors.bidangMataPelajaran}
        />

        <Button classname="w-full bg-blue-600" type="submit">
          {isEditing ? "Update Akun" : "Buat Akun"}
        </Button>

        {createFailed && (
          <Alert msg={createFailed} statusMsg="Create User Error!" />
        )}
      </form>
    </ModalForm>
  );
};

export default FormUser;
