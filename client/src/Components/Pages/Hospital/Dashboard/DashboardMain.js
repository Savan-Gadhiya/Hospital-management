import React from 'react'
import useDefaultStyle from '../../../Form_Component/FormStyle';
import { Container, Paper, Typography, makeStyles } from '@material-ui/core';
import Card from '../../../Utility_Component/Card';
import "../../../Utility_Component/Dashboard.css";
const useStyles = makeStyles((theme) => ({
  heading: {
    margin: `${theme.spacing(2)}px 0px`,
  }
}))

const DashboardMain = () => {
  const DefaultClasses = useDefaultStyle();
  const classes = useStyles();
  return (
    <>
      <Container>
        <Typography variant="h3" component="h1" className={classes.heading}>Hospital Dashboard</Typography>
      </Container>
      <div className="card-container">
        <Card className="blue-bg" title="Total Appoinments" value="5" />
        <Card className="pink-bg" title="Total Patients" value="40" />
        <Card className="green-bg" title="Total Employees" value="3" />
      </div>

    </>
  )
}

export default DashboardMain;
