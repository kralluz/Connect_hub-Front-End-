import React, { useEffect } from "react";
import { useClientState } from "../hooks/useClients";
import { useNavigate } from "react-router-dom";
import Link from "../components/Link";

const Home = () => {
    const { contacts, client, clientLogout, autoLogin } = useClientState();
    const token = localStorage.getItem("@CONNECT_HUB_TOKEN");
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/session");
        }
        autoLogin(token);
    }, [token]);

    return (
        <div>
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
