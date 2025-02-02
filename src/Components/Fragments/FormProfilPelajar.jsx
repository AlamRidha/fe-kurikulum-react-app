import { useEffect, useRef, useState } from "react";
import InputForm from "../Elements/Input";
import ModalForm from "./Modal";
import Button from "../Elements/Button";
import Alert from "../Elements/Alerts/Alerts";
import { createData, updateDataProfil } from "../../Services/ppelajar.service";

const FormProfilPelajar = (props) => {
  const {
    onSubmitSuccess,
    handleClose,
    initialData = null,
    isEditing = false,
    title,
  } = props;

  const [createFailed, setCreateFailed] = useState("");
  const [updateFailed, setUpdateFailed] = useState("");

  const [formData, setFormData] = useState({
    idProfil: "",
    dimensi: "",
    elemen: "",
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

  const validateForm = () => {
    const newError = {};
    if (!formData.dimensi) {
      newError.dimensi = "Dimensi Wajib Diisi";
    }

    if (!formData.elemen) {
      newError.elemen = "Elemen Wajib Diisi";
    }

    setErrors(newError);
    return Object.keys(newError).length === 0; // true if not found error
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isEditing) {
        const updateData = { ...formData };
        updateDataProfil(formData.idProfil, updateData, (status, res) => {
          if (status) {
            onSubmitSuccess();
          } else {
            setUpdateFailed(res);
          }
        });
      } else {
        createData(formData, (status, res) => {
          if (status) {
            onSubmitSuccess();
            handleClose();
          } else {
            console.log("Error", res);
            setCreateFailed(res);
          }
        });
      }
    }
  };

  // focusing to form when page is first rendered
  const dimensi = useRef(null);

  useEffect(() => {
    dimensi.current.focus();
  }, []);

  return (
    <ModalForm closeModal={handleClose} title={title}>
      <form onSubmit={handleSubmit}>
        <InputForm
          label="Dimensi"
          type="text"
          placeholder="Masukkan Dimensi"
          name="dimensi"
          ref={dimensi}
          value={formData.dimensi}
          onChange={handleChange}
          errors={errors.dimensi}
        />

        <InputForm
          label="Elemen"
          type="text"
          placeholder="Masukkan Elemen"
          name="elemen"
          value={formData.elemen}
          onChange={handleChange}
          errors={errors.elemen}
        />

        <Button classname="w-full bg-blue-600" type="submit">
          {isEditing ? "Update Profil Pelajar" : "Buat Profil Pelajar"}
        </Button>

        {createFailed && (
          <Alert msg={createFailed} statusMsg="Create Profil Pelajar Error!" />
        )}

        {updateFailed && (
          <Alert msg={updateFailed} statusMsg="Update Profil Pelajar Error!" />
        )}
      </form>
    </ModalForm>
  );
};

export default FormProfilPelajar;
