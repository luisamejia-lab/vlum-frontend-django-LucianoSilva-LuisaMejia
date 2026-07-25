import axios from "axios";

const AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL;
const CLIENT_ID = import.meta.env.VITE_API_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_API_CLIENT_SECRET;

const authClient = axios.create({
  baseURL: AUTH_BASE_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export const login = async (username, password) => {
  try {
    const response = await authClient.post("/token/", {
      username: username,
      password: password,
      grant_type: "password",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    });
    return response.data;
  } catch (error) {
    throw new Error("Error during login: " + error.message);
  }
};

// ---------------------------------------------------------------------------

export const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

export const logout = () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    authClient.post("/revoke_token/", {
      token: token,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    });
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }

  localStorage.removeItem("token");
};
