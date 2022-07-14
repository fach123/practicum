import React, { ReactElement, useEffect } from "react";
import * as ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { useDispatch } from "react-redux";
import { DELETE_INFO, SET_INFO } from "../../services/actions/modal-details";
const modalRoot = document.getElementById("react-modals") as HTMLElement;

interface IKeyboardEvent {
  key: string;
}

interface IModal {
  setOpenModal: (arg0: boolean) => void;
  children: React.ReactNode;
  title: string;
}
const ModalBlock: React.FC<IModal> = (props): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    document.addEventListener("keydown", onKeydown);
    // @ts-ignore
    dispatch(SET_INFO(props.children.props) as any);
    return () => {
      document.removeEventListener("keydown", onKeydown);
      dispatch(DELETE_INFO());
    };
  });
  const onKeydown = ({ key }: IKeyboardEvent) => {
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
