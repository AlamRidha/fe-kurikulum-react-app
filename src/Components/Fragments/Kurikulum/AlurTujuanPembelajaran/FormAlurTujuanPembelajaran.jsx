import { useEffect, useRef, useState } from "react";
import {
  createAlurTujuanPembelajaran,
  updateAlurTujuanPembelajaran,
} from "../../../../Services/alurtujuanpembelajaran";
import ModalForm from "../../Modal";
import InputForm from "../../../Elements/Input";
import Button from "../../../Elements/Button";
import { getTujuanPembelajaran } from "../../../../Services/tujuanpembelajaran";
import Select from "react-select";
import Alert from "../../../Elements/Alerts/Alerts";

const FormAlurTujuanPembelajaran = (props) => {
  const {
    onSubmitSuccess,
    handleClose,
    initialData = null,
    isEditing = false,
    title,
    idMp,
  } = props;

  const [tujuanPembelajaranList, setTujuanPembelajaranList] = useState([]);
  const [createFailed, setCreateFailed] = useState("");
  const [updateFailed, setUpdateFailed] = useState("");
  const [formData, setFormData] = useState(() => {
    return {
      tahap: "",
      alur_tujuan_pembelajaran: [],
      ...(initialData && {
        ...initialData,
        alur_tujuan_pembelajaran: Array.isArray(
          initialData.alur_tujuan_pembelajaran
        )
          ? initialData.alur_tujuan_pembelajaran
          : typeof initialData.alur_tujuan_pembelajaran === "string"
          ? JSON.parse(initialData.alur_tujuan_pembelajaran)
          : [],
      }),
    };
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.tahap.trim()) {
      newErrors.tahap = "Tahap Tidak Boleh Kosong";
    }

    if (
      !formData.alur_tujuan_pembelajaran ||
      formData.alur_tujuan_pembelajaran.length === 0
    ) {
      newErrors.alur_tujuan_pembelajaran =
        "Pilih Minimal Satu Tujuan Pembelajaran";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (isEditing) {
        const updateData = {
          ...formData,
          alur_tujuan_pembelajaran: JSON.stringify(
            formData.alur_tujuan_pembelajaran
          ),
        };

        await updateAlurTujuanPembelajaran(
          formData.idAtp,
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
        console.log(formData);
        await createAlurTujuanPembelajaran(
          idMp,
          {
            ...formData,
            alur_tujuan_pembelajaran: JSON.stringify(
              formData.alur_tujuan_pembelajaran
            ),
          },
          (status, res) => {
            if (status) {
              onSubmitSuccess();
              handleClose();
            } else {
              console.log("Error", res);
              setCreateFailed(res);
            }
          }
        );
      }
    }
  };

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

  const handleCheckBoxChange = (e) => {
    const { value, checked } = e.target;

    let updatedList = [...formData.alur_tujuan_pembelajaran];

    if (checked) {
      updatedList.push(value);
    } else {
      updatedList = updatedList.filter((item) => item !== value);
    }

    setFormData({
      ...formData,
      alur_tujuan_pembelajaran: updatedList,
    });

    setErrors({
      ...errors,
      alur_tujuan_pembelajaran: "",
    });
  };

  const tahap = useRef(null);

  useEffect(() => {
    getTujuanPembelajaran(idMp, (status, res) => {
      if (status) {
        // console.log(res.data);
        const options = res.data.map((item) => ({
          value: item.idTp,
          label: item.tujuan_pembelajaran,
        }));
        setTujuanPembelajaranList(options);
      } else {
        console.error("Error get data", res);
      }
    });
  }, [idMp]);

  useEffect(() => {
    tahap.current.focus();
  }, []);

  return (
    <ModalForm closeModal={handleClose} title={title}>
      <form onSubmit={onSubmit} className="bg-white rounded-lg shadow-md ">
        <InputForm
          label="Tahap"
          type="text"
          placeholder="Masukkan Tahap"
          name="tahap"
          ref={tahap}
          value={formData.tahap}
          onChange={handleChange}
          errors={errors.tahap}
        />

        <div className="mb-4">
          <label className="block mb-1 text-sm font-semibold text-gray-800">
            Pilih Alur Tujuan Pembelajaran
          </label>
          <Select
            isMulti
            options={tujuanPembelajaranList}
            value={tujuanPembelajaranList.filter((option) =>
              formData.alur_tujuan_pembelajaran.includes(option.label)
            )}
            onChange={(selectedOptions) =>
              setFormData({
                ...formData,
                alur_tujuan_pembelajaran: selectedOptions.map(
                  (option) => option.label
                ),
              })
            }
          />
          {errors.alur_tujuan_pembelajaran && (
            <p className="mt-1 text-sm text-red-500">
              {errors.alur_tujuan_pembelajaran}
            </p>
          )}

          {/* <div className="mt-2">
            {tujuanPembelajaranList.map((item) => (
              <div key={item.idTp} className="flex items-center mb-1">
                <input
                  type="checkbox"
                  value={item.tujuan_pembelajaran}
                  checked={formData.alur_tujuan_pembelajaran.includes(
                    item.tujuan_pembelajaran
                  )}
                  onChange={handleCheckBoxChange}
                  className="mr-2"
                />
                <label className="text-sm text-gray-700">
                  {item.tujuan_pembelajaran}
                </label>
              </div>
            ))}
            {errors.alur_tujuan_pembelajaran && (
              <p className="text-sm text-red-500">
                {errors.alur_tujuan_pembelajaran}
              </p>
            )}
          </div> */}
        </div>

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

export default FormAlurTujuanPembelajaran;
