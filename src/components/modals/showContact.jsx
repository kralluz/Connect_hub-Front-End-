import { useState } from "react";
import ModalBase from "./basedModal";
import UpdateContactModal from "./updateContact";
import DeleteContactModal from "./deleteContact";
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

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
                    <button
                        onClick={() => {
                            onClose();
                            setModalAtualizacaoContatoOpen(true);
                        }}
                    >
                        <FaEdit />
                    </button>
                    <button
                        onClick={() => {
                            onClose();
                            setModalDelecaoContatoOpen(true);
                        }}
                    >
                        <FaTrashAlt />
                    </button>
                </ModalBase>
            )}
        </>
    );
};

export default ShowContactModal;
