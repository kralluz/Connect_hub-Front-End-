import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Dropdown } from "bootstrap";
import { IoPersonCircleOutline } from "react-icons/io5";
import { LuPhone } from "react-icons/lu";
import { MdMailOutline } from "react-icons/md";
import { PiIdentificationCard } from "react-icons/pi";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdLogout } from "react-icons/md";
import { ClientContext } from "../providers/clientProvider";
import { FaUserEdit } from "react-icons/fa";
import { Tooltip } from "react-tooltip";

const Header = ({ client, setEditOpen }) => {
    const location = useLocation();
    const isHome = location.pathname === "/";

    const { clientLogout } = useContext(ClientContext);

    return (
        <nav className={`navbar navbar-expand-lg navbar-dark bg-primary`}>
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    Connect Hub
                </NavLink>
                {isHome ? (
                    <div className="ms-auto">
                        {client && (
                            <>
                                <Tooltip id="my-tooltip" />
                                <button
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content={client.name}
                                    data-tooltip-place="bottom"
                                    className="btn text-light btn-logout bg-edit"
                                    id="userCircle"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <div className="user-circle">
                                        <IoPersonCircleOutline
                                            size="40"
                                            color="white"
                                        />
                                    </div>
                                </button>
                                <ul
                                    className=" bg-primary dropdown-menu dropdown-menu-end"
                                    aria-labelledby="userCircle"
                                >
                                    <li>
                                        <span className="text-light  dropdown-item-text">
                                            <PiIdentificationCard />
                                            {"   "}
                                            {client.name}
                                        </span>
                                    </li>
                                    <li>
                                        <span className="text-light dropdown-item-text">
                                            <MdMailOutline />
                                            {"   "}
                                            {client.email}
                                        </span>
                                    </li>
                                    <li>
                                        <span className="text-light dropdown-item-text">
                                            <LuPhone /> {client.phone}
                                        </span>
                                    </li>
                                    <li>
                                        <span className="text-light dropdown-item-text">
                                            <button
                                                data-tooltip-id="my-tooltip"
                                                data-tooltip-content="Editar meu perfil"
                                                data-tooltip-place="bottom"
                                                className="btn text-light btn-logout bg-edit"
                                                onClick={() =>
                                                    setEditOpen(true)
                                                }
                                            >
                                                <FaUserEdit /> Editar Perfil
                                            </button>
                                        </span>
                                    </li>
                                    <li>
                                        <span
                                            className="text-light dropdown-item-text"
                                            onClick={clientLogout}
                                        >
                                            <button className="btn text-light btn-logout-size bg-danger">
                                                <MdLogout /> Encerrar sessão
                                            </button>
                                        </span>
                                    </li>
                                </ul>
                            </>
                        )}
                    </div>
                ) : null}
            </div>
        </nav>
    );
};

export default Header;
