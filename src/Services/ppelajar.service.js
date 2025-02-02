import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllDataProfilPelajar = async (callback) => {
  try {
    const response = await axios.get(`${API_URL}/profilpelajar`);
    callback(true, response.data);
  } catch (error) {
    console.error("Error response ", error);

    callback(false, error.message);
  }
};

export const getDataById = async (id, callback) => {
  try {
    const response = await axios.get(`${API_URL}/profilpelajar/${id}`);
    callback(true, response.data);
  } catch (error) {
    console.error("Error response ", error);

    callback(false, error.message);
  }
};

export const createData = async (data, callback) => {
  try {
    const response = await axios.post(`${API_URL}/profilpelajar`, data);
    callback(true, response.data);
  } catch (error) {
    console.error("Error response ", error);
    callback(false, error.message);
  }
};

export const updateDataProfil = async (id, data, callback) => {
  try {
    const response = await axios.put(`${API_URL}/profilpelajar/${id}`, data);
    callback(true, response.data);
  } catch (error) {
    console.error("Error response ", error);
    callback(false, error.message);
  }
};

export const deleteDataProfilPelajar = async (id, callback) => {
  try {
    const response = await axios.delete(`${API_URL}/profilpelajar/${id}`);
    callback(true, response.data);
  } catch (error) {
    console.error("Error response ", error);
    callback(false, error.message);
  }
};
