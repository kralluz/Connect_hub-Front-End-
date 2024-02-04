import { useState } from "react";
import ModalBase from "./basedModal";

const UpdateContactModal = ({ isOpen, onClose, contato }) => {
    const [nome, setNome] = useState("carlos");
    const [email, setEmail] = useState("carlos@email.come");
    const [numero, setNumero] = useState("5548");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para atualizar o contato
        onClose(); // Fechar o modal após a atualização
    };

    return (
        <ModalBase isOpen={isOpen} onClose={onClose}>
            <h2>Atualizar Contato</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Nome"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail"
                />
                <input
                    type="text"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    placeholder="Número"
                />
                <button type="submit">Atualizar</button>
            </form>
        </ModalBase>
    );
};

export default UpdateContactModal;