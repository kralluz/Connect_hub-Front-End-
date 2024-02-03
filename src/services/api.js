import axios from "axios";

export const api = axios.create({
    baseURL: "https://connect-hub-back-end.onrender.com",
    timeout: 8000,
});

api.interceptors.request.use(
    (config) => {
        const token =
            typeof window !== "undefined"
                ? localStorage.getItem("@CONNECT_HUB_TOKEN")
                : null;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
