import React, { useEffect } from "react";
import style from "./order-details.module.css";
import okLogo from "../../images/graphics.svg";
import { useDispatch, useSelector } from "react-redux";
import { sendOrder } from "../../services/actions/api";
import Preloader from "../preloader/preloader";

const OrderDetails = () => {
  const { bun, ingredients } = useSelector((store) => store.burgerConstructor);
  const { orderItems, orderItemsRequest, orderItemsFailed } = useSelector(
    (store) => store.api
  );
  const dispatch = useDispatch();
  const validateItems = () => {
    return bun === null && ingredients.length === 0;
  };
  useEffect(() => {
    if (!validateItems()) {
      let allIds = ingredients.map((item) => item._id);
      allIds.push(bun._id);
      dispatch(sendOrder({ ingredients: allIds }));
    }
  }, [dispatch, bun, ingredients]);
  const ShowEmpty = () => {
    return (
      <div className={`${style.modal_main} mb-4`}>
        <p className="text text_type_main-medium mb-15">
          Вы ничего не выбрали :(
        </p>
      </div>
    );
  };
  const ShowError = () => {
    return (
      <div className={`${style.modal_main} mb-4`}>
        <p className="text text_type_main-medium mb-15">Произошла ошибка :(</p>
      </div>
    );
  };
  const ShowSuccessWindow = () => {
    return (
      <div className={`${style.modal_main} mb-4`}>
        <p className={`${style.order_number} text text_type_digits-large mb-8`}>
          {orderItems.order.number}
        </p>
        <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
        <img src={okLogo} alt="OK" className="mb-15" />
        <p className="text text_type_main-medium mb-2">
          Ваш заказ начали готовить
        </p>
        <p className="text text_type_main-medium text_color_inactive mb-20">
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    );
  };
  const GetOrderBlock = () => {
    if (validateItems()) {
      return <ShowEmpty />;
    } else {
      if (orderItemsFailed) {
        return <ShowError />;
      } else if (orderItemsRequest && !orderItems.order) {
        return <Preloader />;
      } else if (orderItems.order) {
        return <ShowSuccessWindow />;
      } else {
        return <ShowError />;
      }
    }
  };
  return (
    <>
      <GetOrderBlock />
    </>
  );
};
export default OrderDetails;
