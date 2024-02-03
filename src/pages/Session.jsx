import React from "react";
import Link from "../components/Link";
import SessionForm from "../components/forms/SessionForm";

const Session = () => {
    return (
        <div>
            <h1>Sessão</h1>
            <p>Esta é a página de sessão. Aqui você pode fazer o login.</p>
            <div>
                <SessionForm />
            </div>
            <Link to="/">Home</Link>
            <Link to="/register">register</Link>
        </div>
    );
};

export default Session;
