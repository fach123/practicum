import React, { useEffect } from "react";
import style from "./profile-orders.module.css";
import {TOrders, useAppDispatch, useAppSelector} from "../types";
import { wsClose, wsConnect } from "../../services/actions/socket-profile";
import { Link, useLocation } from "react-router-dom";
import FeedItem from "../feed/feed-item";
import { Location } from "history";
import Preloader from "../preloader/preloader";

export const ProfileOrdersBlock = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => store.api);
  const { orders } = useAppSelector((store) => store.socketProfile);
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
  if(orders){
  return (
    <div className={`${style.list} custom-scroll`}>
      {orders.map((order: TOrders) => (
        <Link
          className={style.linkOrder}
          to={{
            pathname: `/profile/orders/${order.number}`,
            state: { background: location },
          }}
          key={order.number} >
          <FeedItem order={order} key={order.number} />
        </Link>
      ))}
    </div>
  );
  }else{
    return <Preloader/>
  }
};
