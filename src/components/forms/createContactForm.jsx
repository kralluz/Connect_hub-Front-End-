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
            reset();
            onClose();
        }
    }, [isSubmitSuccessful, reset, onClose]);

    const onSubmit = async (data) => {
        try {
            data.name = data.name
                .toLowerCase()
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
                .join(" ");
            await createContact(data);
        } catch (error) {
            toast.error(error.message, "Contato já cadastrado");
        }
    };

    return (
        <>
            <Toaster />
            <div className="container mt-5">
                <h1 className="mb-4">Criar Contato</h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-100 mx-auto"
                    style={{ maxWidth: "600px" }}
                >
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Nome:
                        </label>
                        <input
                            autoFocus
                            id="name"
                            className={`form-control ${
                                errors.name ? "is-invalid" : ""
                            }`}
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
                        {errors.name && (
                            <div className="invalid-feedback">
                                {errors.name.message}
                            </div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            E-mail:
                        </label>
                        <input
                            id="email"
                            type="email"
                            className={`form-control ${
                                errors.email ? "is-invalid" : ""
                            }`}
                            placeholder="E-mail do contato"
                            {...register("email", {
                                required: "E-mail é obrigatório.",
                                pattern: {
                                    value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                                    message: "Insira um e-mail válido.",
                                },
                            })}
                        />
                        {errors.email && (
                            <div className="invalid-feedback">
                                {errors.email.message}
                            </div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">
                            Número:
                        </label>
                        <input
                            id="phone"
                            type="tel"
                            className={`form-control ${
                                errors.phone ? "is-invalid" : ""
                            }`}
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
                            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateContactForm;
