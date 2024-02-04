import React from "react";
import styled from "styled-components";

const Backdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalWrapper = styled.div`
    background: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    width: 90%;
    max-width: 500px; /* Ajuste para o tamanho máximo desejado */
    position: relative;

    @media (min-width: 768px) {
        width: 80%; /* Ajuste conforme necessário para telas maiores */
    }

    @media (min-width: 1024px) {
        width: 60%; /* Ajuste conforme necessário para telas ainda maiores */
    }
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
`;

const Modal = ({ children, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <Backdrop onClick={onClose}>
            <ModalWrapper onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                {children}
            </ModalWrapper>
        </Backdrop>
    );
};

export default Modal;
