import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import style from "./burger-ingredients.module.css";

const BurgerIngredients = (props) => {
    const [current, setCurrent] = useState('one');
    const db = props.apiData.data;
    const showItem = (name, type) => {
        return (
            <>
                <h3 className="text text_type_main-medium mt-10">{name}</h3>
                <div className={style.content_list}>
                    {showBurgerIngredient(db.filter(item => item.type === type))}
                </div>
            </>
        );
    }

    const showBurgerIngredient = (filtered) => {
        return (
            filtered.map((item) => <BurgerIngredient key={item._id} {...item}/>
            )
        )
    }

    return (
        <div className={`${style.inner} mr-10`}>
            <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
            <div className={`${style.tabs} mt-5`}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>Булки</Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>Соусы</Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>Начинки</Tab>
            </div>
            <div className={`${style.content} custom-scroll`}>
                {
                    <>
                        {showItem('Булки', 'bun')}
                        {showItem('Соусы', 'sauce')}
                        {showItem('Начинки', 'main')}
                    </>
                }
            </div>
        </div>
    )
}
const BurgerIngredientsPropTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,

})

const apiDataPropTypes = PropTypes.shape({
    success: PropTypes.bool,
    data: PropTypes.arrayOf(BurgerIngredientsPropTypes.isRequired).isRequired
})


BurgerIngredients.propTypes = {
    apiData: apiDataPropTypes,
    setOpenModal: PropTypes.func,
    openModal: PropTypes.object,
}

export default BurgerIngredients;