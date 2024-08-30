import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const handleApiError = (error) => {
  if (error.response) {
    console.error("Data:", error.response.data);
    console.error("Status:", error.response.status);
    console.error("Headers:", error.response.headers);
    throw new Error(`Server error: ${error.response.data.message || error.response.statusText}`);
  } else if (error.request) {
    console.error("Request:", error.request);
    throw new Error("No response received from server");
  } else {
    console.error("Error:", error.message);
    throw new Error(`Request setup error: ${error.message}`);
  }
};

export const getUsers = async () => {
  try {
    const response = await axiosInstance.get('');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axiosInstance.post('', userData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await axiosInstance.put(`/${id}`, userData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axiosInstance.delete(`/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
