import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ClientContext } from "../../providers/clientProvider";



const UpdateClientForm = ({ client, onClose }) => {
    const [ConfirmationOpen, setConfirmationOpen] = useState(false);

    const { updateClient } = useContext(ClientContext);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: client ? client.name : "",
            phone: client ? client.phone : "",
        }
    });

    useEffect(() => {
        if (client) {
            reset({
                name: client.name,
                phone: client.phone,
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
        <div className="container mt-3">
            <form onSubmit={handleSubmit(onSubmit)} className="w-100 mx-auto" style={{ maxWidth: "600px" }}>
                <div className="mb-3">
                    <input
                        autoFocus
                        id="name"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        placeholder="Novo nome"
                        {...register("name", {
                            pattern: {
                                value: /^.{6,}$/,
                                message: "O nome deve ter no mínimo 6 caracteres",
                            },
                        })}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                </div>

                <div className="mb-3">
                    <input
                    disabled
                        id="email"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        placeholder={client.email}
                        {...register("email",{
                            pattern: {
                                value: /^.{6,}$/,
                                message: "O nome deve ter no mínimo 6 caracteres",
                            },
                        })}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                </div>
                
                <div className="mb-3">
                    <p className="ps-3">Por motivos de segurança, não permitimos alterações de email.</p>
                </div>
                
                <div className="mb-3">
                    <input
                        className="form-control"
                        {...register("phone")}
                        placeholder="Novo número"
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
                </div>
                
                <div className="text-center">
                    <button type="submit" className="btn btn-primary">Atualizar</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateClientForm;
