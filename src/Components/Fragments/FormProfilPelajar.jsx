import { useEffect, useRef, useState } from "react";
import InputForm from "../Elements/Input";
import ModalForm from "./Modal";
import Button from "../Elements/Button";
import Alert from "../Elements/Alerts/Alerts";
import { createData, updateDataProfil } from "../../Services/ppelajar.service";
import { GoNoEntry } from "react-icons/go";

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
    idProfil: initialData?.idProfil || "",
    dimensi: initialData?.dimensi || "",
    elemen: Array.isArray(initialData?.elemen)
      ? initialData.elemen
      : initialData?.elemen
      ? JSON.parse(initialData.elemen)
      : [""],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;
    if (name === "dimensi") {
      setFormData({ ...formData, dimensi: value });
    } else if (name === "elemen" && index !== null) {
      const updatedElemen = [...formData.elemen];
      updatedElemen[index] = value;
      setFormData({ ...formData, elemen: updatedElemen });
    }

    setErrors({
      ...errors,
      [name]: "", // Hapus error ketika pengguna mengetik sesuatu
    });
  };

  const addElemenField = () => {
    setFormData({
      ...formData,
      elemen: [...formData.elemen, ""], // Tambahkan elemen kosong ke array
    });
  };

  const removeElemenField = (index) => {
    const updatedElemen = formData.elemen.filter((_, i) => i !== index);
    setFormData({ ...formData, elemen: updatedElemen });
  };

  const validateForm = () => {
    const newError = {};
    if (!formData.dimensi) {
      newError.dimensi = "Dimensi Wajib Diisi";
    }

    if (formData.elemen.some((elemen) => !elemen.trim())) {
      newError.elemen = "Semua Elemen Wajib Diisi";
    }

    setErrors(newError);
    return Object.keys(newError).length === 0; // true jika tidak ada error
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updating with ID:", formData.idProfil, "and data:", formData); // Log before update call
    if (validateForm()) {
      if (isEditing) {
        updateDataProfil(formData.idProfil, formData, (status, res) => {
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
            setCreateFailed(res);
          }
        });
      }
    }
  };

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

        {formData.elemen.map((elemen, index) => (
          <div key={index} className="flex items-center gap-2 pb-2">
            <InputForm
              label={index === 0 ? "Elemen" : ""}
              type="text"
              placeholder="Masukkan Elemen"
              name="elemen"
              value={elemen}
              onChange={(e) => handleChange(e, index)}
              errors={errors.elemen}
            />
            {formData.elemen.length > 1 && (
              <Button
                type="button"
                classname="flex items-center justify-center p-2 text-white bg-red-500 rounded-xl"
                onClick={() => removeElemenField(index)}
              >
                <GoNoEntry />
              </Button>
            )}
          </div>
        ))}

        <Button
          type="button"
          classname="mt-2 text-purple-800 bg-green-500"
          onClick={addElemenField}
        >
          + Tambah Elemen
        </Button>

        <Button classname="w-full mt-4 text-white bg-blue-600" type="submit">
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
