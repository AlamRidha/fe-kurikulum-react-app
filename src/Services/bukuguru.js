import axiosInstance from "./auth";

export const getAllDataBukuGuru = async (callback) => {
  try {
    const response = await axiosInstance.get(`/dbuku`);

    callback(true, response.data);
  } catch (error) {
    callback(false, error.message);
  }
};

export const createDataBukuGuru = async (data, callback) => {
  try {
    const response = await axiosInstance.post(`/dbuku`, data);
    callback(true, response.data);
  } catch (error) {
    callback(false, error.message);
  }
};

export const updateDataBukuGuru = async (id, data, callback) => {
  try {
    const response = await axiosInstance.put(`/dbuku/${id}`, data);
    callback(true, response.data);
  } catch (error) {
    callback(false, error.message);
  }
};

export const deleteDataBukuGuru = async (id, callback) => {
  try {
    const response = await axiosInstance.delete(`/dbuku/${id}`);
    callback(true, response.data);
  } catch (error) {
    callback(false, error.message);
  }
};

export const getDataByIdBukuGuru = async (id, callback) => {
  try {
    const response = await axiosInstance.get(`/dbuku/${id}`);
    callback(true, response.data);
  } catch (error) {
    callback(false, error.message);
  }
};
