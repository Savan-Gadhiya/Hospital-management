import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  makeStyles,
  MenuItem,
} from "@material-ui/core";
import useDefaultStyle from "../../../Form_Component/FormStyle";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ShowAlert from "../../../Form_Component/ShowAlert";
import { getPatientData } from "../../../Utility_Component/Utility functions";
import { useHistory } from "react-router";
const useStyle = makeStyles((theme) => ({
  container: {
    height: "fit-content",
    background: "#fefefe",
    // border:"3px solid red"
  },
  paperStyle: {
    width: "450px",
    padding: "25px",
  },
  alert: {
    // marginLeft: "10px"
  },
}));

const initalValue = {
  hospitalId: "",
  appointmentTime: "",
  hospitalName: "",
  hospitalEmail: "",
  hospitalPhone: "",
  patientId: "",
  patientName: "",
  patientEmail: "",
  patientPhone: "",
};

const NewAppoinment = () => {
  const history = useHistory();
  const [patientData, setPatientData] = useState();
  const [hospitalsDetail, setHospitalsDetail] = useState([]);
  const [values, setValues] = useState(initalValue);
  const [errors, setErrors] = useState({});
  const [isError, setIsError] = useState({ error: false, errorMsg: "" });

  const defaultClasses = useDefaultStyle();
  const classes = useStyle();
  const getAllHospitalData = async () => {
    const response = await fetch("/api/hospital", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setHospitalsDetail(data);
  };

  const fetchPatientData = async () => {
    const response = await getPatientData(); // In getPatient i Make a response object that contain response status and a data
    // console.log(response);
    if (response.status === 200) {
      const data = response.data;
      setPatientData(data);
      setValues({ ...values,patientId: data._id, patientName: data.name, patientEmail: data.email, patientPhone: data.phone })
      // console.log("values= ",values);
    } else {
      history.push("/dashboard/patient");
    }
  };

  useEffect(() => {
    fetchPatientData();
  }, []);
  useEffect(() => {
    getAllHospitalData();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "hospitalName") {
      setValues({ ...values, [name]: value, hospitalId: e.target.id, hospitalEmail: e.target.email, hospitalPhone: e.target.phone }); // ahi cust
    } else {
      setValues({ ...values, [name]: value });
    }
    validate({ [name]: value });
  };

  const convertToDefaultInputValue = (value) => {
    if (value) {
      return {
        target: {
          name: "hospitalName",
          value: `${value.name}, ${value.address.city}, ${value.address.pincode}`,
          id: value._id,
          email: value.email,
          phone: value.phone,
        },
      };
    }
  };

  const validate = (fieldValue = values) => {
    const temp = { ...errors };
    if ("hospitalName" in fieldValue)
      temp.hospitalName = fieldValue.hospitalName ? "" : "Hospital name is requied";
    if ("appointmentTime" in fieldValue)
      temp.appointmentTime =
        new Date(fieldValue.appointmentTime) > new Date()
          ? ""
          : "Invalid Time Past value are not valid";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  // Submit the appointment request
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError({ error: false, errorMsg: "" });
    try {
      if (validate()) {
        console.log("Form submited");
        // Send request to save appointemnt
        const response = await fetch(`/api/appointment/bookappointment`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(values),
        });
        const data = await response.json();
        console.log(data);
        // Check the response coed
        if (response.status === 201) {
          window.alert("Your Appoinment Booked Successfully");
          history.push("/dashboard/patient");
        } else {
          setIsError({ error: true, errorMsg: data.message });
        }
        setValues(initalValue);
      } else {
        setIsError({
          error: true,
          errorMsg: "Please Fill all filed properly  ",
        });
      }
    } catch (err) {
      console.log("Error in new appoinment : ", err);
      setIsError({ error: true, errorMsg: err.toString() });
    }
  };

  return (
    <>
      <Container className={`${defaultClasses.container} ${classes.container}`}>
        <Paper className={`${defaultClasses.paperStyle} ${classes.paperStyle}`}>
          {/* Showing error */}
          {isError.error && (
            <ShowAlert
              title="Error"
              description={isError.errorMsg.replace("Error: ", "")}
              severity="error"
              className={classes.alert}
            />
          )}
          <Typography
            variant="h4"
            component="h1"
            className={defaultClasses.heading}
          >
            Book a Appoinment
          </Typography>
          <form method="post" onSubmit={handleSubmit}>
            {/* Add name and email and mobile number with default patient value */}
            <Autocomplete
              id="combo-box-demo"
              options={hospitalsDetail}
              style={{ marginTop: "10px" }}
              getOptionLabel={(option) => { return `${option.name}, ${option.address.city}, ${option.address.pincode}`; }}
              onChange={(e, value) => { handleInputChange(convertToDefaultInputValue(value)); }}
              renderInput={(params) => (<TextField {...params} label="Select a Hospital" variant="standard" {...(errors.hospitalName && { error: true, helperText: errors.hospitalName, })} />
              )}
              style={{ margin: "10px 0px" }}
            />
            <TextField
              id="datetime-local"
              label="Appointment Date and Time"
              type="datetime-local"
              // defaultValue="2017-05-24T10:30"
              value={values.appointmentTime}
              margin="normal"
              name="appointmentTime"
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              {...(errors.appointmentTime && { error: true, helperText: errors.appointmentTime })}
            />
            <br />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ margin: "10px 0px" }}
            >
              Book Appoinment
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default NewAppoinment;
