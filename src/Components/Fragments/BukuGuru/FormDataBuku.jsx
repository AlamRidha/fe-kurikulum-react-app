import { useEffect, useRef, useState } from "react";
import {
  createDataBukuGuru,
  updateDataBukuGuru,
} from "../../../Services/bukuguru";
import ModalForm from "../Modal";
import InputForm from "../../Elements/Input";
import Button from "../../Elements/Button";
import Alert from "../../Elements/Alerts/Alerts";

const FormDataBuku = (props) => {
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
    namaBuku: "",
    linkBuku: "",
    ...initialData,
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
      [name]: "",
    });
  };

  const validateForm = () => {
    const newError = {};
    if (!formData.namaBuku) {
      newError.namaBuku = "Nama Buku Wajib Diisi";
    }

    if (!formData.linkBuku) {
      newError.linkBuku = "Link Buku Wajib Diisi";
    }

    setErrors(newError);
    return Object.keys(newError).length === 0; // true if not found error
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (isEditing) {
        const updateData = { ...formData };

        updateDataBukuGuru(formData.idBuku, updateData, (status, res) => {
          if (status) {
            onSubmitSuccess();
          } else {
            setUpdateFailed(res);
          }
        });
      } else {
        createDataBukuGuru(formData, (status, res) => {
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

  const namaBuku = useRef(null);

  useEffect(() => {
    namaBuku.current.focus();
  }, []);

  return (
    <ModalForm closeModal={handleClose} title={title}>
      <form onSubmit={onSubmit}>
        <InputForm
          label="Nama Buku"
          type="text"
          placeholder="Masukkan Nama Buku"
          name="namaBuku"
          ref={namaBuku}
          value={formData.namaBuku}
          onChange={handleChange}
          errors={errors.namaBuku}
        />

        <InputForm
          label="Link Buku"
          type="text"
          placeholder="Masukkan Link Buku"
          name="linkBuku"
          value={formData.linkBuku}
          onChange={handleChange}
          errors={errors.linkBuku}
        />

        <Button classname="w-full mt-4 text-white bg-blue-600" type="submit">
          {isEditing ? "Update Buku" : "Buat Buku"}
        </Button>

        {createFailed && (
          <Alert msg={createFailed} statusMsg="Create Buku Error!" />
        )}
        {updateFailed && (
          <Alert msg={updateFailed} statusMsg="Update Buku Error!" />
        )}
      </form>
    </ModalForm>
  );
};

export default FormDataBuku;
