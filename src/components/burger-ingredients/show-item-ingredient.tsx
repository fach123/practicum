import React, { FC, NamedExoticComponent, PropsWithChildren } from "react";
import style from "./burger-ingredients.module.css";
import { useSelector } from "react-redux";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import { IItem } from "../types";

interface IFiltered {
  filtered: Array<IItem>;
}

const ShowBurgerIngredient = React.memo(
  ({ filtered }: IFiltered): JSX.Element => {
    return (
      <>
        {filtered.map((item: IItem) => (
          <BurgerIngredient key={item._id} {...item} />
        ))}
      </>
    );
  }
);

type TRef = HTMLHeadingElement;
interface IShowItem {
  name: string;
  type: string;
}
export const ShowItem = React.memo(
  React.forwardRef<TRef, IShowItem>(({ name, type }, ref): JSX.Element => {
    const { items } = useSelector((store: any) => store.api);
    const filtered = React.useMemo(
      () => items.filter((item: IItem) => item.type === type),
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
