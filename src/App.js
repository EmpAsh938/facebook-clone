import { useEffect } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { ProtectedRoute, UserRedirect } from "./helper/route-helper";
import Browse from "./pages/Browse";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Error from "./pages/Error";

import { BROWSE, SIGNIN, SIGNUP } from "./helper/path";
import { getUserDetails, loggedIn } from "./redux/postSlice";

const App = () => {
  const dispatch = useDispatch();

  const checkLocalStorage = JSON.parse(localStorage.getItem("UserCreds"));
  useEffect(() => {
    if (checkLocalStorage) {
      dispatch(loggedIn());
      dispatch(
        getUserDetails({
          name: checkLocalStorage.displayName,
          pic: checkLocalStorage.photoURL,
          mail: checkLocalStorage.email,
        })
      );
    }
  }, []);

  const user = useSelector((state) => state.posts.isLoggedIn);
  return (
    <Router>
      <Switch>
        <ProtectedRoute exact user={user} path={BROWSE}>
          <Browse />
        </ProtectedRoute>
        <UserRedirect exact user={user} path={SIGNIN}>
          <Signin />
        </UserRedirect>
        <UserRedirect exact user={user} path={SIGNUP}>
          <Signup />
        </UserRedirect>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
