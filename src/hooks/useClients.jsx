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
        let toastDisplayed = false; 

        async function acordarBackend(url, maxTentativas = 5) {
            if (!toastDisplayed) {
                toast(`Tentando conectar ao back-end.`);
                toastDisplayed = true;
            }

            for (let tentativa = 1; tentativa <= maxTentativas; tentativa++) {
                try {
                    const response = await fetch(url);
                    if (response.ok) {
                        toast.success("Back-end conectado com sucesso!");
                        break;
                    } else if (response.status === 502) {
                        continue; 
                    } else {
                        toast.error(
                            `Falha na tentativa de acessar o Back-end. Entre em contato com o fornecedor.`
                        );
                        break;
                    }
                } catch (erro) {
                    toast.error(`Erro na tentativa ${tentativa}: ${erro}`);
                    break;
                }
            }
        }

        await acordarBackend(
            "https://connect-hub-back-end.onrender.com/clients"
        );

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
        const response = await api.post("/clients", formData);
        if (response.status === 200) {
            window.location.href = "/session";
        } else {
            toast.error("Erro ao fazer cadastro ,consulte o fornecedor");
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
        } catch (error) {
            toast.error("Erro ao fazer login, consulte o fornecedor");
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
