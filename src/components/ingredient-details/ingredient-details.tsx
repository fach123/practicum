import React from "react";
import style from "./ingredient-details.module.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Preloader from "../preloader/preloader";
import { IItem } from "../types";

interface IQuizParams {
  id: string;
}
interface IProduct {
  title: string;
  property: number;
}
const ProductProperties = ({ title, property }: IProduct): JSX.Element => {
  return (
    <div className={style.text_data}>
      <p className="text text_type_main-default text_color_inactive">{title}</p>
      <p className="text text_type_digits-default text_color_inactive">
        {property}
      </p>
    </div>
  );
};
export const IngredientDetails = (): JSX.Element => {
  const { id }: IQuizParams = useParams();
  const { items } = useSelector((store: any) => store.api);

  const ShowIsEmpty = () => {
    if (items.length === 0) {
      return <Preloader />;
    } else {
      const filtered = items.filter((item: IItem) => item._id === id);
      const { image_large, name, calories, proteins, fat, carbohydrates } =
        filtered[0];
      return (
        <div className={`${style.modal_main} mb-4`}>
          <img src={image_large} alt={name} />
          <p className="text text_type_main-medium mb-8">{name}</p>
          <div className={style.text_data_main}>
            <ProductProperties title="Калории,ккал" property={calories} />
            <ProductProperties title="Белки, г" property={proteins} />
            <ProductProperties title="Жиры, г" property={fat} />
            <ProductProperties title="Углеводы, г" property={carbohydrates} />
          </div>
        </div>
      );
    }
  };

  return <ShowIsEmpty />;
};
