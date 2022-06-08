import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-ingredient.module.css";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  DROP_ITEM_BUN,
  DROP_ITEM_INGREDIENT,
  SET_DRAGGED,
} from "../../services/actions/constructor";

const BurgerIngredient = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const { ingredients } = useSelector((store) => store.burgerConstructor);
  const { image, name, price, _id } = props;
  const item = props;
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "NEW_INGREDIENT",
    item: item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
      itemType: monitor.getItemType(),
    }),
  }));
  const opacity = isDragging ? 0.4 : 1;
  return (
    <>
      <div
        ref={drag}
        className={`${style.item}`}
        style={{ opacity: opacity }}
        onClick={() => setOpenModal(true)}
      >
        <div className={style.counter}>
          <Counter
            count={
              ingredients.filter((item) => {
                return item._id === _id;
              }).length
            }
            size="default"
          />
        </div>
        <div className="pr-4 pl-4">
          <img src={image} alt={name} />
        </div>
        <div className={`${style.price} mt-1`}>
          <span className="text text_type_digits-default mr-1">{price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default mt-1">{name}</p>
      </div>
      {openModal && (
        <Modal setOpenModal={setOpenModal} title="Детали ингредиента">
          <IngredientDetails {...props} />
        </Modal>
      )}
    </>
  );
};

BurgerIngredient.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default BurgerIngredient;
