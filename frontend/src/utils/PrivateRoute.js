import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import HomePage from "../pages/HomePage";
import ManagerPage from "../pages/ManagerPage";
import OperatorPage from "../pages/OperatorPage";
const PrivateRoute = ({ ...rest }) => {
  let { user } = useContext(AuthContext);
  let user_type = JSON.parse(localStorage.getItem("user"));
  let user_role = user_type?.results?.user_role;
  console.log("userType", user_role);
  let children = <HomePage />;
  if (user_role == 1) {
    children = <HomePage />;
  } else if (user_role == 2) {
    children = <ManagerPage />;
  } else if (user_role == 3) {
    children = <OperatorPage />;
  }
  return <Route {...rest}>{!user ? <Redirect to="/login" /> : children}</Route>;
};

export default PrivateRoute;
