import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-constructor.module.css";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import {
  DROP_ITEM_BUN,
  DROP_ITEM_INGREDIENT,
} from "../../services/actions/constructor";
import { ShowBuls } from "./show-buls";
import { ShowIngredient } from "./show-ingredient";
import {Redirect, useHistory} from "react-router-dom";

const BurgerConstructor = () => {
  const { user } = useSelector((store) => store.api);
  const history = useHistory();
  const [openModal, setOpenModal] = useState(false);
  const { bun, ingredients } = useSelector((store) => store.burgerConstructor);
  const dispatch = useDispatch();
  const [, drop] = useDrop(() => ({
    accept: ["SORT_INGREDIENT", "NEW_INGREDIENT"],
    drop: (item, monitor) => {
      const itemType = monitor.getItemType();
      if (itemType === "NEW_INGREDIENT") {
        if (item.type === "bun") {
          dispatch(DROP_ITEM_BUN(item));
        } else {
          dispatch(DROP_ITEM_INGREDIENT(item));
        }
      } else if (itemType === "SORT_INGREDIENT") {
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const handleOrder = () => {
    if(user.success){
      setOpenModal(true)
    }else{
      history.replace({ pathname: '/login'});
    }
  }
  const totalPrice = useMemo(() => {
    let bunPrice = 0;
    if (bun) {
      bunPrice = bun.price * 2;
    }
    return ingredients.reduce((acc, item) => acc + item.price, 0) + bunPrice;
  }, [bun, ingredients]);

  return (
    <div className={style.inner}>
      <div ref={drop} className={`${style.editor} mt-25`}>
        <div className="mr-4">
          <ShowBuls type="top" bun={bun} />
        </div>

        <div className={`${style.inner_child} custom-scroll pr-2`}>
          {ingredients.length > 0 ? (
            ingredients.map((item, i) => (
              <ShowIngredient {...item} key={item.constructorId} />
            ))
          ) : (
            <div className={style.item}>
              <div className="constructor-element constructor-element_empty">
                <span className="constructor-element__text">
                  Выберите Начинку
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="mr-4">
          <ShowBuls type="bottom" bun={bun} />
        </div>
      </div>
      <div className={`${style.order} mt-10`}>
        <div className={`mr-10`}>
          <span className="text text_type_digits-medium mr-1">
            {totalPrice}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={handleOrder}>
          Оформить заказ
        </Button>
      </div>
      {openModal && (
        <Modal setOpenModal={setOpenModal} title="">
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};

BurgerConstructor.propTypes = {
  setOpenModal: PropTypes.func,
  openModal: PropTypes.object,
};
export default BurgerConstructor;
