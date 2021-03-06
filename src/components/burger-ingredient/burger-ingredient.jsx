import React from "react";
import PropTypes from "prop-types";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-ingredient.module.css";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const BurgerIngredient = (props) => {
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
  const GetCount = () => {
    const counter = ingredients.filter((item) => {
      return item._id === _id;
    }).length;
    return counter > 0 ? <Counter count={counter} size="default" /> : "";
  };
  let location = useLocation();
  return (
    <>
      <Link
        className={style.linkIng}
        to={{
          pathname: `/ingredients/${item._id}`,
          state: { background: location },
        }}
      >
        <div
          ref={drag}
          className={`${style.item}`}
          style={{ opacity: opacity }}
        >
          <div className={style.counter}>
            <GetCount />
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
      </Link>
    </>
  );
};

BurgerIngredient.propTypes = {
  _id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default BurgerIngredient;
