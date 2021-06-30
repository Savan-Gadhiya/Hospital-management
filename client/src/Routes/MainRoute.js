import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../Components/Home";
import HospitalSignup from '../Components/Hospital/Signup';
import HospitalLogin from "../Components/Hospital/Login";
import PatientSignup from "../Components/Patient/Signup";
import PatientLogin from "../Components/Patient/Login";
import About from "../Components/About";
const MainRoute = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/hospital/signup" component={HospitalSignup} />
        <Route exact path="/hospital/login" component={HospitalLogin} />
        <Route exact path="/patient/signup" component={PatientSignup} />
        <Route exact path="/patient/login" component={PatientLogin} />
        <Route exact path="/about" component={About} />
      </Switch>
    </>
  );
};

export default MainRoute;
