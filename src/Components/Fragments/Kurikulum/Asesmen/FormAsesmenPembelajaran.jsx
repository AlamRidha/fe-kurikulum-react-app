import { useEffect, useRef, useState } from "react";
import ModalForm from "../../Modal";
import InputForm from "../../../Elements/Input";
import Alert from "../../../Elements/Alerts/Alerts";
import Button from "../../../Elements/Button";
import {
  createAsesmenPembelajaran,
  updateAsesmenPembelajaran,
} from "../../../../Services/asesmen";
import TextAreaForm from "../../../Elements/TextArea";

const FormAsesmen = (props) => {
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
  const [formData, setFormData] = useState({
    namaBab: "",
    jenisAsesmen: "",
    bentukAsesmen: "",
    keterangan: "",
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
    if (!formData.namaBab) {
      newError.namaBab = "Nama Bab Wajib Diisi";
    }

    if (!formData.jenisAsesmen) {
      newError.jenisAsesmen = "Jenis Asesmen Wajib Diisi";
    }

    if (!formData.bentukAsesmen) {
      newError.bentukAsesmen = "Bentuk Asesmen Wajib Diisi";
    }

    if (!formData.keterangan) {
      newError.keterangan = "Keterangan Wajib Diisi";
    }

    setErrors(newError);
    return Object.keys(newError).length === 0; // true if not found error
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (isEditing) {
        const updateData = { ...formData };

        updateAsesmenPembelajaran(
          formData.idAsesmen,
          updateData,
          (status, res) => {
            if (status) {
              onSubmitSuccess();
            } else {
              setUpdateFailed(res);
            }
          }
        );
      } else {
        createAsesmenPembelajaran(idMp, formData, (status, res) => {
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
  const namaBab = useRef(null);

  useEffect(() => {
    namaBab.current.focus();
  }, []);

  return (
    <ModalForm closeModal={handleClose} title={title}>
      <form onSubmit={onSubmit}>
        <InputForm
          label="Nama Bab"
          type="text"
          placeholder="Masukkan Nama Bab"
          name="namaBab"
          ref={namaBab}
          value={formData.namaBab}
          onChange={handleChange}
          errors={errors.namaBab}
        />

        <InputForm
          label="Jenis Asesmen"
          type="text"
          placeholder="Masukkan Jenis Asesmen"
          name="jenisAsesmen"
          value={formData.jenisAsesmen}
          onChange={handleChange}
          errors={errors.jenisAsesmen}
        />

        <InputForm
          label="Bentuk Asesmen"
          type="text"
          placeholder="Masukkan Bentuk Asesmen"
          name="bentukAsesmen"
          value={formData.bentukAsesmen}
          onChange={handleChange}
          errors={errors.bentukAsesmen}
        />

        <TextAreaForm
          label="Keterangan"
          placeholder="Masukkan Keterangan"
          name="keterangan"
          value={formData.keterangan}
          onChange={handleChange}
          errors={errors.keterangan}
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

export default FormAsesmen;
