import React, { useState } from "react";
import ModalBase from "../modals/basedModal"; // Ajuste o caminho conforme necessário

const CreateContactModal = ({ isOpen, onClose }) => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [numero, setNumero] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui, você adicionaria a lógica para criar o contato no seu backend ou estado da aplicação
        console.log("Criando contato", { nome, email, numero });
        onClose(); // Fechar o modal após a submissão
    };

    return (
        <ModalBase isOpen={isOpen} onClose={onClose}>
            <h1>teste</h1>
            {/* <h2>Criar Contato</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Nome do contato"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">E-mail:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-mail do contato"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="numero">Número:</label>
                    <input
                        type="text"
                        id="numero"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                        placeholder="Número do contato"
                        required
                    />
                </div>
                <button type="submit">Criar</button>
            </form> */}
        </ModalBase>
    );
};

export default CreateContactModal;
