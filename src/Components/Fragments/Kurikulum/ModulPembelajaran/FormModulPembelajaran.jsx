import { useEffect, useRef, useState } from "react";
import {
  createModulPembelajaran,
  updateModulPembelajaran,
} from "../../../../Services/modulpembelajaran";
import ModalForm from "../../Modal";
import Button from "../../../Elements/Button";
import Alert from "../../../Elements/Alerts/Alerts";
import InputForm from "../../../Elements/Input";
import Select from "react-select";
import { getAllDataProfilPelajar } from "../../../../Services/ppelajar.service";
import TextAreaForm from "../../../Elements/TextArea";

const FormModulPembelajaran = (props) => {
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
  const [profilPelajar, setprofilPelajar] = useState([]);
  const [formData, setFormData] = useState(() => {
    return {
      tahun_penyusunan: "",
      bab: "",
      tema: "",
      alokasi_waktu: "",
      kompetensi_awal: "",
      // profil_pancasila: [],
      profil_pancasila: [],
      sarana_prasarana: "",
      model_pembelajaran: "",
      tujuan_bab: "",
      deskripsi_cp: "",
      pemahaman: "",
      kegiatan_pembelajaran: "",
      ...(initialData && {
        ...initialData,
        profil_pancasila: Array.isArray(initialData.profil_pancasila)
          ? initialData.profil_pancasila
          : typeof initialData.profil_pancasila === "string"
          ? JSON.parse(initialData.profil_pancasila)
          : [],
      }),
    };
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
    if (!formData.tahun_penyusunan) {
      newError.tahun_penyusunan = "Tahun Penyusunan Wajib Diisi";
    }

    if (!formData.bab) {
      newError.bab = "Bab Wajib Diisi";
    }

    if (!formData.tema) {
      newError.tema = "Tema Wajib Diisi";
    }

    if (!formData.kompetensi_awal) {
      newError.kompetensi_awal = "Kompetensi Awal Wajib Diisi";
    }

    if (!formData.profil_pancasila) {
      newError.profil_pancasila = "Profil Pancasila Wajib Diisi";
    }

    if (!formData.sarana_prasarana) {
      newError.sarana_prasarana = "Sarana dan Prasarana Wajib Diisi";
    }

    if (!formData.model_pembelajaran) {
      newError.model_pembelajaran = "Model Pembelajaran Wajib Diisi";
    }

    if (!formData.tujuan_bab) {
      newError.tujuan_bab = "Tujuan Bab Wajib Diisi";
    }

    if (!formData.deskripsi_cp) {
      newError.deskripsi_cp = "Deskripsi CP Wajib Diisi";
    }

    if (!formData.pemahaman) {
      newError.pemahaman = "Pemahaman Wajib Diisi";
    }

    if (!formData.kegiatan_pembelajaran) {
      newError.kegiatan_pembelajaran = "Kegiatan Pembelajaran Wajib Diisi";
    }

    setErrors(newError);
    return Object.keys(newError).length === 0; // true if not found error
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (isEditing) {
        const updateData = {
          ...formData,
          profil_pancasila: JSON.stringify(formData.profil_pancasila),
        };

        updateModulPembelajaran(formData.idModul, updateData, (status, res) => {
          if (status) {
            onSubmitSuccess();
          } else {
            setUpdateFailed(res);
          }
        });
      } else {
        createModulPembelajaran(
          idMp,
          {
            ...formData,
            profil_pancasila: JSON.stringify(formData.profil_pancasila),
          },
          (status, res) => {
            if (status) {
              onSubmitSuccess();
              handleClose();
            } else {
              setCreateFailed(res);
            }
          }
        );
      }
    }
  };

  // focusing to form when page is first rendered
  const tahun_penyusunan = useRef(null);

  useEffect(() => {
    tahun_penyusunan.current.focus();
  }, []);

  useEffect(() => {
    getAllDataProfilPelajar((status, res) => {
      if (status) {
        const options = res.data.map((item) => ({
          value: item.idProfil,
          label: item.dimensi,
        }));
        setprofilPelajar(options);
      } else {
        console.error("Error get data", res);
        setprofilPelajar([]);
      }
    });
  }, []);

  return (
    <ModalForm closeModal={handleClose} title={title}>
      <form onSubmit={onSubmit}>
        <InputForm
          label="Tahun Penyusunan"
          type="text"
          placeholder="Masukkan Tahun Penyusunan"
          name="tahun_penyusunan"
          ref={tahun_penyusunan}
          value={formData.tahun_penyusunan}
          onChange={handleChange}
          errors={errors.tahun_penyusunan}
        />

        <InputForm
          label="Bab"
          type="text"
          placeholder="Masukkan Bab"
          name="bab"
          value={formData.bab}
          onChange={handleChange}
          errors={errors.bab}
        />

        <InputForm
          label="Bentuk Tema"
          type="text"
          placeholder="Masukkan Bentuk Tema"
          name="tema"
          value={formData.tema}
          onChange={handleChange}
          errors={errors.tema}
        />

        <InputForm
          label="Alokasi Waktu"
          type="text"
          placeholder="Masukkan Alokasi Waktu"
          name="alokasi_waktu"
          value={formData.alokasi_waktu}
          onChange={handleChange}
          errors={errors.alokasi_waktu}
        />

        <InputForm
          label="Kompetensi Awal"
          type="text"
          placeholder="Masukkan Kompetensi Awal"
          name="kompetensi_awal"
          value={formData.kompetensi_awal}
          onChange={handleChange}
          errors={errors.kompetensi_awal}
        />

        <div className="mb-4">
          <label className="block mb-1 text-sm font-semibold text-gray-800">
            Pilih Profil Pelajar Pancasila
          </label>
          <Select
            isMulti
            options={profilPelajar}
            value={profilPelajar.filter((option) =>
              formData.profil_pancasila.includes(option.label)
            )}
            onChange={(selectedOptions) =>
              setFormData({
                ...formData,
                profil_pancasila: selectedOptions.map((option) => option.label),
              })
            }
          />
          {errors.profil_pancasila && (
            <p className="mt-1 text-sm text-red-500">
              {errors.profil_pancasila}
            </p>
          )}
        </div>

        <InputForm
          label="Sarana dan Prasarana"
          type="text"
          placeholder="Masukkan Sarana dan Prasarana"
          name="sarana_prasarana"
          value={formData.sarana_prasarana}
          onChange={handleChange}
          errors={errors.sarana_prasarana}
        />

        <InputForm
          label="Model Pembelajaran"
          type="text"
          placeholder="Masukkan Model Pembelajaran"
          name="model_pembelajaran"
          value={formData.model_pembelajaran}
          onChange={handleChange}
          errors={errors.model_pembelajaran}
        />

        <InputForm
          label="Tujuan Bab"
          type="text"
          placeholder="Masukkan Tujuan Bab"
          name="tujuan_bab"
          value={formData.tujuan_bab}
          onChange={handleChange}
          errors={errors.tujuan_bab}
        />

        <InputForm
          label="Deskripsi CP"
          type="text"
          placeholder="Masukkan Deskripsi CP"
          name="deskripsi_cp"
          value={formData.deskripsi_cp}
          onChange={handleChange}
          errors={errors.deskripsi_cp}
        />

        <InputForm
          label="Pemahaman"
          type="text"
          placeholder="Masukkan Pemahaman"
          name="pemahaman"
          value={formData.pemahaman}
          onChange={handleChange}
          errors={errors.pemahaman}
        />

        <TextAreaForm
          label="Kegiatan Pembelajaran"
          placeholder="Masukkan Kegiatan Pembelajaran"
          name="kegiatan_pembelajaran"
          value={formData.kegiatan_pembelajaran}
          onChange={handleChange}
          errors={errors.kegiatan_pembelajaran}
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

export default FormModulPembelajaran;
