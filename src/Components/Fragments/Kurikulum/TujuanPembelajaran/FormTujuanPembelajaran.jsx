import { useEffect, useRef, useState } from "react";
import {
  createTujuanPembelajaran,
  updateTujuanPembelajaran,
} from "../../../../Services/tujuanpembelajaran";
import ModalForm from "../../Modal";
import InputForm from "../../../Elements/Input";
import Button from "../../../Elements/Button";
import Alert from "../../../Elements/Alerts/Alerts";
import { getCapaianPembelajaran } from "../../../../Services/capaianpembelajaran.service";
import { useParams } from "react-router-dom";

const FormTujuanPembelajaran = (props) => {
  const {
    onSubmitSuccess,
    handleClose,
    initialData = null,
    isEditing = false,
    title,
    idMataPelajaran,
  } = props;

  const { idMp } = useParams();

  const [createFailed, setCreateFailed] = useState("");
  const [updateFailed, setUpdateFailed] = useState("");
  // form for new user
  const [formData, setFormData] = useState({
    idCp: "",
    tujuan_pembelajaran: "",
    ...initialData, // spread initial data if provided
  });
  const [dataCapaianPembelajaran, setDataCapaianPembelajaran] = useState([]);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    let parsedValue = value;
    if (name === "idCp") {
      parsedValue = parseInt(value, 10);
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
    }));

    // delete error when user write something
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  // check form is empty or not?
  const validateForm = () => {
    const newError = {};
    if (!formData.idCp) {
      newError.idCp = "Elemen Capaian Wajib Dipilih";
    }

    if (!formData.tujuan_pembelajaran) {
      newError.tujuan_pembelajaran = "Tujuan Pembelajaran Wajib Diisi";
    }

    setErrors(newError);
    return Object.keys(newError).length === 0; // true if not found error
  };

  //   handle submit function
  const onSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (isEditing) {
        const updateData = { ...formData };

        await updateTujuanPembelajaran(
          formData.idTp,
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
        await createTujuanPembelajaran(idMp, formData, (status, res) => {
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
  const idCp = useRef(null);

  useEffect(() => {
    idCp.current.focus();
  }, []);

  const fetchCapaianPembelajaran = async () => {
    getCapaianPembelajaran(idMp, (status, res) => {
      if (status) {
        setDataCapaianPembelajaran(res.data);
      } else {
        console.error("Error mendapatkan data capaian pembelajaran:", res);
      }
    });
  };

  useEffect(() => {
    fetchCapaianPembelajaran();
  }, [idMp]);

  return (
    <ModalForm closeModal={handleClose} title={title}>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label
            htmlFor="idCp"
            className="block mb-2 text-sm font-medium text-white"
          >
            Pilih Elemen Capaian Pembelajaran
          </label>
          <select
            id="idCp"
            name="idCp"
            value={formData.idCp}
            onChange={handleChange}
            ref={idCp}
            className={`bg-gray-50 border text-sm rounded-lg block w-full p-2.5 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
              dark:text-white focus:ring-blue-500 focus:border-blue-500
              ${errors.idCp ? "border-red-500" : "border-gray-300"}`}
          >
            <option value="" hidden>
              Pilih Elemen Capaian Pembelajaran
            </option>
            {dataCapaianPembelajaran.map((item) => (
              <option key={item.idCp} value={item.idCp}>
                {item.elemen}
              </option>
            ))}
          </select>
          {errors.idCp && (
            <p className="mt-1 text-sm text-red-500">{errors.idCp}</p>
          )}
        </div>

        <InputForm
          label="Tujuan Pembelajaran"
          type="text"
          placeholder="Masukkan Tujuan Pembelajaran"
          name="tujuan_pembelajaran"
          value={formData.tujuan_pembelajaran}
          onChange={handleChange}
          errors={errors.tujuan_pembelajaran}
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

export default FormTujuanPembelajaran;
