import { useState } from "react";
import ModalBase from "./basedModal";

const UpdateClientModal = ({ isOpen, onClose, usuario }) => {
    const [nome, setNome] = useState("carlos");
    const [senha, setSenha] = useState("");
    const [numero, setNumero] = useState("8484");

    const handleSubmit = (e) => {
        e.preventDefault();
        onClose();
    };

    return (
        <ModalBase isOpen={isOpen} onClose={onClose}>
            <h2>Editar Perfil</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Nome"
                />
                <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Senha"
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

export default UpdateClientModal;
