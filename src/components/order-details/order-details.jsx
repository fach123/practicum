import React from "react";
import style from "./order-details.module.css";
import okLogo from "../../images/graphics.svg"

const OrderDetails = () => {
    return (
        <div className={`${style.modal_main} mb-4`}>
            <p className={`${style.order_number} text text_type_digits-large mb-8`}>034536</p>
            <p className="text text_type_main-medium mb-15">
                идентификатор заказа
            </p>
            <img src={okLogo} alt="OK" className="mb-15"/>
            <p className="text text_type_main-medium mb-2">
                Ваш заказ начали готовить
            </p>
            <p className="text text_type_main-medium text_color_inactive mb-20">
                Дождитесь готовности на орбитальной станции
            </p>
        </div>

    )
};
export default OrderDetails;
