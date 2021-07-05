import React, { createContext } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../Components/Pages/Home";
import HospitalSignup from '../Components/Pages/Hospital/Signup';
import HospitalLogin from "../Components/Pages/Hospital/Login";
import PatientSignup from "../Components/Pages/Patient/Signup";
import PatientLogin from "../Components/Pages/Patient/Login";
import About from "../Components/Pages/About";
// import AddStaff from "../Components/Pages/Staff/AddStaff";
import NavBar from "../Components/Utility_Component/NavBar";
import DashBoard from "../Components/Pages/DashBoard";
import Logout from "../Components/Pages/Shared/Logout";
// import Test from "../Components/Pages/Hospital/Dashboard/AppointmentEditDialog";
// import Test2 from "../Components/test2";


const MainRoute = () => {
  return (
    <>
      <NavBar />
      <div className="Root-container" style={{ paddingTop: "65px" }}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup/hospital" component={HospitalSignup} />
          <Route exact path="/login/hospital" component={HospitalLogin} />
          <Route exact path="/signup/patient" component={PatientSignup} />
          <Route exact path="/login/patient" component={PatientLogin} />
          {/* <Route exact path="/hospital/addemployee" component={AddStaff} /> */}
          <Route exact path="/about" component={About} />
          <Route path="/dashboard" component={DashBoard} />
          <Route exact path="/logout" component={Logout} />
          {/* <Route path="/test" component={Test} />
          <Route exact path="/test2" component={Test2} /> */}
          <Route component={() => <h1>404 Error Page</h1>} />
          {/* <Route exact path="/layout" component={Layout} />
        <Route exact path="/sidebar" component={SideBar} /> */}
        </Switch>

      </div>
    </>
  );
};

export default MainRoute;
