import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ContactContext } from "../../providers/contactProvider";

const UpdateContactForm = ({ contact, onClose }) => {
    const [ConfirmationOpen, setConfirmationOpen] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const { updateContact } = useContext(ContactContext);

    useEffect(() => {
        if (contact) {
            reset({
                name: "",
                email: "",
                phone: "",
            });
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
        <>
            {contact && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("name")} placeholder={contact.name} />
                    {errors.name && <p>{errors.name.message}</p>}
                    <input
                        {...register("email", {
                            pattern: {
                                value: /^\S+@\S+\.\S+$/,
                                message: "Formato de e-mail inválido.",
                            },
                        })}
                        placeholder={contact.email}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                    <input {...register("phone")} placeholder={contact.phone} />
                    {errors.phone && <p>{errors.phone.message}</p>}
                    <button type="submit">Atualizar</button>
                </form>
            )}
        </>
    );
};

export default UpdateContactForm;
