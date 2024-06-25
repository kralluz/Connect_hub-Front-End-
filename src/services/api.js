import axios from "axios";

export const api = axios.create({
    baseURL: "https://connect-hub-front-end-git-main-kralluzs-projects.vercel.app/session",
    //baseURL: "https://localhost:3000", // url para ambiente em desenvolvimento
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
