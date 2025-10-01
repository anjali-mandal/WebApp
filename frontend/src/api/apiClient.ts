import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api", // ✅ backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add JWT automatically
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
