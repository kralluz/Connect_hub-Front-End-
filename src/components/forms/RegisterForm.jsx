import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { ClientContext } from "../../providers/clientProvier";

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
        <>
            <h1>cliente</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Nome:</label>
                    <input
                        autoFocus
                        id="name"
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
                    {errors.name && <p>{errors.name.message}</p>}
                </div>

                <div>
                    <label htmlFor="email">E-mail:</label>
                    <input
                        id="email"
                        type="email"
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
                    {errors.email && <p>{errors.email.message}</p>}
                </div>

                <div>
                    <label htmlFor="phone">Número:</label>
                    <input
                        id="phone"
                        type="tel"
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
                    {errors.phone && <p>{errors.phone.message}</p>}
                </div>

                <div>
                    <label htmlFor="password">Senha:</label>
                    <input
                        id="password"
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
                    {errors.password && <p>{errors.password.message}</p>}
                    <button
                        type="button"
                        onClick={() => setIsHidden(!isHidden)}
                    >
                        {isHidden ? (
                            <MdVisibility color="black" />
                        ) : (
                            <MdVisibilityOff color="black" />
                        )}
                    </button>
                </div>

                <div>
                    <label htmlFor="confirmPassword">Confirmar Senha:</label>
                    <input
                        id="confirmPassword"
                        placeholder="Confirmação de senha"
                        type={isConfirmHidden ? "password" : "text"}
                        {...register("confirmPassword", {
                            required: "A confirmação da senha é obrigatória",
                            validate: (value) =>
                                value === watch("password") ||
                                "As senhas não coincidem",
                        })}
                    />
                    {errors.confirmPassword && (
                        <p>{errors.confirmPassword.message}</p>
                    )}
                    <button
                        type="button"
                        onClick={() => setIsConfirmHidden(!isConfirmHidden)}
                    >
                        {isConfirmHidden ? (
                            <MdVisibility color="black" />
                        ) : (
                            <MdVisibilityOff color="black" />
                        )}
                    </button>
                </div>

                <div>
                    <button type="submit">Cadastrar</button>
                </div>
            </form>
        </>
    );
};

export default RegisterForm;
