import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
import { ClientContext } from "../../providers/clientProvider";
import { Link } from "react-router-dom";

const RegisterForm = () => {
    const { clientRegister } = useContext(ClientContext);
    const [isHidden, setIsHidden] = useState(true);
    const [isConfirmHidden, setIsConfirmHidden] = useState(true);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        if (data.password !== data.confirmPassword) {
            console.log("As senhas não coincidem");
            return;
        }
        await clientRegister(data);
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
        >
            <div className="card mb-4" style={{ width: "400px" }}>
                <div className="card-body">
                    <h1 className="text-center mb-4">Crie sua conta</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Nome:
                            </label>
                            <input
                                autoFocus
                                id="name"
                                className="form-control"
                                placeholder="Nome de usuário"
                                {...register("name", {
                                    required: "Este campo é obrigatório",
                                    pattern: {
                                        value: /^.{6,}$/,
                                        message:
                                            "O nome deve ter no mínimo 6 caracteres",
                                    },
                                })}
                            />
                            {errors.name && (
                                <div className="alert alert-danger">
                                    {errors.name.message}
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                E-mail:
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                placeholder="Email de usuário"
                                {...register("email", {
                                    required: "O campo de e-mail é obrigatório",
                                    pattern: {
                                        value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
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
                            <label htmlFor="phone" className="form-label">
                                Número:
                            </label>
                            <input
                                id="phone"
                                type="tel"
                                className="form-control"
                                placeholder="Número de telefone"
                                {...register("phone", {
                                    required: "Este campo é obrigatório",
                                    minLength: {
                                        value: 9,
                                        message:
                                            "O número deve ter no mínimo 9 dígitos",
                                    },
                                    maxLength: {
                                        value: 12,
                                        message:
                                            "O número deve ter no máximo 12 dígitos",
                                    },
                                    pattern: {
                                        value: /^[0-9]{9,12}$/,
                                        message: "Somente números são aceitos",
                                    },
                                })}
                            />
                            {errors.phone && (
                                <div className="alert alert-danger">
                                    {errors.phone.message}
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
                                    placeholder="Senha de usuário"
                                    type={isHidden ? "password" : "text"}
                                    {...register("password", {
                                        required: "Senha é obrigatória",
                                        minLength: {
                                            value: 8,
                                            message:
                                                "A senha precisa ter no mínimo oito caracteres.",
                                        },
                                        validate: {
                                            hasUpperCase: (value) =>
                                                /[A-Z]/.test(value) ||
                                                "A senha deve ter pelo menos uma letra maiúscula.",
                                            hasLowerCase: (value) =>
                                                /[a-z]/.test(value) ||
                                                "A senha deve ter pelo menos uma letra minúscula.",
                                            hasNumber: (value) =>
                                                /[0-9]/.test(value) ||
                                                "A senha deve ter pelo menos um número.",
                                            hasSpecialChar: (value) =>
                                                /[!@#$%^&*()_+\[\]{};':"\\|,.<>\/?]/.test(
                                                    value
                                                ) ||
                                                "A senha deve ter pelo menos um caractere especial.",
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

                        <div className="mb-3">
                            <label
                                htmlFor="confirmPassword"
                                className="form-label"
                            >
                                Confirmar Senha:
                            </label>
                            <div className="input-group">
                                <input
                                    id="confirmPassword"
                                    className="form-control"
                                    placeholder="Confirmação de senha"
                                    type={isConfirmHidden ? "password" : "text"}
                                    {...register("confirmPassword", {
                                        required:
                                            "A confirmação da senha é obrigatória",
                                        validate: (value) =>
                                            value === watch("password") ||
                                            "As senhas não coincidem",
                                    })}
                                />
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() =>
                                        setIsConfirmHidden(!isConfirmHidden)
                                    }
                                >
                                    {isConfirmHidden ? (
                                        <MdVisibility />
                                    ) : (
                                        <MdVisibilityOff />
                                    )}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <div className="alert alert-danger">
                                    {errors.confirmPassword.message}
                                </div>
                            )}
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">
                                Cadastrar
                            </button>
                        </div>
                    </form>
                    <div className="mt-3 text-end">
                        <Link to="/session" className="btn btn-link">
                            Já tem uma conta? Faça login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
