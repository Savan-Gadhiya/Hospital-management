import React,{ useEffect, useState }  from 'react'
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

  const fetchPatientData = async () => {
    const response = await getPatientData();
    // console.log(response.data);
    if (response.status === 200) {
      console.log(response.data )
      setPatientData(response.data);
    }
  }
  useEffect(() => {
    fetchPatientData();
  }, []);
  return (
    <>
      <Container>
        <Typography variant="h3" component="h1" className={classes.heading}>{patientData.name}'s Dashboard</Typography>
      </Container>
      <div className="card-container">
        <Card className="blue-bg" title="Total Appoinments" value="5" />
        <Card className="green-bg" title="Appoinment Time" value="2-05-2021 2:30" />
        <Card className="pink-bg" title="Medial Status" value="Normal" />
      </div>
      {/* <Container>
        <Paper>
          <Typography variant="h4" component="h1" style={{margin: "20px 0px",padding: "10px"}}>New Appointments</Typography> */}
          <PAppointments patientData={patientData}/>
        {/* </Paper> */}
      {/* </Container> */}
    </>
  )
}

export default DashboardMain
