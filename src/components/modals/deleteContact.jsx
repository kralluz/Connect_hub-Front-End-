import ModalBase from "./basedModal";
import { useContactStState } from "../../hooks/useContacts";
import { useContext } from "react";
import { ContactContext } from "../../providers/contactProvider";
import { api } from "../../services/api";

const DeleteContactModal = ({ isOpen, onClose, contact }) => {
    const { deleteContact } = useContext(ContactContext);
    const handleDeletar = async (e) => {
        deleteContact(contact.id);

        onClose();
    };

    return (
        <ModalBase isOpen={isOpen} onClose={onClose}>
            {contact && (
                <div>
                    <h2>Contato de {contact.name}</h2>
                    <p>Tem certeza de que deseja deletar este contato?</p>
                    <p>Esta ação é irreversível.</p>
                    <button onClick={handleDeletar}>Deletar</button>
                </div>
            )}
        </ModalBase>
    );
};

export default DeleteContactModal;
