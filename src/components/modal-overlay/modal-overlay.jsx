import React from "react";
import style from "./modal-overlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = (props) => {
  return <div className={style.overlay} onClick={props.onClick} />;
};

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default ModalOverlay;
