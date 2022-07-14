import { FC } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { user } = useSelector((store: any) => store.api);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.accessToken ? (
          <>children</>
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
