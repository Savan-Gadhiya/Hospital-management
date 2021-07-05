import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../Components/Pages/Home";
import HospitalSignup from '../Components/Pages/Hospital/Signup';
import HospitalLogin from "../Components/Pages/Hospital/Login";
import PatientSignup from "../Components/Pages/Patient/Signup";
import PatientLogin from "../Components/Pages/Patient/Login";
import About from "../Components/Pages/About";
import AddStaff from "../Components/Pages/Staff/AddStaff";
import NavBar from "../Components/Utility_Component/NavBar";
import DashBoard from "../Components/Pages/DashBoard";
import Test from "../Components/Pages/Hospital/Dashboard/AppointmentEditDialog";
import Test2 from "../Components/test2";

const MainRoute = () => {
  return (
    <>
      <NavBar />
      <div className="Root-container" style={{paddingTop: "65px"}}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/hospital/signup" component={HospitalSignup} />
          <Route exact path="/hospital/login" component={HospitalLogin} />
          <Route exact path="/patient/signup" component={PatientSignup} />
          <Route exact path="/patient/login" component={PatientLogin} />
          {/* <Route exact path="/hospital/addemployee" component={AddStaff} /> */}
          <Route exact path="/about" component={About} />
          <Route path="/dashboard" component={DashBoard} />
          <Route path="/test" component={Test} />
          <Route exact path="/test2" component={Test2} />
          <Route component={() => <h1>404 Error Page</h1>} />
          {/* <Route exact path="/layout" component={Layout} />
        <Route exact path="/sidebar" component={SideBar} /> */}
        </Switch>

      </div>
    </>
  );
};

export default MainRoute;
