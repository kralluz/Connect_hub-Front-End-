import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ContactContext } from "../../providers/contactProvider";
 // Certifique-se de importar o CSS do Bootstrap

const UpdateContactForm = ({ contact, onClose }) => {
    const [ConfirmationOpen, setConfirmationOpen] = useState(false);
    const { updateContact } = useContext(ContactContext);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: contact ? contact.name : "",
            email: contact ? contact.email : "",
            phone: contact ? contact.phone : "",
        }
    });

    useEffect(() => {
        if (contact) {
            reset(contact);
        }
    }, [contact, reset]);

    const onSubmit = async (data) => {
        const filteredData = Object.fromEntries(
            Object.entries(data).filter(([_, value]) => value !== "")
        );
        await updateContact(contact.id, filteredData);
        onClose();
    };

    return (
        <div className="container mt-3">
            {contact && (
                <form onSubmit={handleSubmit(onSubmit)} className="w-100 mx-auto" style={{ maxWidth: "600px" }}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nome</label>
                        <input
                            {...register("name")}
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            placeholder="Nome do contato"
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">E-mail</label>
                        <input
                            {...register("email", {
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message: "Formato de e-mail inválido.",
                                },
                            })}
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            placeholder="E-mail do contato"
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Número</label>
                        <input
                            {...register("phone")}
                            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                            placeholder="Número do contato"
                        />
                        {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">Atualizar</button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default UpdateContactForm;
