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
  } catch (error) {
    console.error("Error response ", error);

    callback(false, error.message);
  }
};

export const getSemester = async (idKelas, callback) => {
  try {
    const response = await axios.get(
      `${API_URL}/fase/kelas/${idKelas}/semester`
    );
    callback(true, response.data);
  } catch (error) {
    console.error("Error response ", error);

    callback(false, error.message);
  }
};

export const getAllMataPelajaran = async (idSemester, callback) => {
  try {
    const response = await axios.get(
      `${API_URL}/fase/semester/${idSemester}/mp`
    );
    console.log("response api ", response);
    callback(true, response.data);
  } catch (error) {
    console.error("Error response ", error);
    callback(false, error.message);
  }
};
