import axiosInstance from "./auth";

export const getCapaianPembelajaran = async (idMp, callback) => {
  try {
    const response = await axiosInstance.get(
      `/kurikulum/${idMp}/capaian_pembelajaran`
    );

    callback(true, response.data);
  } catch (error) {
    callback(false, error.message);
  }
};

export const createCapaianPembelajaran = async (idMp, data, callback) => {
  try {
    const response = await axiosInstance.post(
      `/kurikulum/${idMp}/capaian_pembelajaran`,
      data
    );

    callback(true, response.data);
  } catch (error) {
    callback(false, error.message);
  }
};

export const deleteCapaianPembelajaran = async (id, callback) => {
  try {
    const response = await axiosInstance.delete(
      `/kurikulum/capaian_pembelajaran/${id}`
    );

    callback(true, response.data);
  } catch (error) {
    callback(false, error.message);
  }
};

export const updateCapaianPembelajaran = async (id, data, callback) => {
  try {
    const response = await axiosInstance.put(
      `/kurikulum/capaian_pembelajaran/${id}`,
      data
    );

    callback(true, response.data);
  } catch (error) {
    callback(false, error.message);
  }
};
