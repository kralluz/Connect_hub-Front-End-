import UpdateClientForm from "../forms/updateClientForm";
import ModalBase from "./basedModal";

const UpdateClientModal = ({ isOpen, onClose, client }) => {
    return (
        <ModalBase isOpen={isOpen} onClose={onClose}>
            {client && (
                <>
                    <h2>Atualização de perfil</h2>
                    <UpdateClientForm
                    client={client}
                    onClose={onClose} />
                </>
            )}
        </ModalBase>
    );
};

export default UpdateClientModal;
