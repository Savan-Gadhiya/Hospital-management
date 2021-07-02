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
  hospitalName: "",
  time: "",
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
      setPatientData(response.data);
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
      setValues({ ...values, [name]: value, hospitalId: e.target.id });
    } else {
      setValues({ ...values, [name]: value });
    }
    validate({ [name]: value });
  };

  const convrtToDefaultInputValue = (value) => {
    if (value) {
      return {
        target: {
          name: "hospitalName",
          value: `${value.name}, ${value.address.city}, ${value.address.pincode}`,
          id: value._id,
        },
      };
    }
  };

  const validate = (fieldValue = values) => {
    const temp = { ...errors };
    if ("hospitalName" in fieldValue)
      temp.hospitalName = fieldValue.hospitalName ? "" : "Hospital name is requied";
    if ("time" in fieldValue)
      temp.time =
        new Date(fieldValue.time) > new Date()
          ? ""
          : "Invalid Time Past value are not valid";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError({ error: false, errorMsg: "" });
    try {
      if (validate()) {
        console.log("Form submited");
        const appointments = {
          appointments: patientData.appointments.concat(values),
        };
        console.log("db = ", patientData.appointments, "new = ", appointments);

        const response = await fetch(`/api/patient/${patientData._id}`, {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(appointments),
        });

        console.log("appontments = ", appointments);
        const data = await response.json();
        console.log(data);
        if (response.status === 200) {
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
              onChange={(e, value) => { handleInputChange(convrtToDefaultInputValue(value)); }}
              renderInput={(params) => ( <TextField {...params} label="Select a Hospital" variant="standard" {...(errors.hospitalName && { error: true, helperText: errors.hospitalName, })} />
              )}
              style={{ margin: "10px 0px" }}
            />
            <TextField
              id="datetime-local"
              label="Appointment Date and Time"
              type="datetime-local"
              // defaultValue="2017-05-24T10:30"
              value={values.time}
              margin="normal"
              name="time"
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              {...(errors.time && { error: true, helperText: errors.time })}
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
