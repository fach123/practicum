import React from "react";
import style from "./burger-ingredients.module.css";
import { useSelector } from "react-redux";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";

const ShowBurgerIngredient = React.memo(({ filtered }) => {
  return filtered.map((item) => <BurgerIngredient key={item._id} {...item} />);
});

export const ShowItem = React.memo(
  React.forwardRef(({ name, type }, ref) => {
    const { items } = useSelector((store) => store.api);
    const filtered = React.useMemo(
      () => items.filter((item) => item.type === type),
      [items, type]
    );

    return (
      <>
        <h3 ref={ref} className="text text_type_main-medium mt-10">
          {name}
        </h3>
        <div className={style.content_list}>
          <ShowBurgerIngredient filtered={filtered} />
        </div>
      </>
    );
  })
);
