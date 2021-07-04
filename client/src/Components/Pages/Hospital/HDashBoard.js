import React, { useEffect, useState } from 'react'
import { Container } from '@material-ui/core';
import { Switch,Route } from 'react-router';
import AddEmployee from '../Staff/AddStaff';
import DashboardMain from './Dashboard/DashboardMain';
import HAppointments from './Dashboard/HAppointments';
import { getHospitalData } from '../../Utility_Component/Utility functions';
import HAllAppointment from './Dashboard/HAllAppointment';
import DisplayAllStaff from '../Staff/DisplayAllStaff';
const HDashBoard = () => {
  const [isLoggedin,setIsLoggedin] = useState(false);
  const [HoapitalData,setHoapitalData] = useState({});
  const fetchHospitalData = async () => {
    const response = await getHospitalData();
    console.log(response);
    if(response.status === 200){
      const data = response.data;
      console.log(data);
      setHoapitalData(data);
      setIsLoggedin(true);
    }
    else{
      setIsLoggedin(false);
    }
  }
  useEffect(() => {
    fetchHospitalData();
  },[])
  return (
    <>
      <Container>
        {
          isLoggedin ?
            (<Switch>
              <Route exact path="/dashboard/hospital"> <DashboardMain /> </Route>
              <Route path="/dashboard/hospital/appointments"> <HAppointments /> </Route>
              <Route path="/dashboard/hospital/allappointments"> <HAllAppointment /> </Route>
              <Route path="/dashboard/hospital/addemployee"> <AddEmployee /> </Route>
              <Route path="/dashboard/hospital/allemployee"> <DisplayAllStaff />  </Route>
            </Switch> 
            ) : <h1>You need to login for access this page</h1>
        }
      </Container>
    </>
  )
}

export default HDashBoard
