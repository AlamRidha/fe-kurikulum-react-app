import { useEffect, useRef, useState } from "react";
import {
  createCapaianPembelajaran,
  updateCapaianPembelajaran,
} from "../../../../Services/capaianpembelajaran.service";
import ModalForm from "../../Modal";
import InputForm from "../../../Elements/Input";
import Button from "../../../Elements/Button";
import Alert from "../../../Elements/Alerts/Alerts";

const FormCapaianPembelajaran = (props) => {
  const {
    onSubmitSuccess,
    handleClose,
    initialData = null,
    isEditing = false,
    title,
    idMp,
  } = props;

  const [createFailed, setCreateFailed] = useState("");
  const [updateFailed, setUpdateFailed] = useState("");
  // form for new user
  const [formData, setFormData] = useState({
    elemen: "",
    capaian_pembelajaran: "",
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
    if (!formData.elemen) {
      newError.elemen = "Elemen Wajib Diisi";
    }

    if (!formData.capaian_pembelajaran) {
      newError.capaian_pembelajaran = "Capaian Pembelajaran Wajib Diisi";
    }

    setErrors(newError);
    return Object.keys(newError).length === 0; // true if not found error
  };

  // handle submit function
  const onSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (isEditing) {
        const updateData = { ...formData };

        updateCapaianPembelajaran(formData.idCp, updateData, (status, res) => {
          if (status) {
            onSubmitSuccess();
          } else {
            setUpdateFailed(res);
          }
        });
      } else {
        createCapaianPembelajaran(idMp, formData, (status, res) => {
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

  // focusing to form when page is first rendered
  const elemen = useRef(null);

  useEffect(() => {
    elemen.current.focus();
  }, []);

  return (
    <ModalForm closeModal={handleClose} title={title}>
      <form onSubmit={onSubmit}>
        <InputForm
          label="Elemen"
          type="text"
          placeholder="Masukkan Elemen"
          name="elemen"
          ref={elemen}
          value={formData.elemen}
          onChange={handleChange}
          errors={errors.elemen}
        />

        <InputForm
          label="Capaian Pembelajaran"
          type="text"
          placeholder="Masukkan Capaian Pembelajaran"
          name="capaian_pembelajaran"
          value={formData.capaian_pembelajaran}
          onChange={handleChange}
          errors={errors.capaian_pembelajaran}
        />

        <Button classname="w-full text-white bg-blue-600" type="submit">
          {isEditing ? "Update Data" : "Buat Data"}
        </Button>

        {createFailed && (
          <Alert msg={createFailed} statusMsg="Buat Data Gagal!" />
        )}

        {updateFailed && (
          <Alert msg={updateFailed} statusMsg="Update Data Gagal!" />
        )}
      </form>
    </ModalForm>
  );
};

export default FormCapaianPembelajaran;
