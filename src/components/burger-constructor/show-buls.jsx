import React from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

export const ShowBuls = ({ bun, type }) => {
  return (
    <>
      {bun ? (
        <ConstructorElement
          type={type}
          isLocked={true}
          text={bun.name}
          price={bun.price}
          thumbnail={bun.image}
        />
      ) : (
        <div
          className={
            "constructor-element constructor-element_empty constructor-element_pos_" +
            type
          }
        >
          <span className="constructor-element__text">Выберите Булочки</span>
        </div>
      )}
    </>
  );
};
ShowBuls.propTypes = {
  type: PropTypes.string.isRequired,
  bun: PropTypes.object,
};
