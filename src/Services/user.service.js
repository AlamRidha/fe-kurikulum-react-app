import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

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
