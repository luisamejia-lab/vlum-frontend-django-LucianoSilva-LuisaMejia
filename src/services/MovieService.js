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

export const getMovieList = async () => {
  try {
    const response = await apiClient.get("/movies/");
    return response.data;
  } catch (error) {
    console.error("Error obteniendo lista de peliculas:", error);
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

export const addMovie = async (movieData) => {
  let pictureBase64 = ""
  if (movieData.picture) {
    pictureBase64 = await fileToBase64(movieData.picture);
  }
  const payload = { ...movieData, picture: pictureBase64 };
  try {
    const response = await apiClient.post("/movies/", payload);
    return response.data;
  } catch (error) {
    console.error("Error agregando pelicla:", error);
    throw error;
  }
};

export const getMovie = async (id) => {
  try {
    const response = await apiClient.get(`/movies/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo película ${id}:`, error);
    throw error;
  }
};

export const getMoviesByDirector = async (directorId) => {
  try {
    const response = await apiClient.get(`/movies/?director=${directorId}`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo películas del director ${directorId}:`, error);
    throw error;
  }
};

export const updateMovie = async (id, movieData) => {
  let payload = { ...movieData };
  if (movieData.picture instanceof File) {
    payload.picture = await fileToBase64(movieData.picture);
  } else {
    delete payload.picture;
  }
  try {
    const response = await apiClient.put(`/movies/${id}/`, payload);
    return response.data;
  } catch (error) {
    console.error("Error actualizando película:", error);
    throw error;
  }
};

export const deleteMovie = async (id) => {
  try {
    await apiClient.delete(`/movies/${id}/`);
  } catch (error) {
    console.error("Error eliminando película:", error);
    throw error;
  }
};
