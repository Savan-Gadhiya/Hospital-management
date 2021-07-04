import React, { useEffect, useState } from 'react'
import { Typography, Container, Paper, Table, TableRow, TableCell, TableBody, makeStyles, TablePagination } from '@material-ui/core';
import { getPatientData } from '../../../Utility_Component/Utility functions';
import THead from '../../../Utility_Component/TableHead';
import useTableStyle from '../../../Utility_Component/TableStyle';

const Appointments = () => {
  const [patientData, setPatientData] = useState({});
  const [appointmentData, setAppointmentData] = useState([]);
  const classes = useTableStyle();

  // for pagination
  const pagesOption = [5, 10, 25, 50];
  const [page, setPage] = useState(0);
  const [rowsPerPages, setRowsPerPages] = useState(pagesOption[page]);

  const fetchPatientData = async () => {
    const response = await getPatientData();
    // console.log(response.data);
    if (response.status === 200) {
      setPatientData(response.data);
    }

  }

  const fetchAppointments = async () => {
    const response = await fetch("/api/appointment/getforpatient",{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "applicaiotn/json"
      },
      credentials: "include"
    });
    const data = await response.json();
    if(response.status === 200){
      setAppointmentData(data);
    }else{
      setAppointmentData([]);
    }
  }


  useEffect(() => {
    fetchPatientData();
    fetchAppointments();
  }, []);


  const TableHeadCell = [
    { id: "sr.no", label: "Sr.No" },
    { id: "hospitalName", label: "Hospital Name" },
    { id: "hospitalEmail", label: "Hospital Email" },
    { id: "hospitalPhone", label: "Hospital Phone" },
    { id: "appointmentStatus", label: "Appointment Status" },
    { id: "time", label: "Time" }
  ]

  // For Pagination
  const handleChnagePage = (e, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowParPage = (e) => {
    const { name, value } = e.target;
    setRowsPerPages(value);
    setPage(0);
  }

  const recordAfterPagination = () => {
    return (appointmentData.slice(page * rowsPerPages, (page + 1) * rowsPerPages))
  }

  return (
    <>
      <Container>
        <Paper style={{ margin: '10px', padding: "10px" }}>
          <Typography variant="h3" component="h1">Your Appointments</Typography>

          {
            appointmentData !== undefined && appointmentData.length ?
              (
                <>
                  <Table className={classes.table}>
                    <THead TableHeadCell={TableHeadCell} />
                    <TableBody>
                      {
                        recordAfterPagination().map((ele, idx) => (
                          <TableRow key={ele._id}>
                            <TableCell>{idx + 1}</TableCell>
                            <TableCell>{ele.hospitalName}</TableCell>
                            <TableCell>{ele.hospitalEmail}</TableCell>
                            <TableCell>{ele.hospitalPhone}</TableCell>
                            <TableCell>{ele.appointmentStatus}</TableCell>
                            <TableCell>{new Date(ele.appointmentTime).toLocaleString()}</TableCell>
                          </TableRow>
                        ))
                      }
                    </TableBody>
                  </Table>
                  <TablePagination
                    component="div"
                    page={page}
                    rowsPerPageOptions={pagesOption}
                    rowsPerPage={rowsPerPages}
                    count={patientData.appointments.length}
                    onChangeRowsPerPage={handleChangeRowParPage}
                    onChangePage={handleChnagePage}
                  />
                </>
              ) : "You not Book any appointment"
          }
        </Paper>
      </Container>

    </>
  )
}

export default Appointments;
