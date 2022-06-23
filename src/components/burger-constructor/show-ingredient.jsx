import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import style from "./burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  DELETE_ITEM,
  SORT_INGREDIENT,
} from "../../services/actions/constructor";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

export const ShowIngredient = (item) => {
  const { ingredients } = useSelector((store) => store.burgerConstructor);
  const ref = useRef(null);
  const dragIndex = ingredients.findIndex((itemObject) => {
    return itemObject.constructorId === item.constructorId;
  });
  const dispatch = useDispatch();

  const [, drop] = useDrop(() => ({
    accept: ["SORT_INGREDIENT"],

    drop(draggedItem) {
      if (draggedItem.type !== "bun") {
        dispatch(
          SORT_INGREDIENT({
            from: draggedItem.item.constructorId,
            to: item.constructorId,
          })
        );
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "SORT_INGREDIENT",
    item: () => {
      return { item, dragIndex };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  const opacity = isDragging ? 0.4 : 1;
  drag(drop(ref));
  return (
    <div ref={ref} className={style.item} style={{ opacity: opacity }}>
      <span className="mr-3">
        <DragIcon type="primary" />
      </span>
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image_mobile}
        handleClose={() => dispatch(DELETE_ITEM(item))}
      />
    </div>
  );
};
ShowIngredient.propTypes = {
  item: PropTypes.object,
};
