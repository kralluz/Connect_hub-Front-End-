import React, { useContext, useEffect, useState } from "react";
import { useClientState } from "../hooks/useClients";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CreateContactModal from "../components/modals/createContact";
import UpdateClientModal from "../components/modals/updateClient";
import ShowContactModal from "../components/modals/showContact";
import { MdPersonAdd } from "react-icons/md";
import { ContactContext } from "../providers/contactProvider";
import { ClientContext } from "../providers/clientProvider";
import { Tooltip } from "react-tooltip";
import ContactItem from "../components/ContactItem";
import Header from "../components/Header";

const Home = () => {
    const { contacts } = useContext(ContactContext);
    const { client } = useContext(ClientContext);

    const [isEditOpen, setEditOpen] = useState(false);
    const [isShowOpen, setShowOpen] = useState(false);
    const [isCreateOpen, setCreateOpen] = useState(false);
    const [isUpdateOpen, setUpdateOpen] = useState(false);
    const [modalContact, setModalContact] = useState(null);

    const { isToastDisplayed, setIsToastDisplayed, isLoading, autoLogin } =
        useClientState();

    const token = localStorage.getItem("@CONNECT_HUB_TOKEN");
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/session");
        }
        autoLogin(token);
    }, [token]);

    const openShowContactModal = (contact) => {
        setModalContact(contact);
        setShowOpen(true);
    };

    return (
        <>
            <Tooltip id="my-tooltip" />
            <Header client={client} setEditOpen={setEditOpen} />
            <UpdateClientModal
                isOpen={isEditOpen}
                onClose={() => setEditOpen(false)}
                client={client}
            />

            <CreateContactModal
                isOpen={isCreateOpen}
                onClose={() => setCreateOpen(false)}
            />

            <div className="container-lg mt-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div></div>
                    <div>
                        <button
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content="Adicionar Contato"
                            data-tooltip-place="bottom"
                            className="btn btn-success rounded-circle"
                            style={{ width: "80px", height: "80px", position: 'fixed', bottom: '10%', right: '10%'  }}
                            onClick={() => setCreateOpen(true)}
                        >
                            <MdPersonAdd style={{ fontSize: "35px" }} />
                        </button>
                    </div>
                </div>

                {client && (
                    <div className="custom-max-width mb-4">
                        <h3 className="mb-3">Olá {client.name} !</h3>
                        <h3 className="custom-max-width mb-4">
                            Lista de contatos:{" "}
                        </h3>
                        {client && contacts && contacts.length > 0 ? (
                            contacts
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .map((contact) => (
                                    <React.Fragment key={contact.id}>
                                        <ShowContactModal
                                            isOpen={
                                                isShowOpen &&
                                                modalContact?.id === contact.id
                                            }
                                            setShowOpen={setShowOpen}
                                            onClose={() => setShowOpen(false)}
                                            contactId={modalContact?.id}
                                            contact={modalContact}
                                        />

                                        <ContactItem
                                            key={contact.id}
                                            contact={contact}
                                            onShow={openShowContactModal}
                                            onUpdate={() => setUpdateOpen(true)}
                                            onDelete={() => setDeleteOpen(true)}
                                        />
                                    </React.Fragment>
                                ))
                        ) : (
                            <h2 className="text-center">
                                Você não tem contatos.
                            </h2>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default Home;
