import { ReactNode } from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

interface IProtected {
  path: string;
  children: ReactNode;
  exact?: boolean;
}

export function ProtectedRoute({ children, ...rest }: IProtected) {
  const { user } = useSelector((store: any) => store.api);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.accessToken ? (
          children
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
}
