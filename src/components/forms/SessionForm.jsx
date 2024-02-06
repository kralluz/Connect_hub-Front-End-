import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useClientState } from "../../hooks/useClients";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { ClientContext } from "../../providers/clientProvier";

const SessionForm = () => {
    const [isHidden, setIsHidden] = useState(true);
    const { clientLogin } = useContext(ClientContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (formData) => {
        clientLogin(formData);
    };

    return (
        <>
            <h1>cliente</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>E-mail:</label>
                <input
                    autoFocus
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

                <div>
                    <label>
                        password:
                        <input
                            id="password"
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
                        {errors.password && <p>{errors.password.message}</p>}
                    </label>
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

                <button type="submit">Login</button>
            </form>
        </>
    );
};

export default SessionForm;
