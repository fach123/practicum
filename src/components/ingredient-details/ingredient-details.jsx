import React from "react";
import style from "./ingredient-details.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Preloader from "../preloader/preloader";

const ProductProperties = ({ title, property }) => {
  return (
    <div className={style.text_data}>
      <p className="text text_type_main-default text_color_inactive">{title}</p>
      <p className="text text_type_digits-default text_color_inactive">
        {property}
      </p>
    </div>
  );
};
export const IngredientDetails = () => {
  const { id } = useParams();
  const { items } = useSelector((store) => store.api);

  const ShowIsEmpty = () => {
    if (items.length === 0) {
      return <Preloader />;
    } else {
      const filtered = items.filter((item) => item._id === id);
      console.log(filtered);
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
