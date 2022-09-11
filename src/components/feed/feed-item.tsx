import React, { useMemo } from "react";
import { IItem, TOrders, useAppSelector } from "../types";
import style from "./feed-item.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { v4 as uuidv4 } from "uuid";

interface IFeedItem {
  order: TOrders;
}

export const statusList = {
  pending: "Готовится",
  done: "Выполнен",
  created: "Создан",
};

export const formatDate = (date: Date) => {
  return date.toLocaleString("ru-RU", {
    year: "2-digit",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
  });
};

const FeedItem: React.FC<IFeedItem> = ({ order }) => {
  const { items } = useAppSelector((store) => store.api);
  const orderIngredients = order.ingredients.map((value, index, array) => {
    return items.find((item: IItem) => item._id === value);
  });
  const orderPrice = useMemo(() => {
    return orderIngredients.reduce((a, b) => a + (b?.price || 0), 0);
  }, [orderIngredients]);
  const maxCountItems = 4;
  return (
    <div className={style.main} key={order._id}>
      <div className={style.item_header}>
        <div className="text text_type_digits-default">#{order.number}</div>
        <div className="text input__textfield-disabled">
          {formatDate(new Date(order.createdAt))}
        </div>
      </div>

      <div className="text text_type_main-medium mt-3 mb-3">{order.name}</div>

      <div className={`${style[order.status]} text text_type_main-small`}>
        {statusList[order.status]}
      </div>

      <div className={style.images}>
        <div>
          {orderIngredients.map((value, index) => {
            if (
              index === maxCountItems &&
              orderIngredients.length > maxCountItems + 1
            ) {
              return (
                <div
                  className={style.image}
                  style={{
                    position: "relative",
                    left: `-${index * 30}px`,
                  }}
                  key={index}
                >
                  <span className="text text_type_main-medium text_color_primary">
                    +{orderIngredients.length - 1 - maxCountItems}
                  </span>
                </div>
              );
            }

            if (index > maxCountItems) {
              return "";
            }

            return (
              <div
                style={{
                  backgroundImage: `url(${value?.image_mobile})`,
                  position: "relative",
                  left: `-${index * 30}px`,
                  zIndex: `${10 - index}`,
                }}
                className={style.image}
                key={index}
              >
                &nbsp;
              </div>
            );
          })}
        </div>

        <div>
          <span className="text text_type_digits-medium m-2">{orderPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default FeedItem;
