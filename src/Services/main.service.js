import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllFase = async (callback) => {
  try {
    const response = await axios.get(`${API_URL}/fase`);
    callback(true, response.data);
  } catch (error) {
    console.error("Error response ", error);

    callback(false, error.message);
  }
};

export const getAllKelas = async (idFase, callback) => {
  try {
    const response = await axios.get(`${API_URL}/fase/${idFase}/kelas`);
    callback(true, response.data);
    console.log("ini response", response);
  } catch (error) {
    console.error("Error response ", error);

    callback(false, error.message);
  }
};
