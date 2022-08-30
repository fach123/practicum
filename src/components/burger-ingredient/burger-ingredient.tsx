import React from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-ingredient.module.css";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import {IItem, useAppSelector} from "../types";
import { Location } from "history";

const BurgerIngredient = (props: IItem): JSX.Element => {
  const { ingredients, bun } = useAppSelector((store) => store.burgerConstructor);
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
  const GetCount = (): JSX.Element | null => {
    if(bun && bun._id === _id){
      return <Counter count={1} size="default" />;
    }
    const counter = ingredients.filter((item: IItem) => {
      return item._id === _id;
    }).length;
    return counter > 0 ? <Counter count={counter} size="default" /> : null;
  };
  let location = useLocation<{ background: Location }>();
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

export default BurgerIngredient;
