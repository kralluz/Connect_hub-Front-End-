import ModalBase from "./basedModal";
import { useContext } from "react";
import { ContactContext } from "../../providers/contactProvider";

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
                    <h2>Deletar este contato? </h2>
                    <h6>Tem certeza de que deseja deletar o contato de {contact.name}?</h6>
                    <p>Esta ação é irreversível</p>
                    <div className="text-center mt-4">
                        <button onClick={handleDeletar} className="btn btn-danger">Deletar</button>
                        <button onClick={onClose} className="btn btn-secondary ms-2">Cancelar</button>
                    </div>
                </div>
            )}
        </ModalBase>
    );
};

export default DeleteContactModal;
