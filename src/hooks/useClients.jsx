import { useState } from "react";
import { api } from "../services/api";
import { toast } from "react-hot-toast";

export const useClientState = () => {
    const [client, setClient] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isToastDisplayed, setIsToastDisplayed] = useState(false);

    const autoLogin = async (token) => {
        setIsLoading(true);
        async function acordarBackend(url, maxTentativas = 5) {
            for (let tentativa = 1; tentativa <= maxTentativas; tentativa++) {
                try {
                    console.log(
                        `Tentativa ${tentativa} de acordar o back-end.`
                    );
                    const response = await fetch(url);
                    if (response.ok) {
                        console.log("Back-end acordado com sucesso!");
                        break;
                    } 
                    if(response.status == 502){
                        await fetch(url);
                    }
                    else {
                        console.log(
                            `Falha na tentativa ${tentativa}. Código de resposta: ${resposta.status}`
                        );
                    }
                } catch (erro) {
                    console.log(`Erro na tentativa ${tentativa}: ${erro}`);
                }
                await new Promise((resolve) =>
                    setTimeout(resolve, 1000 * tentativa)
                );
            }
        }

        acordarBackend("https://connect-hub-back-end.onrender.com/clients");
        if (token) {
            const { clientId } = JSON.parse(atob(token.split(".")[1]));
            const getClient = await api.get(`/clients/${clientId}`);
            setClient(getClient.data);
            const getContacts = await api.get(`/contacts/`);
            setContacts(getContacts.data);
        }
        setIsLoading(false);
    };

    const fetchContacts = async () => {
        setIsLoading(true);
        const getContacts = await api.get(`/contacts/`);
        setContacts(getContacts.data);
        setIsLoading(false);
    };

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
        setContacts([]);
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

    const clientLogout = () => {
        setIsLoading(true);
        localStorage.removeItem("@CONNECT_HUB_TOKEN");
        setClient(null);
        setContacts([]);
        window.location.href = "/session";
        setIsLoading(false);
    };

    return {
        client,
        setClient,
        isLoading,
        setIsLoading,
        isToastDisplayed,
        setIsToastDisplayed,
        contacts,
        setContacts,
        autoLogin,
        clientRegister,
        clientLogin,
        clientLogout,
        fetchContacts,
    };
};
