import { useState } from "react";
import ModalBase from "./basedModal";
import UpdateContactModal from "./updateContact";
import DeleteContactModal from "./deleteContact";
import { FaTrashAlt } from "react-icons/fa";
import { MdEditNote } from "react-icons/md";

const ShowContactModal = ({
    isOpen,
    onClose,
    contatoId,
    onDeletar,
    contact,
}) => {
    const [isModalAtualizacaoContatoOpen, setModalAtualizacaoContatoOpen] =
        useState(false);
    const [isModalDelecaoContatoOpen, setModalDelecaoContatoOpen] =
        useState(false);

    const handleDeletar = (e) => {
        e.preventDefault();
        onDeletar(contatoId);
        onClose();
    };

    return (
        <>
            <UpdateContactModal
                isOpen={isModalAtualizacaoContatoOpen}
                onClose={() => setModalAtualizacaoContatoOpen(false)}
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
                    <div className="text-center">
                        <h2>Detalhes do Contato</h2>
                        <div>
                            <strong>Nome:</strong> <span>{contact.name}</span>
                        </div>
                        <div>
                            <strong>E-mail:</strong> <span>{contact.email}</span>
                        </div>
                        <div>
                            <strong>Número:</strong> <span>{contact.phone}</span>
                        </div>
                        <div className="mt-3">
                            <button
                                className="btn btn-primary me-2"
                                onClick={() => {
                                    setModalAtualizacaoContatoOpen(true);
                                }}
                            >
                                <MdEditNote/>
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={() => {
                                    setModalDelecaoContatoOpen(true);
                                }}
                            >
                                <FaTrashAlt/>
                            </button>
                        </div>
                    </div>
                </ModalBase>
            )}
        </>
    );
};

export default ShowContactModal;
