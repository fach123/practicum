import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  Button,
  DragIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-constructor.module.css";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import { useDispatch, useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import {
  DELETE_ITEM,
  DROP_ITEM_BUN,
  DROP_ITEM_INGREDIENT,
  SET_DRAGGED,
} from "../../services/actions/constructor";

const BurgerConstructor = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const { bun, ingredients, draggedIngredient } = useSelector(
    (store) => store.burgerConstructor
  );
  const dispatch = useDispatch();
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["SORT_INGREDIENT", "NEW_INGREDIENT"],
    drop: (item) => {
      if (item.type === "bun") {
        dispatch(DROP_ITEM_BUN(item));
      } else {
        dispatch(DROP_ITEM_INGREDIENT(item));
      }
    },
    hover(item, monitor) {
      const itemType = monitor.getItemType();
      if (itemType === "NEW_INGREDIENT" && item.type !== "bun") {
        //dispatch(SET_DRAGGED(item));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const totalPrice = useMemo(() => {
    let bunPrice = 0;
    if (bun) {
      bunPrice = bun.price * 2;
    }
    return ingredients.reduce((acc, item) => acc + item.price, 0) + bunPrice;
  }, [bun, ingredients]);

  const ShowBulka = (props) => {
    return (
      <>
        {bun ? (
          <ConstructorElement
            type={props.type}
            isLocked={true}
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image}
          />
        ) : (
          <div
            className={
              "constructor-element constructor-element_empty constructor-element_pos_" +
              props.type
            }
          >
            <span className="constructor-element__text">Выберите Булочки</span>
          </div>
        )}
      </>
    );
  };
  const ShowIngredient = (item) => {
    const [g, drag] = useDrag(() => ({
      type: "SORT_INGREDIENT",
      item: item,
    }));
    return (
      <div ref={drag} className={style.item} key={item.key}>
        <span className="mr-3">
          <DragIcon type="primary" />
        </span>
        <ConstructorElement
          text={item.name}
          price={item.price}
          thumbnail={item.image_mobile}
          handleClose={() => dispatch(DELETE_ITEM(item))}
        />
      </div>
    );
  };
  return (
    <div className={style.inner}>
      <div ref={drop} className={`${style.editor} mt-25`}>
        <div className="mr-4">
          <ShowBulka type="top" />
        </div>

        <div className={`${style.inner_child} custom-scroll pr-2`}>
          {ingredients.length > 0 ? (
            ingredients.map((item, i) => (
              <ShowIngredient {...item} key={item.uuid} />
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
          <ShowBulka type="bottom" />
        </div>
      </div>
      <div className={`${style.order} mt-10`}>
        <div className={`mr-10`}>
          <span className="text text_type_digits-medium mr-1">
            {totalPrice}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={() => setOpenModal(true)}>
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
