import React, { useEffect } from "react";
import style from "./profile-orders.module.css";
import { TOrders, useAppDispatch } from "../types";
import { wsClose, wsConnect } from "../../services/actions/socket-profile";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import FeedItem from "../feed/feed-item";
import { Location } from "history";

export const ProfileOrdersBlock = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { user } = useSelector((store: any) => store.api);
  const { orders } = useSelector((store: any) => store.socketProfile);
  let location = useLocation<{ background: Location }>();
  useEffect(() => {
    if (user.accessToken) {
      const token = user.accessToken.replace("Bearer ", "");
      dispatch(wsConnect(`?token=${token}`));
    }
    return () => {
      dispatch(wsClose);
    };
  }, [dispatch, user]);
  return (
    <div className={`${style.list} custom-scroll`}>
      {orders.map((order: TOrders) => (
        <Link
          className={style.linkOrder}
          to={{
            pathname: `/profile/orders/${order.number}`,
            state: { background: location },
          }}
        >
          <FeedItem order={order} key={order.number} />
        </Link>
      ))}
    </div>
  );
};
