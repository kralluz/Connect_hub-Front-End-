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
                toast.error("Houve um erro, consulte o fornecedor!!");
            }
        }
    };

    const createContact = async (formData) => {
        try {
            const response = await api.post("/contacts", formData);
            if (response.status === 200) {
                toast.success("Contato criado com sucesso!");
            }
        } catch (error) {
            toast.error("Houve um erro, consulte o fornecedor");
        }
    };

    const updateContact = async (contactId, formData) => {
        try {
            const response = await api.patch(
                `/contacts/${contactId}`,
                formData
            );
            if (response.status === 200) {
                toast.success("atualizado com sucesso!");
            }
        } catch (error) {
            toast.error("Houve um erro, consulte o fornecedor");
        }
    };

    const deleteContact = async (contactId) => {
        try {
            const response = await api.delete(`/contacts/${contactId}`);
            if (response.status === 204) {
                toast.success("deletado com sucesso");
            }
            if (response.status != 200) {
                toast;
            }
        } catch (error) {
            toast.error("Houve um erro, consulte o fornecedor");
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
