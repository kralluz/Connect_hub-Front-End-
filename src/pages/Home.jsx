import React, { useEffect, useState } from "react";
import { useClientState } from "../hooks/useClients";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Modal from "../components/modals/updateClient";
import Link from "../components/Link";

const Home = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const {
        isToastDisplayed,
        setIsToastDisplayed,
        isLoading,
        contacts,
        client,
        clientLogout,
        autoLogin,
    } = useClientState();
    const token = localStorage.getItem("@CONNECT_HUB_TOKEN");
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/session");
        }
        autoLogin(token);
    }, [token]);

    useEffect(() => {
        if (isLoading && !isToastDisplayed) {
            setIsToastDisplayed(true);
            toast("Carregando seus dados");
        }
    }, [isLoading, isToastDisplayed]);

    return (
        <div>
            <div>
                <button onClick={() => setModalOpen(true)}>Abrir Modal</button>
                <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                    <h2>Título do Modal</h2>
                    <p>Conteúdo do modal vai aqui.</p>
                </Modal>
            </div>
            <Toaster />
            <h1>Início</h1>
            <p>Bem-vindo à página inicial. Explore nosso site.</p>
            <h1>{token}</h1>
            {client && <h4>id: {client.id}</h4>}
            {client && <h4>name: {client.name}</h4>}
            {client && <h4>{client.email}</h4>}
            {client && <h4>number phone: {client.phone}</h4>}

            <button onClick={clientLogout}>Logout</button>
            <Link to="/session">Session</Link>
            <Link to="/register">register</Link>

            {contacts &&
                contacts.map((contact) => (
                    <div key={contact.id}>
                        <h4>Contact Name: {contact.name}</h4>
                        <p>Contact Email: {contact.email}</p>
                    </div>
                ))}
        </div>
    );
};

export default Home;
