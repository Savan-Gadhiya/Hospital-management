import React, { useEffect,useState } from 'react'
import { Container, Typography, makeStyles } from '@material-ui/core';
import Card from '../../../Utility_Component/Card';
import "../../../Utility_Component/Dashboard.css";
import { getHospitalData } from '../../../Utility_Component/Utility functions';
import HAppointments from '../Dashboard/HAppointments';
const useStyles = makeStyles((theme) => ({
  heading: {
    margin: `${theme.spacing(2)}px 0px`,
  }
}))

const DashboardMain = () => {
  const [appointmentCount,setAppointmentCount] = useState({});
  const [hospitalData,setHospitalData] = useState({});
  const classes = useStyles();

  const fetchHospitalData = async () => {
    const response = await getHospitalData();
    if(response.status === 200){
      setHospitalData(response.data);
    }
    else{
      console.log("Error while gatting hospital DAta")
    }
  }

  const fetchAppointmentCount = async () => {
    const response = await fetch("/api/appointment/hospital/getcount", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      credentials: "include"
    });
    const data = await response.json();
    // console.log(data)
    if (response.status === 200) {
      setAppointmentCount(data);
    }
    else {
      console.log("Error while fetching count data : ", data);
    }
  }
  useEffect(() => {
    fetchHospitalData();
    fetchAppointmentCount();
  },[])

  return (
    <>
      <Container>
        <Typography variant="h3" component="h1" className={classes.heading}>{hospitalData.name}'s Dashboard</Typography>
      </Container>
      <div className="card-container">
        <Card className="blue-bg" title="Total Appointments" value={appointmentCount.allAppointment} />
        <Card className="pink-bg" title="Open Appointments" value={appointmentCount.openAppointment} />
        <Card className="green-bg" title="Close Appointments" value={appointmentCount.closeAppointment} />
      </div>
      <HAppointments />
    </>
  )
}

export default DashboardMain;
