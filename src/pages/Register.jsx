import React from "react";
import Link from "../components/Link";
import RegisterForm from "../components/forms/RegisterForm";

const Register = () => {
    return (
        <div>
            <h1>Registro</h1>
            <p>
                Esta é a página de registro. Aqui você pode criar uma nova
                conta.
            </p>
            <div>
                <RegisterForm />
            </div>
            <Link to="/home">Dashboard</Link>
            <Link to="/">session</Link>
        </div>
    );
};

export default Register;
