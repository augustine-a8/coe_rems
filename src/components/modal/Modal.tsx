import React from "react";
import "./modal.style.css";

type ModalProps = {
  children?: React.JSX.Element;
  toggleModal?: React.MouseEventHandler<HTMLDivElement> | undefined;
};

export default function Modal({ children, toggleModal }: ModalProps) {
  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget && toggleModal !== undefined) {
          toggleModal(e);
        }
      }}
    >
      {children}
    </div>
  );
}
