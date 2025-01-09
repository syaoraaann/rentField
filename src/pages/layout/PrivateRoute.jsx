/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import LoginPage from "../login";
import HamsterLoader from "../loaders/hamster";

import MainLayout from "./Main";

const PrivateRoute = ({ component }) => {
  const { isLoggedIn, isLoadingScreen } = useContext(AuthContext);
  console.log("PrivateRoute -> isLoggedIn", isLoggedIn);

  if (isLoggedIn && !isLoadingScreen) {
    // Redirect to login page or any other public route
    return <MainLayout> {component} </MainLayout>;
  } else if (!isLoggedIn && !isLoadingScreen) {
  // return <Navigate to="/login" replace />;
  return <LoginPage />;
}
return <HamsterLoader/>;
  // Render the child component or outlet
};

export default PrivateRoute;
