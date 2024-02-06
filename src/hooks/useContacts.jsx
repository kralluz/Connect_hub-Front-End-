import { useState } from "react";
import { api } from "../services/api";
import { useClientState } from "./useClients";

export const useContactStState = () => {
    const { contacts, setContacts } = useClientState();
    const [isLoadingContacts, setIsLLoadingContacts] = useState(false);

    const loadContacts = async () => {
        setIsLLoadingContacts(true);
        const token = localStorage.getItem("@CONNECT_HUB_TOKEN");
        if (token) {
            try {
                const getContacts = await api.get(`/contacts/`);
                setContacts(getContacts.data);
            } catch (error) {
                console.log("🚀 ~ autoLogin ~ error:", error.message);
            }
        }
    };

    const createContact = async (formData) => {
        try {
            const response = await api.post("/contacts", formData);
            if (response.status === 200) {
                console.log("Requisição POST bem-sucedida!");
            }
            if (response.status != 200) {
                console.log("Requisição POST mal-sucedida!");
            }
        } catch (error) {
            console.log("Requisição POST mal-sucedida!");
            console.log("Error: " + error);
        }
    };

    const updateContact = async (contactId, formData) => {
        try {
            const response = await api.patch(
                `/contacts/${contactId}`,
                formData
            );
            if (response.status === 200) {
                console.log("Requisição patch bem-sucedida!");
            }
        } catch (error) {
            console.log("Requisição patch mal-sucedida!");
            console.log("Error: " + error);
        }
    };

    const deleteContact = async (contactId) => {
        try {
            const response = await api.delete(`/contacts/${contactId}`);
            if (response.status === 204) {
                console.log("Requisição DELETE bem-sucedida!");
            }
            if (response.status != 200) {
                console.log(
                    "Requisição DELETE mal-sucedida!" + response.status
                );
            }
        } catch (error) {
            console.log("Requisição DELETE mal-sucedida!" + error);
            console.log("Error: " + error + contactId);
        }
    };
    return {
        contacts,
        setContacts,
        isLoadingContacts,
        setIsLLoadingContacts,
        createContact,
        deleteContact,
        updateContact,
        loadContacts,
    };
};
