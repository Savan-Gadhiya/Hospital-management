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
  }
}));


const SideBar = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const isPatient = useState(false);
  const patientArr = [
    { name: "Dashbord", icon: <DashboardIcon />, path: "/dashbord/patient" },
    { name: "Appoinments", icon: <AccessTimeRoundedIcon />, path: "/dashbord/patient/appoinments" },
    { name: "New Appoinment", icon: <TouchAppRoundedIcon />, path: "/dashbord/patient/newappoinment" },

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
            {patientArr.map((item, index) => (
              <ListItem button key={item.name} onClick={() => { history.push(item.path)}} className={location.pathname === item.path ? classes.active : null }>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
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
