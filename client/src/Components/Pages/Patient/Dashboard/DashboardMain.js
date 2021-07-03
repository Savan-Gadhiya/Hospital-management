import React from 'react'
import Card from '../../../Utility_Component/Card';
import "../../../Utility_Component/Dashboard.css";
import { Container, Paper, Typography, makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  heading: {
    margin: `${theme.spacing(2)}px 0px`,
  }
}))
const DashboardMain = () => {
  const classes = useStyles();
  return (
    <>
      <Container>
        <Typography variant="h3" component="h1" className={classes.heading}>PatientName's Dashboard</Typography>
      </Container>
      <div className="card-container">
        <Card className="blue-bg" title="Total Appoinments" value="5" />
        <Card className="green-bg" title="Appoinment Time" value="2-05-2021 2:30" />
        <Card className="pink-bg" title="Medial Status" value="Normal" />

      </div>
    </>
  )
}

export default DashboardMain
