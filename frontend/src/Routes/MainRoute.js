import React from "react";
import { Switch, Route, Redirect,useLocation } from "react-router-dom";
import Home from "../Components/Pages/Home";
import HospitalSignup from '../Components/Pages/Hospital/Signup';
import HospitalLogin from "../Components/Pages/Hospital/Login";
import PatientSignup from "../Components/Pages/Patient/Signup";
import PatientLogin from "../Components/Pages/Patient/Login";
import About from "../Components/Pages/About";
import NavBar from "../Components/Utility_Component/NavBar";
import DashBoard from "../Components/Pages/DashBoard";
import Logout from "../Components/Pages/Shared/Logout";
import Footer from "../Components/Utility_Component/Footer";


const MainRoute = () => {
  const location = useLocation();
  return (
    <>
      <NavBar />
      <div className="Root-container" style={{ paddingTop: "65px" ,minHeight: "98vh"}}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup/hospital" component={HospitalSignup} />
          <Route exact path="/login/hospital" component={HospitalLogin} />
          <Route exact path="/signup/patient" component={PatientSignup} />
          <Route exact path="/login/patient" component={PatientLogin} />
          <Route exact path="/about" component={About} />
          <Route path="/dashboard" component={DashBoard} />
          <Route exact path="/logout" component={Logout} />
          <Redirect to="/"/>
        </Switch>
      </div>
      {!location.pathname.includes("dashboard") && <Footer />}
      
    </>
  );
};

export default MainRoute;
