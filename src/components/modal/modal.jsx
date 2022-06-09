import React, { useEffect } from "react";
import * as ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { useDispatch } from "react-redux";
import { DELETE_INFO, SET_INFO } from "../../services/actions/modal-details";
const modalRoot = document.getElementById("react-modals");

const ModalBlock = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    document.addEventListener("keydown", onKeydown);
    dispatch(SET_INFO(props.children.props));
    return () => {
      document.removeEventListener("keydown", onKeydown);
      dispatch(DELETE_INFO());
    };
  });
  const onKeydown = ({ key }) => {
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

const Modal = (props) =>
  ReactDOM.createPortal(<ModalBlock {...props} />, modalRoot);

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  setOpenModal: PropTypes.func.isRequired,
};

export default Modal;
