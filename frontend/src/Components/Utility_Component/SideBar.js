import React, { useState } from 'react'
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import DashboardIcon from '@material-ui/icons/Dashboard';
import TouchAppRoundedIcon from '@material-ui/icons/TouchAppRounded';
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import { useHistory, useLocation } from 'react-router-dom';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  active: {
    background: "#f2f2f2",
    borderLeft: "5px solid #303F9F",
  }
}));


const SideBar = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [isPatient, setIsPatient] = useState(false);
  useState(() => {
    if (location.pathname.includes("/dashboard/patient")) {
      setIsPatient(true);
    }
    else {
      setIsPatient(false);
    }
  }, [location.pathname])

  const patientArr = [
    { name: "Dashboard", icon: <DashboardIcon />, path: "/dashboard/patient" },
    { name: "All Appoinments", icon: <AccessTimeRoundedIcon />, path: "/dashboard/patient/appointments" },
    { name: "New Appoinment", icon: <TouchAppRoundedIcon />, path: "/dashboard/patient/newappoinments" },
    // { name: "All Hospitals", icon: <LocalHospitalIcon />, path: "/dashboard/patient/allHospitals" },
  ]
  const HospitalArr = [
    { name: "Dashboard", icon: <DashboardIcon />, path: "/dashboard/hospital" },
    { name: "Add New Employee", icon: <PersonAddIcon />, path: "/dashboard/hospital/addemployee" },
    // { name: "New Appoinment", icon: <AccessTimeRoundedIcon />, path: "/dashboard/hospital/appointments" },
    { name: "All Appoinments", icon: <TouchAppRoundedIcon />, path: "/dashboard/hospital/allappointments" },
    { name: "All Employee", icon: <SupervisorAccountIcon />, path: "/dashboard/hospital/allemployee" },
  ]
  return (
    <>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >

        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {
              isPatient ?
              (patientArr.map((item, index) => (
                <ListItem button key={item.name} onClick={() => { history.push(item.path) }} className={location.pathname === item.path ? classes.active : null}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              ))) :
              (HospitalArr.map((item, index) => (
                <ListItem button key={item.name} onClick={() => { history.push(item.path) }} className={location.pathname === item.path ? classes.active : null}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              )))
              }
          </List>
          <Divider />
          {/* <List>
              {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List> */}
        </div>
      </Drawer>
    </>
  )
}

export default SideBar
