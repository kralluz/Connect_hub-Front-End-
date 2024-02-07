import { useState } from "react";
import ModalBase from "./basedModal";
import UpdateContactModal from "./updateContact";
import DeleteContactModal from "./deleteContact";
import { FaTrashAlt } from "react-icons/fa";

const ShowContactModal = ({
    isOpen,
    onClose,
    contactId,
    onDeletar,
    contact,
    setShowOpen,
}) => {
    const [isModalAtualizacaoContatoOpen, setModalAtualizacaoContatoOpen] =
        useState(false);
    const [isModalDelecaoContatoOpen, setModalDelecaoContatoOpen] =
        useState(false);

    const handleDeletar = (e) => {
        e.preventDefault();
        onDeletar(contactId);
        onClose();
    };

    let formattedCreatedAt = "";    
    if(contact){
        formattedCreatedAt = new Date(contact.created_at).toLocaleString();
    }

    return (
        <>
            <UpdateContactModal
                isOpen={isModalAtualizacaoContatoOpen}
                onClose={() => {
                    setModalAtualizacaoContatoOpen(false);
                }}
                contact={contact}
            />

            <DeleteContactModal
                isOpen={isModalDelecaoContatoOpen}
                onClose={() => setModalDelecaoContatoOpen(false)}
                contact={contact}
                onDeletar={handleDeletar}
            />
            {contact && (
                <ModalBase isOpen={isOpen} onClose={onClose}>
                    <>
                        <div className="text-justify">
                            <h2>Detalhes do Contato</h2>
                            <div>
                                <strong>Nome:</strong>{" "}
                                <span>{contact.name}</span>
                            </div>
                            <div>
                                <strong>E-mail:</strong>{" "}
                                <span>{contact.email}</span>
                            </div>
                            <div>
                                <strong>Número:</strong>{" "}
                                <span>{contact.phone}</span>
                            </div>
                            <div>
                                <strong>Data de criação:</strong>{" "}
                                <span>{formattedCreatedAt}</span>
                            </div>
                        </div>

                        <div className="mt-3 text-center"> {/* BEGIN: Center align buttons */}
                            <button
                                className="btn btn-primary me-2"
                                onClick={() => {
                                    setShowOpen(false);
                                    setModalAtualizacaoContatoOpen(true);
                                }}
                            >
                                Editar contato
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={() => {
                                    setShowOpen(false);
                                    setModalDelecaoContatoOpen(true);
                                }}
                            >
                                <FaTrashAlt />
                            </button>
                        </div> {/* END: Center align buttons */}
                    </>
                </ModalBase>
            )}
        </>
    );
};

export default ShowContactModal;
