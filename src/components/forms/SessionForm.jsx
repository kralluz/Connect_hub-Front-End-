import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { ClientContext } from "../../providers/clientProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const SessionForm = () => {
    const [isHidden, setIsHidden] = useState(true);
    const { clientLogin } = useContext(ClientContext);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful, isSubmitting },
    } = useForm();

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    const onSubmit = async (formData) => {
        clientLogin(formData);
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
        >
            <div className="card" style={{ width: "400px" }}>
                <div className="card-body">
                    <h1 className="text-center mb-4">Login</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                E-mail:
                            </label>
                            <input
                                autoFocus
                                id="email"
                                type="email"
                                className="form-control"
                                placeholder="Email de usuário"
                                {...register("email", {
                                    required: "O campo de e-mail é obrigatório",
                                    pattern: {
                                        value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                        message:
                                            "Por favor, insira um endereço de e-mail válido",
                                    },
                                })}
                            />
                            {errors.email && (
                                <div className="alert alert-danger">
                                    {errors.email.message}
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Senha:
                            </label>
                            <div className="input-group">
                                <input
                                    id="password"
                                    className="form-control"
                                    placeholder="Senha"
                                    type={isHidden ? "password" : "text"}
                                    {...register("password", {
                                        required: "Senha é obrigatória",
                                        minLength: {
                                            value: 8,
                                            message:
                                                "A senha precisa ter no mínimo oito caracteres.",
                                        },
                                    })}
                                />
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() => setIsHidden(!isHidden)}
                                >
                                    {isHidden ? (
                                        <MdVisibility />
                                    ) : (
                                        <MdVisibilityOff />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <div className="alert alert-danger">
                                    {errors.password.message}
                                </div>
                            )}
                        </div>

                        <div className="text-center">
                            <button
                                type="submit"
                                className={`btn ${
                                    isSubmitting
                                        ? "btn-secondary"
                                        : "btn-primary"
                                }`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Fazendo login..." : "Iniciar sessão"}
                            </button>
                        </div>
                    </form>
                    <div className="mt-3 text-end">
                        {/* <Link className="btn btn-link" to="/forgot-password">
                            Esqueceu a senha?
                        </Link> */}
                        <Link className="btn btn-link" to="/register">
                            Cadastrar-se
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SessionForm;
