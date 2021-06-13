import { Route, Redirect } from "react-router";

export const ProtectedRoute = ({ children, user, path, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user) {
          return children;
        }
        return (
          <Redirect
            to={{
              pathname: "signin",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};
export const UserRedirect = ({ children, user, path, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!user) {
          return children;
        }
        return (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};
