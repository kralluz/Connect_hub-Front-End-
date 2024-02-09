import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import toast from "react-hot-toast";
import { ContactContext } from "./contactProvider";

export const ClientContext = createContext({});

export const ClientProvider = ({ children }) => {
    const [client, setClient] = useState();
    const [isLoading, setIsLoading] = useState();
    const {setContacts} = useContext(ContactContext);

    const token = localStorage.getItem("@CONNECT_HUB_TOKEN");

    const readClient = async (id) => {
        if (token) {
            try {
                const { clientId } = JSON.parse(atob(token.split(".")[1]));
                const { data } = await api.get(`/clients/${clientId}`);
                setClient(data);
            } catch (error) {
                toast.error("Houve um erro, consulte o fornecedor")
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
            if (response.status === 201) {
                toast.success("Cadastro realizado com sucesso!");
            } else {
                toast.error("Erro desconhecido");
            }
        } catch (error) {
            let errorMessage =
                "Ocorreu um erro ao tentar registrar. Por favor, tente novamente.";
            if (error.response) {
                switch (error.response.status) {
                    case 409:
                        errorMessage =
                            "Um usuário com este e-mail ou número já existe!";
                        break;
                    default:
                        break;
                }
            }
            toast.error(errorMessage);
        } finally {
            setClient(false);
            setIsLoading(false);
        }
    };

    const clientLogin = async (formData) => {
        setIsLoading(true);
        try {
            const response = await api.post("/session", formData);
            let errorMessage =
                "Ocorreu um erro ao tentar registrar. Por favor, tente novamente.";
            switch (response.status) {
                case 200:
                    const { token, ...clientData } = response.data;
                    localStorage.setItem("@CONNECT_HUB_TOKEN", token);
                    setClient(clientData);
                    toast.success("Login realizado com sucesso!");
                    window.location.href = "/";
                    break;
                case 401:
                    errorMessage =
                        "🚀 Dados incorretos ou usuário não autorizado.";
                    break;
                default:
                    break;
            }
            if (response.status !== 200) {
                toast.error(errorMessage);
            }
        } catch (error) {
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        toast.error("Dados incorretos.");
                        break;
                    case 404:
                        toast.error("Usuário não encontrado.");
                        break;
                    case 500:
                        toast.error("Erro no servidor.");
                        break;
                    default:
                        toast.error("Erro desconhecido ao tentar fazer login.");
                        break;
                }
            } else {
                toast.error("Erro ao tentar se conectar ao servidor.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const updateClient = async (id, formData) => {
        setIsLoading(true);
        if (token) {
            try {
                const response = await api.patch(`/clients/${id}`, formData);
                if (response.status === 200) {
                    toast.success("atualizado com sucesso");
                    readClient();
                }
            } catch (error) {
                toast.error("Houve um erro, consulte o fornecedor")
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
