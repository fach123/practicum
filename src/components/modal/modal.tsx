import React, { useEffect } from "react";
import * as ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
const modalRoot = document.getElementById("react-modals") as HTMLElement;

interface IModal {
  setOpenModal: (arg0: boolean) => void;
  children: React.ReactNode;
  title: string;
}
const ModalBlock: React.FC<IModal> = (props): JSX.Element => {
  useEffect(() => {
    document.addEventListener("keydown", onKeydown);
    return () => {
      document.removeEventListener("keydown", onKeydown);
    };
  });
  const onKeydown = ({ key }: KeyboardEvent) => {
    if (key === "Escape") {
      closeModal();
    }
  };

  function closeModal() {
    props.setOpenModal(false);
  }

  return (
    <>
      <div
        className={`${style.modal} p-10`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={style.modal_header}>
          <p className="text text_type_main-large">{props.title}</p>
          <span className={style.close}>
            <CloseIcon onClick={closeModal} type="primary" />
          </span>
        </div>
        {props.children}
      </div>

      <ModalOverlay onClick={closeModal} />
    </>
  );
};

const Modal = (props: IModal): JSX.Element =>
  ReactDOM.createPortal(<ModalBlock {...props} />, modalRoot);

export default Modal;
