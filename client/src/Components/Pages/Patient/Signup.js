import React, { useState } from 'react'
import { Container, Paper, Typography, TextField, Grid, Button, RadioGroup, Radio, FormControl, FormControlLabel, FormLabel } from '@material-ui/core';
import useDefaultStyle from '../../Form_Component/FormStyle'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ShowAlert from '../../Form_Component/ShowAlert';

const initalValue = {
  name: "",
  email: "",
  password: "",
  cpassword: "",
  phone: "",
  gender: "male",
  dob: new Date(),
  address: {
    address1: "",
    address2: "",
    city: "",
    pincode: "",
    state: "",
    country: "",
  },
}

const Signup = () => {
  const DefaultClasses = useDefaultStyle();

  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false); // For chack submit status and diaplay alert
  const [isError, setIsError] = useState({ error: false, errorMsg: "" }); // For chack submit status and diaplay alert
  const [values, setValues] = useState(initalValue);

  // for handaling input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    validate({ [name]: value });
  };

  // for handle Address Change
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, address: { ...values.address, [name]: value } });
    validateAddress({ [name]: value });
    setErrors({ ...errors, ...temp });
  };

  // Convert date to a event params
  const convertDateToDefEventPara = (name, value) => ({
    target: {
      name: name,
      value: value
    }
  })

  const temp = { ...errors };
  // Validdate Address
  const validateAddress = (fieldValue = values.address) => {
    if ("address1" in fieldValue)
      temp.address1 = fieldValue.address1 ? "" : "Address is required";
    if ("city" in fieldValue)
      temp.city = fieldValue.city ? "" : "City is required";
    if ("pincode" in fieldValue)
      temp.pincode = fieldValue.pincode.length === 6 ? "" : "pincode must be of 6 digits";
    if ("state" in fieldValue)
      temp.state = fieldValue.state ? "" : "state is required";
    if ("country" in fieldValue)
      temp.country = fieldValue.country ? "" : "country is required";
    setErrors({ ...errors, ...temp })
  }

  // Validation in Form
  const validate = (fieldValue = values) => {
    if ("name" in fieldValue)
      temp.name = fieldValue.name ? "" : "This field is requird"
    if ("email" in fieldValue)
      temp.email = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}/.test(fieldValue.email) ? "" : "Email address is not valid"
    if ("password" in fieldValue)
      temp.password = fieldValue.password.length >= 8 ? "" : "Password is minimum 8 charector long"
    if ("cpassword" in fieldValue)
      temp.cpassword = (values.password === fieldValue.cpassword && fieldValue.cpassword) ? "" : "Password and confirm password are must be same"
    if ("phone" in fieldValue)
      temp.phone = fieldValue.phone.length === 10 ? "" : "Phone number is exact 10 digits"
    if ("address" in fieldValue)
      validateAddress(fieldValue.address);
    if ("dob" in fieldValue)
      temp.dob = fieldValue.dob < new Date() ? "" : "Invalid Date of Birth"
    setErrors({ ...temp });


    if (fieldValue === values) {
      return Object.values(temp).every((val) => val === "");
    }
  }

  // Reset Form
  const resetForm = (e = null) => {
    if (e)
      e.preventDefault();
    console.log("Restfrom called");
    setValues(initalValue);
    setErrors({});
  }

  // Submit form
  const SubmitForm = async (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    setIsSuccess(false);
    setIsError({ error: false, errorMsg: "" });
    if (validate()) {
      try {
        console.log("sending requsest....");
        // Send a request to save data
        const response = await fetch("/api/patient/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(values)
        });
        const Data = await response.json();
        console.log("Data = ", Data);
        if (response.status === 201) {
          setIsSuccess(true);
          setValues(initalValue);
        }
        else
          setIsError({ error: true, errorMsg: Data.error });
      }
      catch (err) {
        console.log("Error while sening data:  ", err);
      }
    }
    else {
      setIsError({ error: true, errorMsg: "Please Fill all the field properly" });
    }
  };


  return (
    <>
      <Container className={DefaultClasses.container}>
        <Paper className={DefaultClasses.paperStyle}>
          {/* Alert */}
          {
            isSuccess && (<ShowAlert title="Success" description="Your account created successfully" />)
          }
          {
            isError.error && (<ShowAlert title="Error" description={isError.errorMsg.replace("Error: ", "")} severity="error" />)
          }
          <Typography variant="h3" component="h1" className={DefaultClasses.heading}>Signup</Typography>
          <form method="POST" className={DefaultClasses.form} onSubmit={SubmitForm} >
            <TextField
              variant="standard"
              name="name"
              label="Full Name"
              margin="normal"
              value={values.name}
              onChange={handleInputChange}
              {...(errors.name && { error: true, helperText: errors.name })}
              fullWidth
            />
            {/* Email */}
            <TextField
              variant="standard"
              name="email"
              label="Email Address"
              type="email"
              margin="normal"
              value={values.email}
              onChange={handleInputChange}
              {...(errors.email && { error: true, helperText: errors.email })}
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
              {...(errors.password && { error: true, helperText: errors.password })}
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
              {...(errors.cpassword && { error: true, helperText: errors.cpassword })}
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
              {...(errors.phone && { error: true, helperText: errors.phone })}
              fullWidth
            />
            {/* Gender */}
            <FormControl component="fieldset" margin="normal">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup aria-label="gender" name="gender" row value={values.gender} onChange={handleInputChange} >
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>
            {/* DOB */}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                variant="inline"
                format="dd MMMM yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={values.dob}
                onChange={(date) => { handleInputChange(convertDateToDefEventPara("dob", date)); }}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                {...(errors.dob && { error: true, helperText: errors.dob })}
                fullWidth
              />
            </MuiPickersUtilsProvider>
            {/* Address line 1 */}
            <TextField
              variant="standard"
              name="address1"
              label="Address Line 1"
              margin="normal"
              value={values.address.address1}
              onChange={handleAddressChange}
              {...(errors.address1 && { error: true, helperText: errors.address1 })}
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
              {...(errors.address2 && { error: true, helperText: errors.address2 })}
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
                  {...(errors.city && { error: true, helperText: errors.city })}

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
                  {...(errors.state && { error: true, helperText: errors.state })}
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
                  {...(errors.country && { error: true, helperText: errors.phone })}

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
                  {...(errors.pincode && { error: true, helperText: errors.pincode })}

                  fullWidth
                />
              </Grid>
            </Grid>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={DefaultClasses.btn}
            >
              Signup Now
            </Button>
            <Button type="reset" variant="contained" className={DefaultClasses.btn} onClick={resetForm}>
              Reset
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  )
}

export default Signup
