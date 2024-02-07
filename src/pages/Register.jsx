import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../components/forms/RegisterForm";

const Register = () => {
    const token = localStorage.getItem("@CONNECT_HUB_TOKEN");
    if (token) {
        return (
            <div className="container mt-5">
                <h1>Você já está logado!</h1>
                <Link to="/" className="btn btn-primary mt-3">Dashboard</Link>
            </div>
        );
    }
    return (
        <div className="container mt-5">
            <RegisterForm />
        </div>
    );
};

export default Register;
