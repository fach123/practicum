import React, { useEffect } from "react";
import style from "./order-details.module.css";
import okLogo from "../../images/graphics.svg";
import { sendOrder } from "../../services/actions/api";
import Preloader from "../preloader/preloader";
import {IItem, useAppDispatch, useAppSelector} from "../types";

/*interface ISendOrder {
  ingredients: number[];
}
*/
const OrderDetails = (): JSX.Element => {
  const { bun, ingredients } = useAppSelector(
    (store) => store.burgerConstructor
  );
  const { orderItems, orderItemsRequest, orderItemsFailed,user } = useAppSelector(
    (store) => store.api
  );
  const dispatch = useAppDispatch();
  const validateItems = (): boolean => {
    return ingredients.length > 0 && bun !== null;
  };
  useEffect(() => {
    if (validateItems() && bun && user.accessToken) {
      let allIds = ingredients.map((item: IItem) => item._id);
      allIds.push(bun._id);

      dispatch(sendOrder({ ingredients: allIds,accessToken: user.accessToken}));
    }
  }, [dispatch, bun, ingredients, user]);
  const ShowEmpty = (): JSX.Element => {
    return (
      <div className={`${style.modal_main} mb-4`}>
        <p className="text text_type_main-medium mb-15">
          Вы ничего не выбрали :(
        </p>
      </div>
    );
  };
  const ShowError = (): JSX.Element => {
    return (
      <div className={`${style.modal_main} mb-4`}>
        <p className="text text_type_main-medium mb-15">Произошла ошибка :(</p>
      </div>
    );
  };
  const ShowSuccessWindow = (): JSX.Element => {
    return (
      <div className={`${style.modal_main} mb-4`}>
        <p className={`${style.order_number} text text_type_digits-large mb-8`}>
          {orderItems.order ? orderItems.order.number : 0}
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
  const GetOrderBlock = (): JSX.Element => {
    if (!validateItems()) {
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
