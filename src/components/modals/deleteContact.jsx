import ModalBase from "./basedModal";

const DeleteContactModal = ({ isOpen, onClose, contatoId, onDeletar }) => {
    const handleDeletar = (e) => {
        e.preventDefault();
        // Lógica para deletar o contato
        onDeletar(contatoId);
        onClose(); // Fechar o modal após a deleção
    };

    return (
        <ModalBase isOpen={isOpen} onClose={onClose}>
            <h2>Deletar Contato</h2>
            <p>Tem certeza de que deseja deletar este contato?</p>
            <button onClick={handleDeletar}>Deletar</button>
        </ModalBase>
    );
};
export default DeleteContactModal;