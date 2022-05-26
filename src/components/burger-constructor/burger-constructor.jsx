import React, {useState} from "react";
import PropTypes from "prop-types";
import {ConstructorElement, Button, DragIcon, CurrencyIcon,} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-constructor.module.css";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";

const BurgerConstructor = (props) => {
    const [openModal, setOpenModal] = useState(false)
    const db = props.apiData.data;
    const lastElement = db[db.length - 1];
    return (
        <div className={style.inner}>
            <div className={`${style.editor} mt-25`}>
                <div className="mr-4">
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={db[0].name}
                        price={db[0].price}
                        thumbnail={db[0].image_mobile}
                    />
                </div>

                <div className={`${style.inner_child} custom-scroll pr-2`}>
                    {db
                        .filter((el) => el.type !== "bun")
                        .map((el, i) => (
                            <div className={style.item} key={i}>
                                <span className="mr-3">
                                  <DragIcon type="primary"/>
                                </span>
                                <ConstructorElement text={el.name} price={el.price} thumbnail={el.image_mobile}/>
                            </div>
                        ))}
                </div>

                <div className="mr-4">
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={lastElement.name}
                        price={lastElement.price}
                        thumbnail={lastElement.image_mobile}
                    />
                </div>
            </div>
            <div className={`${style.order} mt-10`}>
                <div className={`mr-10`}>
                    <span className="text text_type_digits-medium mr-1">123</span>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button type="primary" size="large" onClick={() => setOpenModal(true)}>
                    Оформить заказ
                </Button>
            </div>
            {openModal && <Modal setOpenModal={setOpenModal} title=""><OrderDetails/></Modal>}
        </div>
    );
};
const BurgerConstructorPropTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,


})

const apiDataPropTypes = PropTypes.shape({
    success: PropTypes.bool,
    data: PropTypes.arrayOf(BurgerConstructorPropTypes.isRequired).isRequired
})


BurgerConstructor.propTypes = {
    apiData: apiDataPropTypes,
    setOpenModal: PropTypes.func,
    openModal: PropTypes.object,
}
export default BurgerConstructor;
