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
                contato={contact}
            />

            <DeleteContactModal
                isOpen={isModalDelecaoContatoOpen}
                onClose={() => setModalDelecaoContatoOpen(false)}
                contatoId={"1"}
                onDeletar={(id) => console.log(`Deletar contato com ID ${id}`)}
            />

            <ModalBase isOpen={isOpen} onClose={onClose}>
                <h2>Detalhes do Contato</h2>
                <div>
                    <strong>Nome:</strong> <span></span>
                </div>
                <div>
                    <strong>E-mail:</strong> <span></span>
                </div>
                <div>
                    <strong>Número:</strong> <span></span>
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
        </>
    );
};
export default ShowContactModal;
