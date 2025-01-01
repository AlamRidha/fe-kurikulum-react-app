import axios from "axios";

export const login = async (data, callback) => {
  const API_URL = import.meta.env.VITE_API_URL;
  //   not completed
  try {
    const response = await axios.get(`${API_URL / users}`);
  } catch (err) {
    console.log("Error to resp data ", err);
  }
};
