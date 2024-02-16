import axios from "axios";
import "dotenv/config";


export const api = axios.create({
    baseURL: ProcessingInstruction.env.API_URL || "http://localhost:3000",
    timeout: 80000,
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
