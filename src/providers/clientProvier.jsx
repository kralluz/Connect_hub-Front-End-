import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

export const ClientContext = createContext({});

export const ClientProvider = ({ children }) => {
    const [client, setClient] = useState();
    const [isLoading, setIsLoading] = useState();

    const token = localStorage.getItem("@CONNECT_HUB_TOKEN");

    const readClient = async (id) => {
        if (token) {
            try {
                const { clientId } = JSON.parse(atob(token.split(".")[1]));
                const { data } = await api.get(`/clients/${clientId}`);
                setClient(data);
            } catch (error) {
                console.log("🚀🚀🚀~ autoLogin ~ error:", error.message);
            }
        }
    };
    useEffect(() => {
        if (token) {
            readClient();
        }
    }, []);

    const clientRegister = async (formData) => {
        setIsLoading(true);
        localStorage.removeItem("@CONNECT_HUB_TOKEN");
        try {
            const response = await api.post("/clients", formData);
            if (response.status === 200) {
                window.location.href = "/session";
            } else {
                toast.error("Erro ao fazer cadastro");
            }
        } catch (error) {
            console.log("Requisição POST mal-sucedida!");
            console.log("Error: " + error);
            toast.error("Erro ao fazer cadastro");
        }
        setClient(false);
        setIsLoading(false);
    };

    const clientLogin = async (formData) => {
        setIsLoading(true);
        try {
            const response = await api.post("/session", formData);
            if (response.status === 200) {
                toast.success("Login realizado com sucesso!");
            }
            const { token } = response.data;
            localStorage.setItem("@CONNECT_HUB_TOKEN", token);
            const clientData = response.data;
            setClient(clientData);
            toast.success("Login bem-sucedido!");
            window.location.href = "/";
        } catch (error) {
            console.log("🚀 ~ clientLogin ~ error:", error);
            toast.error("Erro ao fazer login");
        }
        setIsLoading(false);
    };

    const updateClient = async (id, formData) => {
        setIsLoading(true);
        if (token) {
            try {
                const response = await api.patch(`/clients/${id}`, formData);
                if (response.status === 200) {
                    console.log("Requisição PATCH bem-sucedida!");
                    readClient();
                }
            } catch (error) {
                console.log("Requisição PATCH mal-sucedida!");
                console.log("Error: " + error);
            }
        }
        setIsLoading(false);
    };

    const clientLogout = () => {
        setIsLoading(true);
        localStorage.removeItem("@CONNECT_HUB_TOKEN");
        setClient(null);
        setContacts([]);
        window.location.href = "/session";
        setIsLoading(false);
    };

    return (
        <ClientContext.Provider
            value={{
                client,
                setClient,
                isLoading,
                setIsLoading,
                clientRegister,
                clientLogin,
                updateClient,
                clientLogout,
            }}
        >
            {children}
        </ClientContext.Provider>
    );
};
