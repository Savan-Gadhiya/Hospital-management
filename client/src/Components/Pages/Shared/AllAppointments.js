import React, { useEffect, useState } from 'react'
import { Typography, Container, IconButton, Paper, Table, TableRow, TableCell, TableBody, makeStyles, TablePagination } from '@material-ui/core';
import { getHospitalData } from '../../Utility_Component/Utility functions';
import THead from '../../Utility_Component/TableHead';
import { useHistory } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import useTableStyle from '../../Utility_Component/TableStyle';
import GiveAppointmentIcon from '../../Utility_Component/GiveAppointmentIcon';


const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: "10px"
  }
}))


const AllAppointments = ({fetchURL,TableHeadCell,renderTableBody}) => {
  const [allAppointmentData, setAllAppointmentData] = useState([]);
  const defaultClasses = useTableStyle();
  const classes = useStyles();
  const history = useHistory();
  // for pagination
  const pagesOption = [5, 10, 25, 50];
  const [page, setPage] = useState(0);
  const [rowsPerPages, setRowsPerPages] = useState(pagesOption[page]);

 

  // Fetch All Patient Data who contain appointmant with a loggedin hospital
  const fetchAllAppointment = async () => {
    try {
      const response = await fetch(fetchURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        credentials: "include",
        // body: JSON.stringify({ appointmentStatus: "open" })
      });
      const data = await response.json();
      if (response.status === 200) {
        setAllAppointmentData(data);
      }
      else {
        // console.log(data)
        console.log("Connot get data with status code 200 ")
      }

    }
    catch (err) {
      console.log("Error in data fetching", err);
    }
  }

  useEffect(() => {
    fetchAllAppointment();
  }, []);

  // For Pagination
  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  }
  const handleChangeRowParPage = (e) => {
    const { name, value } = e.target;
    setRowsPerPages(value);
    setPage(0);
  }
  const recordAfterPagination = () => {
    console.log(allAppointmentData.slice(page * rowsPerPages, (page + 1) * rowsPerPages))
    return (allAppointmentData.slice(page * rowsPerPages, (page + 1) * rowsPerPages))
  }

 
  
  return (
    <>
      <Container style={{ padding: "20px" }} classes={{ root: classes.root }}>
        <Paper style={{ margin: '10px auto', padding: "10px" }} >

          <Typography variant="h3" component="h1">All Appointments</Typography>
          {
            allAppointmentData !== undefined && allAppointmentData.length ?
              (
                <>
                  <Table className={defaultClasses.table}>
                    <THead TableHeadCell={TableHeadCell} />
                    <TableBody>
                      {renderTableBody(recordAfterPagination())}
                        {/* recordAfterPagination().map((appointment, index) => (
                          <>
                            <TableRow key={appointment._id}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{appointment.patientName} <br /> {appointment.patientEmail} <br />{appointment.patientPhone}</TableCell>
                              {/* <TableCell>{appointment.appointmentStatus}</TableCell> * /}
                              {
                                appointment.appointmentStatus === "close" ?
                                  (
                                    <>
                                      <TableCell>{appointment.medicalStatus}</TableCell>
                                      <TableCell>{appointment.remarks}</TableCell>
                                      <TableCell>{appointment.staffName}</TableCell>
                                      <TableCell style={{paddingLeft: "5px"}}>
                                        <ul>
                                          {
                                          appointment.medicine.map((ele, idx) => {
                                              return ele ? <li key={idx}>{ele}</li> : "-"
                                            })
                                          }
                                        </ul>
                                      </TableCell>
                                    </>
                                  )
                                  :
                                  (
                                    <>
                                      <TableCell> - </TableCell>
                                      <TableCell> - </TableCell>
                                      <TableCell> - </TableCell>
                                      <TableCell> - </TableCell>
                                    </>
                                  )
                              } 
                              
                            </TableRow>
                          </>
                        )
                        )*/}
                    </TableBody>
                  </Table>
                  <TablePagination
                    component="div"
                    page={page}
                    rowsPerPageOptions={pagesOption}
                    rowsPerPage={rowsPerPages}
                    count={allAppointmentData.length}
                    onChangeRowsPerPage={handleChangeRowParPage}
                    onChangePage={handleChangePage}
                  />
                </>
              ) : "You not Book any appointment"
          }
        </Paper>
      </Container>
    </>
  )
}

export default AllAppointments