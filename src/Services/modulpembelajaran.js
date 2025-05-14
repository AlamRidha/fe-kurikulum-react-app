import axiosInstance from "./auth";

export const getAllModulPembelajaran = async (idMp, callback) => {
  try {
    const response = await axiosInstance.get(
      `/kurikulum/${idMp}/modul_pembelajaran`
    );
    callback(true, response.data);
  } catch (error) {
    console.error("Error response ", error);

    callback(false, error.message);
  }
};

export const createModulPembelajaran = async (idMp, data, callback) => {
  try {
    console.log(data);
    const response = await axiosInstance.post(
      `/kurikulum/${idMp}/modul_pembelajaran`,
      data
    );
    callback(true, response.data);
  } catch (error) {
    console.error("Error response ", error);
    callback(false, error.message);
  }
};

export const updateModulPembelajaran = async (id, data, callback) => {
  try {
    const response = await axiosInstance.put(
      `/kurikulum/modul_pembelajaran/${id}`,
      data
    );
    callback(true, response.data);
  } catch (error) {
    console.error("Error response ", error);
    callback(false, error.message);
  }
};

export const deleteModulPembelajaran = async (id, callback) => {
  try {
    const response = await axiosInstance.delete(
      `/kurikulum/modul_pembelajaran/${id}`
    );
    callback(true, response.data);
  } catch (error) {
    console.error("Error response ", error);
    callback(false, error.message);
  }
};
