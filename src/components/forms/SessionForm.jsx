import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useClientState } from "../../hooks/useClients";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import { zodRules } from "../../zodRules";

const SessionForm = () => {
    const [IsHidden, setIsHidden] = useState(true);
    const { clientLogin } = useClientState();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        clientLogin(data);
        
    };

    return (
        <>
            <h1>cliente</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>E-mail:</label>
                <input
                    {...register("email", {
                        required: true,
                        pattern: /^\w+@[a-zA-Z]+\.\w+$/,
                    })}
                />
                {errors.email && <p>{errors.email.message}</p>}

                <div>
                    <label>
                        password:
                        <input
                            {...register("password")}
                            type={IsHidden ? "password" : "text"}
                        />
                    </label>
                    {errors.password && <span>{errors.password.message}</span>}
                    <button
                        type="button"
                        onClick={() => setIsHidden(!IsHidden)}
                    >
                        {IsHidden ? (
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
