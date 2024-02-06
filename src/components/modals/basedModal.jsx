import React from "react";
import { Transition } from "react-transition-group";
import "./Modal.css";

const ModalBase = ({ children, isOpen, onClose }) => (
    <Transition in={isOpen} timeout={300} unmountOnExit>
        {(state) => (
            <div
                className={`backdrop ${state}`}
                onClick={onClose}
            >
                <div
                    className={`modalWrapper ${state}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className="closeButton" onClick={onClose}>
                        &times;
                    </button>
                    {children}
                </div>
            </div>
        )}
    </Transition>
);

export default ModalBase;
