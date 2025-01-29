import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// API GET DATA
export const getAllData = async (callback) => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    // console.log(response.data);

    callback(true, response.data);
  } catch (error) {
    // send callback if data error
    console.error("Error response ", error);
    callback(false, error.msg);
  }
};

// API CREATE DATA
export const createUser = async (data, callback) => {
  try {
    const response = await axios.post(`${API_URL}/users`, data);
    console.log("Data yang masuk ", response.data);

    callback(true, response.data);
  } catch (error) {
    console.error("Error create data", error);

    callback(false, error.response.data.msg);
  }
};

// API UPDATE DATA
export const updateUser = async (id, data, callback) => {
  try {
    const response = await axios.put(`${API_URL}/users/${id}`, data);
    console.log("Data sudah terupdate", response.data);

    callback(true, response.data);
  } catch (error) {
    console.error("Error update user", error);

    callback(false, error.response.data.msg);
  }
};

// API DELETE DATA
export const deleteUser = async (id, callback) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${id}`);
    console.log("Data sudah terhapus", response.data);

    callback(true, response.data);
  } catch (error) {
    console.error("Error delete data", error);
    callback(false, error.response.data.msg);
  }
};
