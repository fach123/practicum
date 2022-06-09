import React, { useEffect } from "react";
import PropTypes from "prop-types";
import style from "./ingredient-details.module.css";
import { useDispatch } from "react-redux";

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
const IngredientDetails = (props) => {
  const { image_large, name, calories, proteins, fat, carbohydrates } = props;
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
};
IngredientDetails.propTypes = {
  name: PropTypes.string.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  image_large: PropTypes.string.isRequired,
};
export default IngredientDetails;
