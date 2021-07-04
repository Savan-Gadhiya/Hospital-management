import React, { useEffect, useState } from 'react'
import { Typography, Container, IconButton, Paper, Table, TableRow, TableCell, TableBody, makeStyles, TablePagination } from '@material-ui/core';
import { getHospitalData } from '../../../Utility_Component/Utility functions';
import THead from '../../../Utility_Component/TableHead';
import { useHistory } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import PopPopDialogBox from './AppointmentEditDialog';
import UpdateAppointmentForm from './UpdateAppointmentForm';
import useTableStyle from "../../../Utility_Component/TableStyle"
import ShowAlert from '../../../Form_Component/ShowAlert';

const InitalUpdateValue = {
  name: "",
  email: "",
  staffName: "",
  staffId: "",
  remarks: "",
  medicalStatus: "",
  medicine: "",
  medicineArr: ""
}

const HAppointment = () => {
  const [allAppointmentData, setAllAppointmentData] = useState([]);
  const [allEmployee, setAllEmployee] = useState([]);
  const [errors, setErrors] = useState({}); // This will contain errors in form
  const [HospitalData, setHospitalData] = useState({});
  const [appointmentId, setAppointmentId] = useState(""); // This will contain a value of appointment id which is clicked for edits
  const [openModal, setOpenModal] = useState(false);
  const classes = useTableStyle();
  const history = useHistory();
  const [updateAppointment, setUpdateAppointment] = useState(InitalUpdateValue);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState({ error: false, errorMsg: "" });

  // for pagination
  const pagesOption = [5, 10, 25, 50];
  const [page, setPage] = useState(0);
  const [rowsPerPages, setRowsPerPages] = useState(pagesOption[page]);

  // Fetch a hospital data which is logeddin
  const fetchHospitalData = async () => {
    const response = await getHospitalData();
    if (response.status === 200) {
      const data = response.data;
      console.log("Hospital ID = ", data);
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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ appointmentStatus: "open" })
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

  // Fetch all employee list
  const fetchEmployeeList = async () => {
    const response = await fetch(`/api/staff/getstaff`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    });
    const data = await response.json();
    setAllEmployee(data);
  }

  useEffect(() => {
    fetchHospitalData();
    fetchAllAppointment();
  }, []);
  useEffect(() => {
    fetchEmployeeList();
  }, []) // aamname call kariye to hospital id nathi(use state asychronouly work kare atle) malati aetle aam kariyu

  const TableHeadCell = [
    { id: "sr.no", label: "Sr.No" },
    { id: "name", label: "Name" },
    { id: "email", label: "Email" },
    { id: "mobile", label: "Mobile No." },
    { id: "appointmentStatus", label: "Appointment Status" },
    { id: "appoitmentTime", label: "Appoitment Time" },
    { id: "actions", label: "Actions" },
  ];

  // For Pagination
  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  }
  const handleChangeRowParPage = (e) => {
    const { name, value } = e.target;
    setRowsPerPages(value);
    setPage(0);
  }

  // Update value
  const validateUpdate = (fieldValue = updateAppointment) => {
    const temp = { ...errors };
    if ("staffName" in fieldValue)
      temp.staffName = fieldValue.staffName ? "" : "Please Fill staff Name"
    if ("medicalStatus" in fieldValue)
      temp.medicalStatus = fieldValue.medicalStatus ? "" : "Medical Status is required"
    setErrors({ ...temp });
    if (fieldValue === updateAppointment)
      return Object.values(temp).every((x) => x === "");
  }

  const handleUpdateChange = (e) => {
    if (!e) return;// jo e ma kai value nahi hoy to direct return kariyu aa combo input mathi jaya value add kari ne kadhi nakhashe tayare error aavashe
    const { name, value } = e.target;
    if (name === "medicine") {
      const medicineArr = value.split(",");
      setUpdateAppointment({ ...updateAppointment, medicine: value, medicineArr: medicineArr })
    }
    else if (name === "staffName") setUpdateAppointment({ ...updateAppointment, [name]: value, staffId: e.target.id }) // aapade jate target jebu banaviyu che "convertToDefaultInputValue" name na function ma
    else setUpdateAppointment({ ...updateAppointment, [name]: value });
    validateUpdate({ [name]: value });
  }

  const SubmitUpdatedAppointment = async () => {
    try {
      if (validateUpdate()) {
        setOpenModal(false);
        console.log(errors)
        const response = await fetch(`/api/appointment/${appointmentId}`, {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(updateAppointment)
        });
        const data = await response.json();
        if (response.status === 200) {
          // console.log(data);
          console.log(updateAppointment);
          setUpdateAppointment(InitalUpdateValue) // Clear all fields
          setErrors({});
          setIsSuccess(true);
        }
        else {
          console.log("Appointment not updated get response with other than 200 status code")
        }

      }

    }
    catch (err) {
      console.log("Error while updating appointment", err)
    }
  }

  return (
    <>
      <Container>
        {
          isSuccess && (<ShowAlert title="Success" description="Appointment updated successfully" />)
        }
        {
          isError.error && (<ShowAlert title="Error" description={isError.errorMsg.replace("Error: ", "")} severity="error" />)
        }
        {/* This will open a update appointment Pop Pop box */}
        <PopPopDialogBox open={openModal} setOpen={setOpenModal} title="Update Appointment" onClickOnSaveChange={SubmitUpdatedAppointment}>
          <UpdateAppointmentForm onChange={handleUpdateChange} values={updateAppointment} allEmployee={allEmployee} errors={errors} />
        </PopPopDialogBox>
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
                              <TableCell>{appointment.appointmentStatus}</TableCell>
                              <TableCell>{new Date(appointment.appointmentTime).toLocaleString()}</TableCell>
                              <TableCell>
                                <IconButton onClick={() => { setOpenModal(true); setAppointmentId(appointment._id); setUpdateAppointment({ ...updateAppointment, name: appointment.patientName, email: appointment.patientEmail }) }} id={index}>
                                  <EditIcon style={{ color: "#555" }} />
                                </IconButton>
                              </TableCell>
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
                    count={allAppointmentData.length}
                    onChangeRowsPerPage={handleChangeRowParPage}
                    onChangePage={handleChangePage}
                  />
                </>
              ) : <Typography component="p" style={{ margin: "20px 0px" }}>You not have any padding appointment at this time</Typography>
          }
        </Paper>
      </Container>
    </>
  )
}
export default HAppointment;