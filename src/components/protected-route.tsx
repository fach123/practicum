import { FC } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAppSelector } from "./types";

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { user } = useAppSelector((store) => store.api);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.accessToken ? (
          <>{children}</>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
