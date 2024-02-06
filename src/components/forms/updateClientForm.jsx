import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ClientContext } from "../../providers/clientProvier";

const UpdateClientForm = ({ client, onClose }) => {
    const [ConfirmationOpen, setConfirmationOpen] = useState(false);

    const { updateClient } = useContext(ClientContext);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (client) {
            reset({
                name: "",
                phone: "",
            });
        }
    }, [client, reset]);

    const onSubmit = async (data) => {
        await updateClient(
            client.id,
            Object.fromEntries(
                Object.entries(data).filter(([, value]) => value !== "")
            )
        );
        onClose();
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    autoFocus
                    id="name"
                    placeholder="Novo nome"
                    {...register("name", {
                        required: "Este campo é obrigatório",
                        pattern: {
                            value: /^.{6,}$/,
                            message: "O nome deve ter no mínimo 6 caracteres",
                        },
                    })}
                />
                {errors.name && <p>{errors.name.message}</p>}
                <br />
                <h6>
                    Email: Por motivos de segurança, não permitimos alterações
                    de email.
                </h6>
                <br />
                <input {...register("phone")} placeholder="Novo número" />
                {errors.phone && <p>{errors.phone.message}</p>}
                <button type="submit">Atualizar</button>
            </form>
        </>
    );
};

export default UpdateClientForm;
