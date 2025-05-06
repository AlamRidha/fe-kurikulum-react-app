import axiosInstance from "./auth";

export const getAsesmenPembelajaran = async (idMp, callback) => {
  try {
    const response = await axiosInstance.get(`/kurikulum/${idMp}/asesmen`);

    callback(true, response.data);
  } catch (error) {
    callback(false, error.message);
  }
};

export const createAsesmenPembelajaran = async (idMp, data, callback) => {
  try {
    const response = await axiosInstance.post(
      `/kurikulum/${idMp}/asesmen`,
      data
    );
    callback(true, response.data);
  } catch (error) {
    console.log("error", error);
    callback(false, error.message);
  }
};

export const updateAsesmenPembelajaran = async (id, data, callback) => {
  try {
    const response = await axiosInstance.put(`/kurikulum/asesmen/${id}`, data);
    callback(true, response.data);
  } catch (error) {
    console.log("error", error);
    callback(false, error.message);
  }
};

export const deleteAsesmenPembelajaran = async (id, callback) => {
  try {
    const response = await axiosInstance.delete(`/kurikulum/asesmen/${id}`);
    callback(true, response.data);
  } catch (error) {
    console.log("error", error);
    callback(false, error.message);
  }
};
