import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import toast from "react-hot-toast";

export const ContactContext = createContext({});

export const ContactProvider = ({ children }) => {
    const [contacts, setContacts] = useState();

    const token = localStorage.getItem("@CONNECT_HUB_TOKEN");

    const createContact = async (formData) => {
        const response = await api.post("/contacts", formData);
        readAllContacts();
        if (response.status === 200) {
            toast.success("Contato adicionado com sucesso");
        }
        if (response.status === 409) {
            toast.error("Já existe um contato com estes dados!");
        }
        if (response.status === 400) {
            toast.error("Dados inválidos");
        }
        if (response.status === 500) {
            toast.error("Erro no servidor");
        }
    };

    const readAllContacts = async () => {
        try {
            const { data } = await api.get("/contacts");
            setContacts(data);
        } catch (error) {
            toast.error("Houve um erro, consulte o fornecedor");
        }
    };
    useEffect(() => {
        if (token) {
            readAllContacts();
        }
    }, [token]);

    const updateContact = async (contactId, formData) => {
        try {
            const { data } = await api.patch(
                `/contacts/${contactId}`,
                formData
            );
            await readAllContacts();
        } catch (error) {
            toast.error("Houve um erro, consulte o fornecedor");
        }
    };

    const deleteContact = async (contactId) => {
        try {
            const response = await api.delete(`/contacts/${contactId}`);
            if (response.status === 204) {
                toast.success("Deletado com sucesso");
            }
            await readAllContacts();
        } catch (error) {
            toast.error("Houve um erro, consulte o fornecedor");
        }
    };

    return (
        <ContactContext.Provider
            value={{
                contacts,
                readAllContacts,
                createContact,
                updateContact,
                deleteContact,
            }}
        >
            {children}
        </ContactContext.Provider>
    );
};
