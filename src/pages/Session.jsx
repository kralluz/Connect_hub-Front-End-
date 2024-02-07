import React, { useEffect } from "react";
import SessionForm from "../components/forms/SessionForm";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useClientState } from "../hooks/useClients";
import Header from "../components/Header";

const Session = () => {
    const { isToastDisplayed, setIsToastDisplayed, autoLogin } =
        useClientState();
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
            <Header />
            <div className="container mt-5">
                <SessionForm />
            </div>
        </>
    );
};

export default Session;
