import { useState } from "react";
import { api } from "../services/api";

export const useClientState = () => {
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(false);
    const [contacts, setContacts] = useState([]);

    const autoLogin = async (token) => {
        if (token) {
            const { clientId } = JSON.parse(atob(token.split(".")[1]));
            try {
                const getClient = await api.get(`/clients/${clientId}`);
                const getContacts = await api.get(`/contacts/`);
                setContacts(getContacts.data);
                setClient(getClient.data);
            } catch (error) {
                console.log("🚀 ~ autoLogin ~ error:", error.message);
            }
        }
    };

    const clientRegister = async (formData) => {
        try {
            const response = await api.post("/clients", formData);
            if (response.status === 200) {
                alert("Requisição POST bem-sucedida!");
                window.location.href = "/";
            }
            if (response.status != 200) {
                alert("Requisição POST mal-sucedida!");
            }
        } catch (error) {
            console.log("Requisição POST mal-sucedida!");
            console.log("Error: " + error);
        }
    };

    const clientLogin = async (formData) => {
        setLoading(true);
        try {
            const response = await api.post("/session", formData);
            if (response.status === 200) {
                alert("Requisição POST bem-sucedida!");
            }
            const { token } = response.data;
            localStorage.setItem("@CONNECT_HUB_TOKEN", token);
            const clientData = response.data;
            setClient(clientData);
            alert("Login bem-sucedido!");
            window.location.href = "/home";
        } catch (error) {
            alert("🚀 ~ clientLogin ~ error:", error);
        }
        setLoading(false);
    };

    const clientLogout = () => {
        localStorage.removeItem("@CONNECT_HUB_TOKEN");
        setClient(null);
        setContacts([]);
        window.location.href = "/";
    };

    return {
        client,
        setClient,
        loading,
        setLoading,
        contacts,
        autoLogin,
        clientRegister,
        clientLogin,
        clientLogout,
    };
};
