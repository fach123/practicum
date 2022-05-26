import React, {useState} from "react";
import PropTypes from 'prop-types';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-ingredient.module.css";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";


const BurgerIngredient = (props) => {
    const [openModal, setOpenModal] = useState(false)
    const {image, name, price} = props;
    return (<>
        <div className={`${style.item}`} onClick={() => setOpenModal(true)}>
            <div className={style.counter}>
                <Counter count={1} size="default"/>
            </div>
            <div className="pr-4 pl-4">
                <img src={image} alt={name}/>
            </div>
            <div className={`${style.price} mt-1`}>
                <span className="text text_type_digits-default mr-1">{price}</span>
                <CurrencyIcon type="primary"/>
            </div>
            <p className="text text_type_main-default mt-1">{name}</p>
        </div>
        {openModal &&
            <Modal setOpenModal={setOpenModal} title="Детали ингредиента"><IngredientDetails {...props}/></Modal>}
    </>)
}

BurgerIngredient.propTypes = {
    image: PropTypes.string.isRequired, name: PropTypes.string.isRequired, price: PropTypes.number.isRequired,
}

export default BurgerIngredient;