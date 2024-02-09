import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ClientContext } from "../../providers/clientProvider";
import toast from "react-hot-toast";

const UpdateClientForm = ({ client, onClose }) => {

    const { updateClient } = useContext(ClientContext);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful, isSubmitting },
    } = useForm({
        defaultValues: {
            name: client ? client.name : "",
            phone: client ? client.phone : "",
        },
    });

    useEffect(() => {
        if (client) {
            reset({
                name: "",
                phone: "",
            });
        }
    }, [client, reset]);

    const onSubmit = async (data) => {
        data.name = data.name
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
            .join(" ");
        await updateClient(
            client.id,
            Object.fromEntries(
                Object.entries(data).filter(([, value]) => value !== "")
            )
        );
        if (!data.name && !data.phone) {
            toast.error("Preencha pelo menos um dos campos: nome ou telefone");
            return;
        }
        if (data.name === client.name || data.phone === client.phone) {
            toast.error("Nenhum dado foi alterado");
            return;
        }
        onClose();
    };

    return (
        <div className="container mt-3">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-100 mx-auto"
                style={{ maxWidth: "600px" }}
            >
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nome</label>
                    <input
                        autoFocus
                        id="name"
                        className={`form-control ${
                            errors.name ? "is-invalid" : ""
                        }`}
                        placeholder={client.name}
                        {...register("name", {
                            pattern: {
                                value: /^.{6,}$/,
                                message:
                                    "O nome deve ter no mínimo 6 caracteres",
                            },
                        })}
                    />
                    {errors.name && (
                        <div className="invalid-feedback">
                            {errors.name.message}
                        </div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        disabled
                        id="email"
                        className={`form-control ${
                            errors.name ? "is-invalid" : ""
                        }`}
                        placeholder={client.email}
                        {...register("email", {
                            pattern: {
                                value: /^.{6,}$/,
                                message:
                                    "O nome deve ter no mínimo 6 caracteres",
                            },
                        })}
                    />
                    {errors.name && (
                        <div className="invalid-feedback">
                            {errors.name.message}
                        </div>
                    )}
                </div>

                <div className="mb-3">
                    <p className="ps-3">
                        Por motivos de segurança, não permitimos alterações de
                        email.
                    </p>
                </div>

                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Telefone</label>
                    <input
                        className={`form-control ${
                            errors.phone ? "is-invalid" : ""
                        }`}
                        {...register("phone", {
                            pattern: {
                                value: /^\d{9,15}$/,
                                message:
                                    "O número deve conter de 9 a 15 dígitos",
                            },
                        })}
                        placeholder={client.phone}
                    />
                    {errors.phone && (
                        <div className="invalid-feedback">
                            {errors.phone.message}
                        </div>
                    )}
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        className={`btn ${
                            isSubmitting ? "btn-secondary" : "btn-primary"
                        }`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Atualizando..." : "Atualizar"}
                    </button>{" "}
                    <span onClick={onClose} className="btn btn-danger">
                        Cancelar
                    </span>
                </div>
            </form>
        </div>
    );
};

export default UpdateClientForm;
