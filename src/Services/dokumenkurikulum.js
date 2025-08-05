import axiosInstance from "./auth";

export const getAllDokumenKurikulum = async (callback) => {
  try {
    const response = await axiosInstance.get(`/dokkur`);
    callback(true, response.data);
  } catch (error) {
    console.error("Get all dokumen error:", error);
    callback(false, error.response?.data?.msg || error.message);
  }
};

export const createDokumenKurikulum = async (formData, callback) => {
  try {
    // Assuming formData is already a FormData object created in the component
    // Remove the Content-Type header to let axios set it automatically with boundary
    const response = await axiosInstance.post(`/dokkur`, formData);

    console.log("Response from create:", response.data);
    callback(true, response.data);
  } catch (error) {
    console.error("Create dokumen error:", error);
    // More detailed error logging
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
    }
    callback(false, error.response?.data?.msg || error.message);
  }
};

export const updateDokumenKurikulum = async (id, formData, callback) => {
  try {
    // Assuming formData is already a FormData object created in the component
    // Remove the Content-Type header to let axios set it automatically
    const response = await axiosInstance.put(`/dokkur/${id}`, formData);

    console.log("Response from update:", response.data);
    callback(true, response.data);
  } catch (error) {
    console.error("Update dokumen error:", error);
    // More detailed error logging
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
    }
    callback(false, error.response?.data?.msg || error.message);
  }
};

export const deleteDokumenKurikulum = async (id, callback) => {
  try {
    const response = await axiosInstance.delete(`/dokkur/${id}`);
    callback(true, response.data);
  } catch (error) {
    console.error("Delete dokumen error:", error);
    callback(false, error.response?.data?.msg || error.message);
  }
};
