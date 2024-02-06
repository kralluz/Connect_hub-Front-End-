import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { ContactContext } from "../../providers/contactProvider";

const CreateContactForm = ({ onClose }) => {
    const { createContact } = useContext(ContactContext);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful, isSubmitting },
    } = useForm();

    useEffect(() => {
        if (isSubmitSuccessful) {
            toast.success("Contato cadastrado com sucesso!");
            reset();
            onClose();
        }
    }, [isSubmitSuccessful, reset, onClose]);

    const onSubmit = async (data) => {
        try {
            await createContact(data);
        } catch (error) {
            toast.error("Falha ao cadastrar o contato.");
        }
    };

    return (
        <>
            <Toaster />
            <h1>Criar Contato</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Nome:</label>
                    <input
                        autoFocus
                        id="name"
                        placeholder="Nome do contato"
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
                        placeholder="E-mail do contato"
                        {...register("email", {
                            required: "E-mail é obrigatório.",
                            pattern: {
                                value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                                message: "Insira um e-mail válido.",
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
                        placeholder="telefone"
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
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Cadastrando..." : "Cadastrar"}
                    </button>
                </div>
            </form>
        </>
    );
};

export default CreateContactForm;
