import axios from "axios";

const api = axios.create({
    // baseURL: "http://localhost:8000/ap",
    // baseURL: import.meta.env.VITE_API_URL,
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
});

export default api;