import axios from "axios";
import axiosInstance from "./auth";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllFase = async (callback) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/fase`);
    callback(true, response.data);
  } catch (error) {
    console.error("Error response ", error);

    callback(false, error.message);
  }
};

export const getAllKelas = async (idFase, callback) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/fase/${idFase}/kelas`);
    callback(true, response.data);
  } catch (error) {
    console.error("Error response ", error);

    callback(false, error.message);
  }
};

export const getSemester = async (idKelas, callback) => {
  try {
    const response = await axiosInstance.get(
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
    const response = await axiosInstance.get(
      `${API_URL}/fase/semester/${idSemester}/mp`
    );
    callback(true, response.data);
  } catch (error) {
    console.error("Error response ", error);
    callback(false, error.message);
  }
};


