import React from "react";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import { MdEditNote } from "react-icons/md";

const ContactItem = ({ contact, onShow }) => {
    return (
        <div className="custom-max-width mb-3">
            <hr className="custom-max-width mb-4" />
            <div className="d-flex justify-content-between align-items-center">
                <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 className="text-truncate">{contact.name}</h3>
                </div>
                <div
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Exibir detalhes"
                    data-tooltip-place="bottom"
                    className="d-flex flex-nowrap "
                >
                    <button
                        className="btn btn-primary mx-1"
                        onClick={() => onShow(contact)}
                    >
                        <FaEye />
                    </button>
                </div>
            </div>
            <hr />
        </div>
    );
};

export default ContactItem;
