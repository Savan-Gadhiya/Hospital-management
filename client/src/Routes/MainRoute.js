import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../Components/Pages/Home";
import HospitalSignup from '../Components/Pages/Hospital/Signup';
import HospitalLogin from "../Components/Pages/Hospital/Login";
import PatientSignup from "../Components/Pages/Patient/Signup";
import PatientLogin from "../Components/Pages/Patient/Login";
import About from "../Components/Pages/About";
import AddStaff from "../Components/Pages/Staff/AddStaff";
const MainRoute = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/hospital/signup" component={HospitalSignup} />
        <Route exact path="/hospital/login" component={HospitalLogin} />
        <Route exact path="/patient/signup" component={PatientSignup} />
        <Route exact path="/patient/login" component={PatientLogin} />
        <Route exact path="/addemployee" component={AddStaff} />
        <Route exact path="/about" component={About} />
      </Switch>
    </>
  );
};

export default MainRoute;
