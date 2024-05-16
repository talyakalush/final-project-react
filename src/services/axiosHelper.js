import axios from "axios";

axios.defaults.baseURL = "http://localhost:3031/api/";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
});
