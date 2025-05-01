import axiosInstance from "./auth";

export const createAlurTujuanPembelajaran = async (idMp, data, callback) => {
  try {
    const response = await axiosInstance.post(
      `/kurikulum/${idMp}/alur_tujuan_pembelajaran`,
      data
    );

    callback(true, response.data);
  } catch {
    console.log("eror", error);
    callback(false, error.message);
  }
};

export const getAlurTujuanPembelajaran = async (idMp, callback) => {
  try {
    const response = await axiosInstance.get(
      `/kurikulum/${idMp}/alur_tujuan_pembelajaran`
    );

    callback(true, response.data);
  } catch (error) {
    callback(false, error.message);
  }
};

export const deleteAlurTujuanPembelajaran = async (id, callback) => {
  try {
    const response = await axiosInstance.delete(
      `/kurikulum/alur_tujuan_pembelajaran/${id}`
    );

    callback(true, response.data);
  } catch (error) {
    callback(false, error.message);
  }
};

export const updateAlurTujuanPembelajaran = async (id, data, callback) => {
  try {
    const response = await axiosInstance.put(
      `/kurikulum/alur_tujuan_pembelajaran/${id}`,
      data
    );

    callback(true, response.data);
  } catch (error) {
    callback(false, error.message);
  }
};
