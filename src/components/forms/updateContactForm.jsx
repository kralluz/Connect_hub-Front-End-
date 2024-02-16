import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ContactContext } from "../../providers/contactProvider";
import toast from "react-hot-toast";

const UpdateContactForm = ({ contact, onClose }) => {
    const { updateContact } = useContext(ContactContext);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful, isSubmitting },
    } = useForm();

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
            onClose();
        }
    }, [isSubmitSuccessful, reset, onClose]);

    const onSubmit = async (data) => {
        data.name = data.name
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
            .join(" ");
        const filteredData = Object.fromEntries(
            Object.entries(data).filter(([_, value]) => value !== "")
        );
        if (!data.name && !data.phone && !data.email) {
            toast.error("Preencha pelo menos um dos campos: nome ou telefone");
            return;
        }
        if (
            (data.name === contact.name) &
            (data.phone === contact.phone) &
            (data.email === contact.email)
        ) {
            toast.error("Nenhum dado foi alterado");
            return;
        }
        await updateContact(contact.id, filteredData);
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <div className="container mt-3">
            {contact && (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-100 mx-auto"
                    style={{ maxWidth: "600px" }}
                >
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Nome
                        </label>
                        <input
                            {...register("name")}
                            className={`form-control ${
                                errors.name ? "is-invalid" : ""
                            }`}
                            placeholder={contact.name}
                        />
                        {errors.name && (
                            <div className="invalid-feedback">
                                {errors.name.message}
                            </div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            E-mail
                        </label>
                        <input
                            {...register("email", {
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message: "Formato de e-mail inválido.",
                                },
                            })}
                            className={`form-control ${
                                errors.email ? "is-invalid" : ""
                            }`}
                            placeholder={contact.email}
                        />
                        {errors.email && (
                            <div className="invalid-feedback">
                                {errors.email.message}
                            </div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">
                            Número
                        </label>
                        <input
                            {...register("phone")}
                            className={`form-control ${
                                errors.phone ? "is-invalid" : ""
                            }`}
                            placeholder={contact.phone}
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
                        </button>
                        {"  "}
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={handleCancel}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default UpdateContactForm;
