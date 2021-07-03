import React, { useEffect, useState } from 'react'
import { Typography, Container, Paper, Table, TableRow, TableCell, TableBody, makeStyles, TablePagination } from '@material-ui/core';
import { getHospitalData } from '../../../Utility_Component/Utility functions';
import THead from '../../../Utility_Component/TableHead';
import { useHistory } from "react-router-dom";

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

const HAppointment = () => {
  const [allAppointmentData, setAllAppointmentData] = useState([]);
  const [HospitalData, setHospitalData] = useState({});
  const classes = useStyle();
  const history = useHistory();

  // for pagination
  const pagesOption = [5, 10, 25, 50];
  const [page, setPage] = useState(0);
  const [rowsPerPages, setRowsPerPages] = useState(pagesOption[page]);

  // Fetch a hospital data which is logeddin
  const fetchHospitalData = async () => {
    const response = await getHospitalData();
    if (response.status === 200) {
      const data = response.data;
      setHospitalData(data);
    }
    else {
      history.push("/dashboard/hospital");
    }
  }
  // Fetch All Patient Data who contain appointmant with a loggedin hospital
  const fetchAllAppointment = async () => {
    try {
      const response = await fetch("/api/appointment/getforhospital", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        credentials: "include"
      });
      const data = await response.json();
      if (response.status === 200) {

        setAllAppointmentData(data);

      }
      else {
        console.log(data)
        console.log("Connot get data with status code 200 ")
      }

    }
    catch (err) {
      console.log("Error in data fetching", err);
    }
  }

  useEffect(() => {
    fetchHospitalData();
    fetchAllAppointment();
  }, []);

  const TableHeadCell = [
    { id: "sr.no", label: "Sr.No" },
    { id: "name", label: "Name" },
    { id: "email", label: "Email" },
    { id: "mobile", label: "Mobile No." },
    { id: "appoitmentTime", label: "Appoitment Time" },
  ];
  let idxCounter = 0;

  // For Pagination
  const handleChnagePage = (e, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowParPage = (e) => {
    const { name, value } = e.target;
    setRowsPerPages(value);
    setPage(0);
  }

  return (
    <>
      <Container>
        <Paper style={{ margin: '10px', padding: "10px" }}>
          <Typography variant="h3" component="h1">Appointments</Typography>
          {
            allAppointmentData !== undefined && allAppointmentData.length ?
              (
                <>
                  <Table className={classes.table}>
                    <THead TableHeadCell={TableHeadCell} />
                    <TableBody>
                      {
                        allAppointmentData.map((appointment, index) => (
                          <>
                            <TableRow key={appointment._id}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{appointment.patientName}</TableCell>
                              <TableCell>{appointment.patientEmail}</TableCell>
                              <TableCell>{appointment.patientPhone}</TableCell>
                              <TableCell>{new Date(appointment.appointmentTime).toLocaleString()}</TableCell>
                              {/* <TableCell>{new Date(appointment.time).toLocaleString()}</TableCell> */}
                            </TableRow>
                          </>
                        )
                        )
                      }
                    </TableBody>
                  </Table>
                  <TablePagination
                    component="div"
                    page={page}
                    rowsPerPageOptions={pagesOption}
                    rowsPerPage={rowsPerPages}
                    count={idxCounter}
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
export default HAppointment;