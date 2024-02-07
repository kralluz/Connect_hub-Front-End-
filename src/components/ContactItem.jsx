import React from 'react';
import { FaEye, FaTrashAlt } from 'react-icons/fa';
import { MdEditNote } from 'react-icons/md';

const ContactItem = ({ contact, onShow, onUpdate, onDelete }) => {
    return (
        <div className="custom-max-width mb-3">
            <hr className="custom-max-width mb-4" />
            <div className="d-flex justify-content-between align-items-center">
                <h3>{contact.name}</h3>
                <div>
                    <button className="btn btn-primary mx-1" onClick={() => onShow(contact)}>
                        <FaEye />
                    </button>
                    <button className="btn btn-warning mx-1" onClick={() => onUpdate(contact)}>
                        <MdEditNote />
                    </button>
                    <button className="btn btn-danger" onClick={() => onDelete(contact.id)}>
                        <FaTrashAlt/>
                    </button>
                </div>
            </div>
            <hr />
        </div>
    );
};

export default ContactItem;
