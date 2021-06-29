import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../Components/Home";
import HospitalSignup from '../Components/Hospital/Signup'
const MainRoute = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/hospital/signup" component={HospitalSignup} />
      </Switch>
    </>
  );
};

export default MainRoute;
