import React from "react";
import style from "./modal-overlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = (props) => {
    return (
        <div className={style.overlay} onClick={props.onClick}>
            {props.children}
        </div>
    )
}

ModalOverlay.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
}
export default ModalOverlay;
