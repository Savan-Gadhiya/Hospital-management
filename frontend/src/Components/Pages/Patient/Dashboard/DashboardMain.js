import React, { useEffect, useState } from 'react'
import Card from '../../../Utility_Component/Card';
import "../../../Utility_Component/Dashboard.css";
import { Container, Paper, Typography, makeStyles } from '@material-ui/core';
import PAppointments from './PAppointments';
import { getPatientData } from '../../../Utility_Component/Utility functions';
const useStyles = makeStyles((theme) => ({
  heading: {
    margin: `${theme.spacing(2)}px 0px`,
  }
}))
const DashboardMain = () => {
  const classes = useStyles();
  const [patientData, setPatientData] = useState({});
  const [appointmentCount,setAppointmentCount] = useState({});
  const fetchPatientData = async () => {
    const response = await getPatientData();
    // console.log(response.data);
    if (response.status === 200) {
      console.log(response.data)
      setPatientData(response.data);
    }
  }
  const fetchAppointmentCount = async () => {
    const response = await fetch("/api/appointment/patient/getcount",{
      method: "GET",
      headers: {
        "Content-Type":"application/json",
        Accept: "application/json"
      },
      credentials: "include"
    });
    const data = await response.json();
    if(response.status === 200){
      setAppointmentCount(data);
    }
    else{
      console.log("Error while fetching count data : ",data);
    }
  }
  useEffect(() => {
    fetchPatientData();
    fetchAppointmentCount();
  }, []);
  return (
    <>
      <Container>
        <Typography variant="h3" component="h1" className={classes.heading}>{patientData.name}'s Dashboard</Typography>
      </Container>
      <div className="card-container">
        <Card className="blue-bg" title="Total Appoinments" value={appointmentCount.allAppointment} />
        <Card className="green-bg" title="Open Appointments" value={appointmentCount.openAppointment} />
        <Card className="pink-bg" title="Closed Appointments" value={appointmentCount.closeAppointment} />
      </div>

      {/* Reader PAppointment */}
      <PAppointments patientData={patientData} />
    </>
  )
}

export default DashboardMain
