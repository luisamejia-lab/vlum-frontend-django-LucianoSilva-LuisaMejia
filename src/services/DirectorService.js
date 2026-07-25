import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getDirectorList = async () => {
  try {
    const response = await apiClient.get("/directors/");
    return response.data;
  } catch (error) {
    console.error("Error obteniendo lista de directores:", error);
    throw error;
  }
};

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export const addDirector = async (directorData) => {
  let pictureBase64 = ""
  if (directorData.picture) {
    pictureBase64 = await fileToBase64(directorData.picture);
  }
  const payload = { ...directorData, picture: pictureBase64 };
  try {
    const response = await apiClient.post("/directors/", payload);
    return response.data;
  } catch (error) {
    console.error("Error agregando director:", error);
    throw error;
  }
};

export const getDirector = async (id) => {
  try {
    const response = await apiClient.get(`/directors/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo director ${id}:`, error);
    throw error;
  }
};

export const updateDirector = async (id, directorData) => {
  let payload = { ...directorData };
  if (directorData.picture instanceof File) {
    payload.picture = await fileToBase64(directorData.picture);
  } else {
    delete payload.picture;
  }
  try {
    const response = await apiClient.put(`/directors/${id}/`, payload);
    return response.data;
  } catch (error) {
    console.error("Error actualizando director:", error);
    throw error;
  }
};

export const deleteDirector = async (id) => {
  try {
    await apiClient.delete(`/directors/${id}/`);
  } catch (error) {
    console.error("Error eliminando director:", error);
    throw error;
  }
};
