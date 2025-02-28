import axiosInstance from "./auth";

// API GET DATA
export const getAllData = async (callback) => {
  try {
    const response = await axiosInstance.get(`/users`);
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
    const response = await axiosInstance.post(`/users`, data);
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
    const response = await axiosInstance.put(`/users/${id}`, data);
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
    const response = await axiosInstance.delete(`/users/${id}`);
    callback(true, response.data);
  } catch (error) {
    console.error("Error delete data", error);
    callback(false, error.response.data.msg);
  }
};
