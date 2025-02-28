import axiosInstance from "./auth";

export const getAllDataProfilPelajar = async (callback) => {
  try {
    const response = await axiosInstance.get(`/profilpelajar`);
    callback(true, response.data);
  } catch (error) {
    console.error("Error response ", error);

    callback(false, error.message);
  }
};

export const getDataById = async (id, callback) => {
  try {
    const response = await axiosInstance.get(`/profilpelajar/${id}`);
    callback(true, response.data);
  } catch (error) {
    console.error("Error response ", error);

    callback(false, error.message);
  }
};

export const createData = async (data, callback) => {
  try {
    const response = await axiosInstance.post(`/profilpelajar`, data);
    callback(true, response.data);
  } catch (error) {
    console.error("Error response ", error);
    callback(false, error.message);
  }
};

export const updateDataProfil = async (id, data, callback) => {
  try {
    const response = await axiosInstance.put(`/profilpelajar/${id}`, data);
    callback(true, response.data);
  } catch (error) {
    console.error("Error response ", error);
    callback(false, error.message);
  }
};

export const deleteDataProfilPelajar = async (id, callback) => {
  try {
    const response = await axiosInstance.delete(`/profilpelajar/${id}`);
    callback(true, response.data);
  } catch (error) {
    console.error("Error response ", error);
    callback(false, error.message);
  }
};
