import React from 'react'
import { Container } from '@material-ui/core';
import { Switch,Route } from 'react-router';
import AddEmployee from '../Staff/AddStaff';
const HDashBoard = () => {
  const Appointment = () => {
    return (
      <h1>Appintmentds</h1>
    )
  }
  const AllEmp = () => {
    return (
      <h1>All emps</h1>
    )
  }
  return (
    <>
      <Container>
        {
          // isLoggedin ?
            (<Switch>
              <Route exact path="/dashboard/hospital">{ () => <h1>Hospital DashBoard 234</h1> }</Route>
              <Route path="/dashboard/hospital/appoinments"> <Appointment /> </Route>
              <Route path="/dashboard/hospital/addemployee"> <AddEmployee /> </Route>
              <Route path="/dashboard/hospital/allemployee"> <AllEmp />  </Route>
            </Switch> 
            ) //: <h1>You need to login for access this page</h1>
        }
      </Container>
    </>
  )
}

export default HDashBoard
