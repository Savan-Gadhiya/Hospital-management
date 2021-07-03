import React, { useEffect, useState } from 'react'
import { Typography, Container, Paper, Table, TableRow, TableCell, TableBody, makeStyles, TablePagination } from '@material-ui/core';
import { getPatientData } from '../../../Utility_Component/Utility functions';
import THead from '../../../Utility_Component/TableHead';

const useStyle = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    "& thead th": {
      fontWeight: "600",
      // color: theme.palette.primary.main,
      backgroundColor: "#d5d9f0"
      // color: theme.palette.primary.main,
      // background: theme.palette.primary.light
    },
    "& tbody td": {
      fontWeight: "400",
    },
    "& tbody tr:hover": {
      backgroundColor: "#f2f4fb"
    }
  }
}))

const Appointments = () => {
  const [patientData, setPatientData] = useState({});
  const classes = useStyle();

  // for pagination
  const pagesOption = [5, 10, 25, 50];
  const [page, setPage] = useState(0);
  const [rowsPerPages, setRowsPerPages] = useState(pagesOption[page]);

  const fetchPatientData = async () => {
    const response = await getPatientData();
    // console.log(response.data);
    if (response.status === 200) {
      const appointmentsRev = response.data.appointments.reverse();
      setPatientData({ ...response.data, appointments: appointmentsRev });
    }

  }
  useEffect(() => {
    fetchPatientData();
    // fetchAppointments();
  }, []);


  const TableHeadCell = [
    { id: "sr.no", label: "Sr.No" },
    { id: "hospitalName", label: "Hospital Name" },
    { id: "hospitalEmail", label: "Hospital Email" },
    { id: "hospitalPhone", label: "Hospital Phone" },
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
    return (patientData.appointments.slice(page * rowsPerPages, (page + 1) * rowsPerPages))
  }

  return (
    <>
      <Container>
        <Paper style={{ margin: '10px', padding: "10px" }}>
          <Typography variant="h3" component="h1">Your Appointments</Typography>

          {
            patientData.appointments !== undefined && patientData.appointments.length ?
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
                            <TableCell>{new Date(ele.time).toLocaleString()}</TableCell>
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
