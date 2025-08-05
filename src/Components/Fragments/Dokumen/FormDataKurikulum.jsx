import { useEffect, useRef, useState } from "react";
import Alert from "../../Elements/Alerts/Alerts";
import Button from "../../Elements/Button";
import InputForm from "../../Elements/Input";
import ModalForm from "../Modal";
import {
  createDokumenKurikulum,
  updateDokumenKurikulum,
} from "../../../Services/dokumenkurikulum";

const FormDataKurikulum = (props) => {
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
    namaKurikulum: "",
    tahun: "",
    linkKurikulum: "",
    ...initialData,
  });
  const [selectedFile, setSelectedFile] = useState(null);

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

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setErrors({
        ...errors,
        linkKurikulum: "",
      });
    }
  };

  const validateForm = () => {
    const newError = {};
    if (!formData.namaKurikulum) {
      newError.namaKurikulum = "Nama Kurikulum Wajib Diisi";
    }

    if (!formData.tahun) {
      newError.tahun = "Tahun Wajib Diisi";
    }

    if (!isEditing && !selectedFile) {
      newError.linkKurikulum = "File Kurikulum Wajib Diisi";
    }

    setErrors(newError);
    return Object.keys(newError).length === 0; // true if not found error
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formDataToSend = new FormData();
      formDataToSend.append("namaKurikulum", formData.namaKurikulum);
      formDataToSend.append("tahun", formData.tahun);

      // Only append file if a new one is selected (or it's a new entry)
      if (selectedFile) {
        formDataToSend.append("linkKurikulum", selectedFile);
      }

      if (isEditing) {
        updateDokumenKurikulum(
          formData.idKurikulum,
          formDataToSend,
          (status, res) => {
            if (status) {
              onSubmitSuccess();
            } else {
              setUpdateFailed(res);
            }
          }
        );
      } else {
        createDokumenKurikulum(formDataToSend, (status, res) => {
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

  const namaKurikulum = useRef(null);

  useEffect(() => {
    namaKurikulum.current.focus();
  }, []);

  return (
    <ModalForm closeModal={handleClose} title={title}>
      <form onSubmit={onSubmit}>
        <InputForm
          label="Nama Kurikulum"
          type="text"
          placeholder="Masukkan Nama Kurikulum"
          name="namaKurikulum"
          ref={namaKurikulum}
          value={formData.namaKurikulum}
          onChange={handleChange}
          errors={errors.namaKurikulum}
        />

        <InputForm
          label="Tahun Kurikulum"
          type="text"
          placeholder="Masukkan Tahun Kurikulum"
          name="tahun"
          value={formData.tahun}
          onChange={handleChange}
          errors={errors.tahun}
        />

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">
            File Kurikulum
          </label>
          <input
            type="file"
            name="linkKurikulum"
            accept=".pdf"
            onChange={handleFileChange}
            className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.linkKurikulum && (
            <p className="text-sm text-red-500">{errors.linkKurikulum}</p>
          )}
          {isEditing && !selectedFile && formData.linkKurikulum && (
            <p className="mt-1 text-sm text-gray-500">
              File sebelumnya: {formData.linkKurikulum}
            </p>
          )}
        </div>

        <Button classname="w-full mt-4 text-white bg-blue-600" type="submit">
          {isEditing ? "Update Dokumen Kurikulum" : "Buat Dokumen Kurikulum"}
        </Button>

        {createFailed && (
          <Alert
            msg={createFailed}
            statusMsg="Create Dokumen Kurikulum Error!"
          />
        )}
        {updateFailed && (
          <Alert
            msg={updateFailed}
            statusMsg="Update Dokumen Kurikulum Error!"
          />
        )}
      </form>
    </ModalForm>
  );
};

export default FormDataKurikulum;
