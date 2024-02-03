import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useClientState } from "../../hooks/useClients";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const RegisterForm = () => {
    const { clientRegister } = useClientState();
    const [isHidden, setIsHidden] = useState(true);
    const [isConfirmHidden, setIsConfirmHidden] = useState(true);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        if (data.password !== data.confirmPassword) {
            alert("As senhas não coincidem");
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
                        id="name"
                        {...register("name", { required: true })}
                    />
                    {errors.name && <p>{errors.name.message}</p>}
                </div>

                <div>
                    <label htmlFor="email">E-mail:</label>
                    <input
                        id="email"
                        type="email"
                        {...register("email", {
                            required: true,
                            pattern: /^\w+@[a-zA-Z]+\.\w+$/,
                        })}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>

                <div>
                    <label htmlFor="phone">Número:</label>
                    <input id="phone" type="tel" {...register("phone")} />
                    {errors.phone && <p>{errors.phone.message}</p>}
                </div>

                <div>
                    <label htmlFor="password">Senha:</label>
                    <input
                        id="password"
                        type={isHidden ? "password" : "text"}
                        {...register("password", { required: true })}
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
                        type={isConfirmHidden ? "password" : "text"}
                        {...register("confirmPassword", { required: true })}
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
