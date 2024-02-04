import React, { useEffect, useState } from "react";
import Link from "../components/Link";
import SessionForm from "../components/forms/SessionForm";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useClientState } from "../hooks/useClients";


const Session = () => {
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
        if (token) {
            autoLogin(token);
            if (!isToastDisplayed) {
                setIsToastDisplayed(true);
                toast("Você já está logado", {
                    id: "login-already",
                });
                setTimeout(() => setIsToastDisplayed(false), 5000);
            }
            navigate("/");
        }
    }, [token, isToastDisplayed, navigate, setIsToastDisplayed, autoLogin]);

    return (
        <>
            <Toaster />
            <h1>Sessão</h1>
            <p>Esta é a página de sessão. Aqui você pode fazer o login.</p>
            <div>
                <SessionForm />
            </div>
            <Link to="/">Home</Link>
            <Link to="/register">register</Link>
        </>
    );
};

export default Session;
