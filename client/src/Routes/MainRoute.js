import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../Components/Home";
import HospitalSignup from '../Components/Hospital/Signup';
import HospitalLogin from "../Components/Hospital/Login";
import PatientSignup from "../Components/Patient/Signup";
const MainRoute = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/hospital/signup" component={HospitalSignup} />
        <Route exact path="/hospital/login" component={HospitalLogin} />
        <Route exact path="/patient/signup" component={PatientSignup} />
      </Switch>
    </>
  );
};

export default MainRoute;
