import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Ajuste para usar Link do 'react-router-dom' se ainda não estiver
import SessionForm from "../components/forms/SessionForm";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useClientState } from "../hooks/useClients";
 // Assegure-se que o Bootstrap CSS está importado

const Session = () => {
    const {
        isToastDisplayed,
        setIsToastDisplayed,
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
        <div className="container mt-5">
            <Toaster />
            <SessionForm />
        </div>
    );
};

export default Session;
