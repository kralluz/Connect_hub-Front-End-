import React from "react";
import ModalBase from "../modals/basedModal";
import CreateContactForm from "../forms/createContactForm";

const CreateContactModal = ({ isOpen, onClose }) => {
    return (
        <ModalBase isOpen={isOpen} onClose={onClose}>
            <h2>Criação de Contato</h2>
            <CreateContactForm onClose={onClose} />
        </ModalBase>
    );
};

export default CreateContactModal;
