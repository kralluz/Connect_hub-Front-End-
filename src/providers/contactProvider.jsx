import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

export const ContactContext = createContext({});

export const ContactProvider = ({ children }) => {
    const [contacts, setContacts] = useState();
    console.log("🚀 ~ ContactProvider ~ contacts:", contacts)
    console.log("🚀 ~ ContactProvider ~ contacts:", contacts)
    console.log("🚀 ~ ContactProvider ~ contacts:", contacts)

    const token = localStorage.getItem("@CONNECT_HUB_TOKEN");

    const createContact = async (formData) => {
        try {
            const response = await api.post("/contacts", formData);
            readAllContacts();
            if (response.status === 200) {
                console.log("Requisição POST bem-sucedida!");
            }
        } catch (error) {
            console.log("Requisição POST mal-sucedida!");
            console.log("Error: " + error);
        }
    };

    const readAllContacts = async () => {
        try {
            const { data } = await api.get("/contacts");
            setContacts(data);
        } catch (error) {
            console.log("🚀🚀🚀~ autoLogin ~ error:", error.message);
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
            console.log("🚀 ~ contactUpdate ~ error:", error);
        }
    };

    const deleteContact = async (contactId) => {
        try {
            const response = await api.delete(`/contacts/${contactId}`);
            if (response.status === 204) {
                console.log("Requisição DELETE bem-sucedida!");
            }
            await readAllContacts();
        } catch (error) {
            console.log("Requisição DELETE mal-sucedida!" + error);
            console.log("Error: " + error + contactId);
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
