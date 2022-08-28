import React, { useEffect, useMemo, useState } from "react";
import { IItem, TOrders } from "../types";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "./feed-details.module.css";
import { formatDate, statusList } from "./feed-item";
import { v4 as uuidv4 } from "uuid";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Preloader from "../preloader/preloader";

interface IQuizParams {
  id: string;
}

interface ISocketDetails {
  orders: Array<TOrders>;
}

interface IFeedBlockH {
  order: TOrders;
  items: Array<IItem>;
}

interface IDataOrder {
  orders: Array<TOrders>;
  success: boolean;
}

interface IState {
  state: IDataOrder;
}

const FeedBlockH: React.FC<IFeedBlockH> = ({ order, items }) => {
  const orderIngredients = order.ingredients.map((value, index, array) => {
    return items.find((item: IItem) => item._id === value);
  });
  // @ts-ignore
  const clearOrderIngredients = [...new Map(orderIngredients.map((item) => [item["_id"], item])).values(),];
  const orderPrice = useMemo(() => {
    return orderIngredients.reduce((a, b) => a + (b?.price || 0), 0);
  }, [orderIngredients]);
  return (
    <div className={style.details}>
      <div className="text text_type_main-default text_type_digits-default">
        #{order.number}
      </div>
      <div className="text text_type_main-medium mt-5">{order.name}</div>
      <div className="text text_type_main-default  mt-3">
        {statusList[order.status]}
      </div>
      <div className="text text_type_main-medium mt-5 mb-5">Состав:</div>
      <div className={`${style.list} custom-scroll`}>
        {clearOrderIngredients.map((value) => {
          const count = orderIngredients.filter((item) => {
            return item?._id === value._id;
          }).length;
          return (
            <div className={style.items} key={value._id}>
              <div className={style.item_block}>
                <div
                  style={{ backgroundImage: `url(${value?.image_mobile})` }}
                  className={style.img}
                />
                <div
                  className={`${style.item_name} text text_type_main-default ml-3`}
                >
                  {value?.name}
                </div>
              </div>
              <div className={style.price}>
                <span className="mr-2 text_type_digits-default">
                  {count} x {value?.price}
                </span>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          );
        })}
      </div>
      <div className={style.footer}>
        <div className="text text_color_inactive">
          {formatDate(new Date(order.createdAt))}
        </div>
        <div>
          <span className="text text_type_digits-medium m-2">{orderPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
const FromSocketDetails: React.FC<ISocketDetails> = ({ orders }) => {
  const { id }: IQuizParams = useParams();
  const order = orders.find((i: TOrders) => i.number === parseInt(id));
  const { items } = useSelector((store: any) => store.api);
  if (order && items.length > 0) {
    return <FeedBlockH order={order} items={items} />;
  } else {
    return <>Заказ не найден</>;
  }
};
const FromHttpDetails: React.FC<IState> = (state) => {
  const { items } = useSelector((store: any) => store.api);
  const { success, orders } = state.state;
  if (success && items.length > 0) {
    return (
      <div style={{ textAlign: "center" }}>
        <FeedBlockH order={orders[0]} items={items} />
      </div>
    );
  } else {
    return <Preloader />;
  }
};

export const FeedDetails: React.FC = () => {
  const { id }: IQuizParams = useParams();
  const [state, setState] = useState({ success: false, orders: [] });
  useEffect(() => {
    async function loadDataOrder(number: string) {
      const data = await (
        await fetch("https://norma.nomoreparties.space/api/orders/" + number)
      ).json();
      return data;
    }

    loadDataOrder(id).then((data) => {
      return setState(data);
    });
  }, []);
  const { orders } = useSelector((store: any) => store.socket);
  return orders.length > 0 ? (
    <FromSocketDetails orders={orders} />
  ) : (
    <FromHttpDetails state={state} />
  );
};
