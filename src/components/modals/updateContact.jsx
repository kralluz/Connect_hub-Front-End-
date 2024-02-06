import { useContext, useEffect } from "react";
import ModalBase from "./basedModal";
import { useContactStState } from "../../hooks/useContacts";
import { useForm } from "react-hook-form";
import { api } from "../../services/api";
import { ContactContext } from "../../providers/contactProvider";
import UpdateContactForm from "../forms/updateContactForm";

const UpdateContactModal = ({ isOpen, onClose, contact }) => {


    return (
        <ModalBase isOpen={isOpen} onClose={onClose}>
            {contact && (
                <>
                    <h2>Atualizar o contato de {contact.name}?</h2>
                    <UpdateContactForm
                    contact={contact}
                    onClose={onClose}
                    />
                </>
            )}
        </ModalBase>
    );
};

export default UpdateContactModal;
