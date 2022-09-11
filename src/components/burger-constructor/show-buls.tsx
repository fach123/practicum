import React from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { IItem } from "../types";

type TshowBuls = {
  type: "top" | "bottom";
  bun: IItem | null;
};
export const ShowBuls = ({ bun, type }: Required<TshowBuls>): JSX.Element => {
  const BulkaName = bun
    ? bun.name + (type === "top" ? " (верх)" : " (низ)")
    : "";
  return (
    <>
      {bun ? (
        <ConstructorElement
          type={type}
          isLocked={true}
          text={BulkaName}
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
