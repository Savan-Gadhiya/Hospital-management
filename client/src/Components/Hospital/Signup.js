import React, { useState } from "react";
import {
  Container,
  makeStyles,
  TextField,
  Typography,
  Paper,
  Grid,
  Button,
} from "@material-ui/core";
import HospitalImage from "../../Images/Hospital.jpg";
const useStyle = makeStyles((theme) => ({
  container: {
    // maxWidth: "60%",
    // border: "2px solid red",
    background: `url(${HospitalImage})`,
    backgroundSize: "cover",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    minHeight: "100vh",
  },
  paperStyle: {
    width: "60%",
    padding: `${theme.spacing(1)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px ${theme.spacing(3)}px`,
    margin: `${theme.spacing(5)}px 0px`,
  },
  heading: {
    margin: `${theme.spacing(2)}px 0px`,
    textAlign: "center",
  },
  form: {
    width: "100%",
  },
  btn: {
    margin: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    // border: "4px solid black"
  },
}));

const Signup = () => {
  const classes = useStyle();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    phone: "",
    address: {
      address1: "",
      address2: "",
      city: "",
      pincode: "",
      state: "",
      country: "",
    },
    departments: [],
  });
  const [departmentStr,setDepartmentStr]  = useState("");

  // for handaling input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // for handle Address Change
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, address: { ...values.address, [name]: value } });
  };

  // for handle department
  const HandleDepartmentsChange = (e) => {
    setDepartmentStr(e.target.value)
    const { name, value } = e.target;
    const departmentArr = value.split(",");
    let DepartmentObj = [];
    departmentArr.forEach((ele, idx) => {
      if (ele !== "") DepartmentObj.push({ name: ele });
    });
    setValues({ ...values, departments: DepartmentObj });
  };

  const SubmitForm = (e) => {
    e.preventDefault();
    console.log("Form Submited");
    e.target.reset();
  };

  return (
    <div>
      <Container className={classes.container}>
        <Paper className={classes.paperStyle}>
          {/* Heading */}
          <Typography variant="h3" component="h1" className={classes.heading}>
            Hospital Signup Form
          </Typography>
          {/* Form Detail */}
          <form method="POST" className={classes.form} onSubmit={SubmitForm}>
            {/* autoComplete="off" */}
            {/* Name */}
            <TextField
              variant="standard"
              name="name"
              label="Hospital Name"
              margin="normal"
              value={values.name}
              onChange={handleInputChange}
              required
              fullWidth
            />
            {/* Email */}
            <TextField
              variant="standard"
              name="email"
              label="Hospital Email"
              type="email"
              margin="normal"
              value={values.email}
              onChange={handleInputChange}
              required
              fullWidth
            />
            {/* Password */}
            <TextField
              variant="standard"
              name="password"
              label="Password"
              type="password"
              margin="normal"
              value={values.password}
              onChange={handleInputChange}
              required
              fullWidth
            />
            {/* Confirm password */}
            <TextField
              variant="standard"
              name="cpassword"
              label="Confirm Password"
              type="password"
              margin="normal"
              value={values.cpassword}
              onChange={handleInputChange}
              required
              fullWidth
            />
            {/* Phone */}
            <TextField
              variant="standard"
              name="phone"
              label="Phone Number"
              type="number"
              margin="normal"
              value={values.phone}
              onChange={handleInputChange}
              required
              fullWidth
            />
            {/* Address line 1 */}
            <TextField
              variant="standard"
              name="address1"
              label="Address Line 1"
              margin="normal"
              value={values.address.address1}
              onChange={handleAddressChange}
              required
              fullWidth
            />
            {/* Address line 2 */}
            <TextField
              variant="standard"
              name="address2"
              label="Address Line 2"
              margin="normal"
              value={values.address.address2}
              onChange={handleAddressChange}
              required
              fullWidth
            />

            <Grid container spacing={3}>
              <Grid item md={6}>
                {/* City */}
                <TextField
                  variant="standard"
                  name="city"
                  label="City"
                  margin="normal"
                  value={values.address.city}
                  onChange={handleAddressChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item md={6}>
                {/* State */}
                <TextField
                  variant="standard"
                  name="state"
                  label="State"
                  margin="normal"
                  value={values.address.state}
                  onChange={handleAddressChange}
                  required
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item md={6}>
                {/* Country */}
                <TextField
                  variant="standard"
                  name="country"
                  label="Country"
                  margin="normal"
                  value={values.address.country}
                  onChange={handleAddressChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item md={6}>
                {/* Pincode */}
                <TextField
                  variant="standard"
                  name="pincode"
                  label="Pincode"
                  type="number"
                  margin="normal"
                  value={values.address.pincode}
                  onChange={handleAddressChange}
                  required
                  fullWidth
                />
              </Grid>
            </Grid>
            {/* Department */}
            <TextField
              variant="standard"
              name="departmentStr"
              label="Departments Name"
              placeholder="If Multiple Department add them sepreted by comma(,)"
              onChange={HandleDepartmentsChange}
              value={departmentStr}
              required
              fullWidth
              margin="normal"
            />
            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.btn}
            >
              Signup Now
            </Button>
            <Button type="submit" variant="contained" className={classes.btn}>
              Reset
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Signup;
