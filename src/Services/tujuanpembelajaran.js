import axiosInstance from "./auth";

export const getTujuanPembelajaran = async (idMp, callback) => {
  try {
    const response = await axiosInstance.get(
      `/kurikulum/${idMp}/tujuan_pembelajaran`
    );

    callback(true, response.data);
  } catch (error) {
    callback(false, error.message);
  }
};

export const createTujuanPembelajaran = async (idMp, data, callback) => {
  try {
    const response = await axiosInstance.post(
      `/kurikulum/${idMp}/tujuan_pembelajaran`,
      data
    );

    callback(true, response.data);
  } catch (error) {
    callback(false, error.message);
  }
};

export const deleteTujuanPembelajaran = async (id, callback) => {
  try {
    const response = await axiosInstance.delete(
      `/kurikulum/tujuan_pembelajaran/${id}`
    );

    callback(true, response.data);
  } catch (error) {
    callback(false, error.message);
  }
};

export const updateTujuanPembelajaran = async (id, data, callback) => {
  try {
    const response = await axiosInstance.put(
      `/kurikulum/tujuan_pembelajaran/${id}`,
      data
    );

    callback(true, response.data);
  } catch (error) {
    callback(false, error.message);
  }
};
