import { Redirect, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function ProtectedRoute({ children, ...rest }) {
  const { user } = useSelector((store) => store.api);
  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = async () => {
    /*await getUser().then(res => {
            setUserLoaded(true);
        })*/
  };

  useEffect(() => {
    init();
  }, []);
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
