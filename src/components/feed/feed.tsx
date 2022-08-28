import React, { useEffect, useMemo } from "react";
import style from "./feed.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { wsClose, wsConnect } from "../../services/actions/socket-all";
import { TOrders } from "../types";
import FeedItem from "./feed-item";
import { Location } from "history";

export const FeedBlock: React.FC = () => {
  const dispatch = useDispatch();
  const { orders, totalToday, total } = useSelector(
    (store: any) => store.socket
  );

  const readyOrders = useMemo(() => {
    return orders.filter((i: TOrders) => i.status === "done");
  }, [orders]);

  const pendingOrders = useMemo(() => {
    return orders.filter((i: TOrders) => i.status === "pending");
  }, [orders]);

  useEffect(() => {
    dispatch(wsConnect(""));
    return () => {
      dispatch(wsClose);
    };
  }, [dispatch]);
  let location = useLocation<{ background: Location }>();
  return (
    <>
      <div className={style.inner}>
        <div className={style.feed}>
          <h1 className="text text_type_main-large">Лента заказов</h1>

          <div className={`${style.list} custom-scroll mr-15`}>
            {orders.map((order: TOrders) => (
              <Link
                className={style.linkOrder}
                to={{
                  pathname: `/feed/${order.number}`,
                  state: { background: location },
                }}
              >
                <FeedItem order={order} key={order.number} />
              </Link>
            ))}
          </div>
        </div>
        <div className={style.feed}>
          <div className={style.ready}>
            <div>
              <h2 className="text text_type_main-medium">Готовы:</h2>
              <ul className={style.list_info}>
                {readyOrders.map((order: TOrders) => {
                  return (
                    <li
                      className="text text_type_digits-default text_color_success mr-5"
                      key={order._id}
                    >
                      {order.number}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="ml-30">
              <h2 className="text text_type_main-medium">В работе:</h2>
              <ul className={style.list_info}>
                {pendingOrders.map((order: TOrders) => {
                  return (
                    <li
                      className="text text_type_digits-default text_color_success mr-5"
                      key={order._id}
                    >
                      {order.number}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <h2 className="text text_type_main-medium mt-5">
            выполнено за все время:
          </h2>
          <p className="text text_type_digits-large">{total}</p>
          <h2 className="text text_type_main-medium mt-5">
            выполнено за сегодня:
          </h2>
          <p className="text text_type_digits-large">{totalToday}</p>
        </div>
      </div>
    </>
  );
};
