import React, { useContext, useEffect, useState } from "react";
import { useClientState } from "../hooks/useClients";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Link from "../components/Link";
import CreateContactModal from "../components/modals/createContact";
import UpdateClientModal from "../components/modals/updateClient";
import UpdateContactModal from "../components/modals/updateContact";
import DeleteContactModal from "../components/modals/deleteContact";
import ShowContactModal from "../components/modals/showContact";
import { FaEdit } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { MdPersonAdd } from "react-icons/md";
import { ContactContext } from "../providers/contactProvider";
import { ClientContext } from "../providers/clientProvier";

const Home = () => {
    const { contacts } = useContext(ContactContext);
    const { client } = useContext(ClientContext);

    const [isModalEdicaoPerfilOpen, setModalEdicaoPerfilOpen] = useState(false);

    const [isModalExibicaoContatoOpen, setModalExibicaoContatoOpen] =
        useState(false);

    const [isModalCriacaoContatoOpen, setModalCriacaoContatoOpen] =
        useState(false);

    const [isModalAtualizacaoContatoOpen, setModalAtualizacaoContatoOpen] =
        useState(false);

    const [isModalDelecaoContatoOpen, setModalDelecaoContatoOpen] =
        useState(false);
    const [modalContact, setModalContact] = useState(null);

    const {
        isToastDisplayed,
        setIsToastDisplayed,
        isLoading,
        clientLogout,
        autoLogin,
    } = useClientState();

    const token = localStorage.getItem("@CONNECT_HUB_TOKEN");
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/session");
        }
        autoLogin(token);
    }, [token]);

    useEffect(() => {
        if (isLoading && !isToastDisplayed) {
            setIsToastDisplayed(true);
            toast("Carregando seus dados");
            setIsToastDisplayed(false);
        }
    }, [isLoading, isToastDisplayed]);

    const openShowContactModal = (contact) => {
        setModalContact(contact);
        setModalExibicaoContatoOpen(true);
    };

    return (
        <>
            <Toaster />
            <UpdateClientModal
                isOpen={isModalEdicaoPerfilOpen}
                onClose={() => setModalEdicaoPerfilOpen(false)}
                client={client}
            />

            <CreateContactModal
                isOpen={isModalCriacaoContatoOpen}
                onClose={() => setModalCriacaoContatoOpen(false)}
            />

            <button onClick={clientLogout}>Logout</button>
            <Link to="/session">Session</Link>
            <Link to="/register">register</Link>

            <button onClick={() => setModalEdicaoPerfilOpen(true)}>
                <FaUserEdit />
            </button>
            <button onClick={() => setModalCriacaoContatoOpen(true)}>
                <MdPersonAdd />
            </button>

            <h1>Página de início</h1>

            {client && (
                <div>
                    <p>Bem-vindo {client.name}!!!</p>
                    <h4>Esta é página inicial. </h4>
                    <h4>O seu id de usuário é ( {client.id} )</h4>
                    <h4>O seu e-mail é: {client.email}</h4>
                    <h4>O seu phone é: {client.phone}</h4>
                </div>
            )}

            {client && contacts && contacts.length > 0 ? (
                contacts.map((contact) => (
                    <div key={contact.id}>
                        <ShowContactModal
                            isOpen={
                                isModalExibicaoContatoOpen &&
                                modalContact?.id === contact.id
                            }
                            onClose={() => setModalExibicaoContatoOpen(false)}
                            contatoId={modalContact?.id}
                            contact={modalContact}
                            onDeletar={(id) =>
                                console.log(`Deletar contato com ID ${id}`)
                            }
                        />
                        <UpdateContactModal
                            isOpen={isModalAtualizacaoContatoOpen}
                            onClose={() =>
                                setModalAtualizacaoContatoOpen(false)
                            }
                            contact={contact}
                        />

                        <DeleteContactModal
                            isOpen={isModalDelecaoContatoOpen}
                            onClose={() => setModalDelecaoContatoOpen(false)}
                            contact={contact}
                            onDeletar={(id) =>
                                console.log(`Deletar contato com ID ${id}`)
                            }
                        />
                        <div>
                            <hr />
                            <h3>
                                {contact.name}
                                {contact.phone} {contact.email}
                            </h3>
                        </div>
                        <button onClick={() => openShowContactModal(contact)}>
                            exibir contato
                        </button>
                        <button
                            onClick={() => setModalAtualizacaoContatoOpen(true)}
                        >
                            <FaEdit />
                        </button>
                        <button onClick={() => setModalDelecaoContatoOpen(true)}>
                            <FaTrashAlt />
                        </button>
                        <hr />
                    </div>
                ))
            ) : (
                <h2>Você não tem contatos.</h2>
            )}
        </>
    );
};

export default Home;
