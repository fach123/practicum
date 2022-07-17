import React from "react";
import style from "./modal-overlay.module.css";

const ModalOverlay = (props: { onClick: () => void }): JSX.Element => {
  return <div className={style.overlay} onClick={props.onClick} />;
};

export default ModalOverlay;
