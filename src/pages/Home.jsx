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
import { FaUserEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { MdPersonAdd, MdEditNote } from "react-icons/md";
import { ContactContext } from "../providers/contactProvider";
import { ClientContext } from "../providers/clientProvier";


const Home = () => {
    const { contacts } = useContext(ContactContext);
    const { client } = useContext(ClientContext);

    const [isEditOpen, setEditOpen] = useState(false);
    const [isShowOpen, setShowOpen] = useState(false);
    const [isCreateOpen, setCreateOpen] = useState(false);
    const [isUpdateOpen, setUpdateOpen] = useState(false);
    const [isDeleteOpen, setDeleteOpen] = useState(false);
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
        setShowOpen(true);
    };

    return (
        <>
            <Toaster />
            <Toaster />
            <UpdateClientModal
                isOpen={isEditOpen}
                onClose={() => setEditOpen(false)}
                client={client}
            />

            <CreateContactModal
                isOpen={isCreateOpen}
                onClose={() => setCreateOpen(false)}
            />
            <div className="container-lg mt-5"> {/* Alterado para container-lg */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <button className="btn btn-outline-primary" onClick={clientLogout}>Logout</button>
                        <button className="btn btn-outline-secondary mx-2" onClick={() => setEditOpen(true)}>
                            <FaUserEdit />
                        </button>
                        <button className="btn btn-success" onClick={() => setCreateOpen(true)}>
                            <MdPersonAdd />
                        </button>
                    </div>
                </div>


                {client && (
                    <div className="custom-max-width mb-4">
                        <h3 className="mb-3">Olá {client.name} !</h3>
                        <h5>
                            Você está logado como {client.email} e seu número e
                            telefone é {client.phone}
                        </h5>
                    </div>
                )}
                <h3  className="custom-max-width mb-4">Lista de contatos: </h3>

                {client && contacts && contacts.length > 0 ? (
                    contacts.map((contact) => (
                        <div key={contact.id} className="custom-max-width mb-3">
                            <hr  className="custom-max-width mb-4" />
                            <ShowContactModal
                                isOpen={
                                    isShowOpen &&
                                    modalContact?.id === contact.id
                                }
                                onClose={() => setShowOpen(false)}
                                contatoId={modalContact?.id}
                                contact={modalContact}
                                onDelete={(id) =>
                                    console.log(`Deletar contato com ID ${id}`)
                                }
                            />
                            <UpdateContactModal
                                isOpen={isUpdateOpen}
                                onClose={() => setUpdateOpen(false)}
                                contact={contact}
                            />

                            <DeleteContactModal
                                isOpen={isDeleteOpen}
                                onClose={() => setDeleteOpen(false)}
                                contact={contact}
                                onDelete={(id) =>
                                    console.log(`Deletar contato com ID ${id}`)
                                }
                            />
                            <div className="d-flex justify-content-between align-items-center">
                                <h3>{contact.name}</h3>
                                <div>
                                    <button
                                        className="btn btn-primary mx-1"
                                        onClick={() =>
                                            openShowContactModal(contact)
                                        }
                                    >
                                        <FaEye />
                                    </button>
                                    <button
                                        className="btn btn-warning mx-1"
                                        onClick={() => setUpdateOpen(true)}
                                    >
                                        <MdEditNote />
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => setDeleteOpen(true)}
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </div>
                            </div>
                            <hr />
                        </div>
                    ))
                ) : (
                    <h2 className="text-center">Você não tem contatos.</h2>
                )}
            </div>
        </>
    );
};

export default Home;
