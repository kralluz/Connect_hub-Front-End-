import React, { useEffect, useState } from "react";
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

const Home = () => {
    const [isModalEdicaoPerfilOpen, setModalEdicaoPerfilOpen] = useState(false);

    const [isModalExibicaoContatoOpen, setModalExibicaoContatoOpen] =
        useState(false);

    const [isModalCriacaoContatoOpen, setModalCriacaoContatoOpen] =
        useState(false);

    const [isModalAtualizacaoContatoOpen, setModalAtualizacaoContatoOpen] =
        useState(false);

    const [isModalDelecaoContatoOpen, setModalDelecaoContatoOpen] =
        useState(false);

    const {
        isToastDisplayed,
        setIsToastDisplayed,
        isLoading,
        contacts,
        client,
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

    return (
        <>
            <Toaster />

            <UpdateClientModal
                isOpen={isModalEdicaoPerfilOpen}
                onClose={() => setModalEdicaoPerfilOpen(false)}
                usuario={client}
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
            <p>Bem-vindo à página inicial. Explore nosso site.</p>

            {client && (
                <div>
                    <h4>
                        id: {client.id}; name: {client.name}; email:
                        {client.email}; number phone: {client.phone}
                    </h4>
                </div>
            )}

            {contacts &&
                contacts.map((contact) => (
                    <div key={contact.id}>
                        <ShowContactModal
                            isOpen={isModalExibicaoContatoOpen}
                            onClose={() => setModalExibicaoContatoOpen(false)}
                            contatoId={"1"}
                            contact={contacts[0]}
                            onDeletar={(id) =>
                                console.log(`Deletar contato com ID ${id}`)
                            }
                        />

                        <UpdateContactModal
                            isOpen={isModalAtualizacaoContatoOpen}
                            onClose={() =>
                                setModalAtualizacaoContatoOpen(false)
                            }
                            contato={client}
                        />

                        <DeleteContactModal
                            isOpen={isModalDelecaoContatoOpen}
                            onClose={() => setModalDelecaoContatoOpen(false)}
                            contatoId={"1"}
                            onDeletar={(id) =>
                                console.log(`Deletar contato com ID ${id}`)
                            }
                        />
                        <br />
                        <h4>
                            {contact.id} Contact Name: {contact.name}
                        </h4>
                        <button
                            onClick={() => setModalExibicaoContatoOpen(true)}
                        >
                            exibir contato
                        </button>
                        <button
                            onClick={() => setModalAtualizacaoContatoOpen(true)}
                        >
                            <FaEdit />
                        </button>
                        <button
                            onClick={() => setModalDelecaoContatoOpen(true)}
                        >
                            <FaTrashAlt />
                        </button>
                        <br />
                    </div>
                ))}
        </>
    );
};

export default Home;
