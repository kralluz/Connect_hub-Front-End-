import React from "react";
import styled, { css, keyframes } from "styled-components";
import { Transition } from "react-transition-group";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const Backdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7); /* Fundo mais escuro */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    animation: ${props =>
        props.state === "entering" || props.state === "entered"
            ? css`${fadeIn} 300ms ease-out`
            : css`${fadeOut} 300ms ease-in`}
        forwards;
`;

const ModalWrapper = styled.div`
    background: #333; /* Fundo do modal mais escuro */
    color: #fff; /* Texto claro para contraste */
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); /* Sombra mais pronunciada */
    z-index: 1001;
    max-width: 500px;
    width: 100%;
    transition: transform 300ms ease-out;
    transform: ${props =>
        props.state === "entering"
            ? "scale(0.9)"
            : props.state === "entered"
            ? "scale(1)"
            : "scale(0.9)"};
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #fff; /* Ícone de fechar em cor clara */
    cursor: pointer;
`;

const ModalBase = ({ children, isOpen, onClose }) => (
    <Transition in={isOpen} timeout={300} unmountOnExit>
        {(state) => (
            <Backdrop state={state} onClick={onClose}>
                <ModalWrapper
                    state={state}
                    onClick={(e) => e.stopPropagation()}
                >
                    <CloseButton onClick={onClose}>&times;</CloseButton>
                    {children}
                </ModalWrapper>
            </Backdrop>
        )}
    </Transition>
);

export default ModalBase;
