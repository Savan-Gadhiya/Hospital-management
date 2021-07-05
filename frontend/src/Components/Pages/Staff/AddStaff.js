import React, { useEffect, useState } from 'react'
import { Container, Paper, Typography, TextField, Grid, Button, RadioGroup, Radio, FormControl, FormControlLabel, FormLabel, MenuItem } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useDefaultStyle from '../../Form_Component/FormStyle'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ShowAlert from '../../Form_Component/ShowAlert';

const convertAutoCompleteToDefaultInputValue = (name, value) => {
  console.log(value);
  // if (value) {
    return {
      target: {
        name: name,
        value: value.name, // This is a name of employee
        id: value._id
      }
    }

  // }
}

const initalValue = {
  name: "",
  email: "",
  phone: "",
  gender: "male",
  dob: new Date(),
  role: "",
  hospitalId: "",
  departmentId: "",
  departmentName: "",
  salary: "",
  address: {
    address1: "",
    address2: "",
    city: "",
    pincode: "",
    state: "",
    country: "",
  },
}

const AddEmployee = () => {

  const DefaultClasses = useDefaultStyle();

  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false); // For chack submit status and diaplay alert
  const [isError, setIsError] = useState({ error: false, errorMsg: "" }); // For chack submit status and diaplay alert
  const [values, setValues] = useState(initalValue);
  const [HospitalDetail, setHospitalDetail] = useState({});

  const FetchHospitalDetail = async () => {
    const response = await fetch("/api/hospital/getHospitalDetail", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include"
    });

    const data = await response.json();
    // console.log(data);
    if (response.status === 200) {
      setHospitalDetail(data);
      // console.log('HospitalDetail = ',data);
      setValues({ ...values, hospitalId: data._id });
    }
    else {
      setHospitalDetail({ msg: "Something want to wrong" });
    }
  }

  useEffect(() => {
    FetchHospitalDetail();
  }, [])

  // for handaling input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target);
    if (name === "departmentId") setValues({ ...values, [name]: e.target.id, departmentName: e.target.value });
    else setValues({ ...values, [name]: value });
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
      temp.email = /^[a-zA-z_.0-9]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}/.test(fieldValue.email) ? "" : "Email address is not valid"
    if ("phone" in fieldValue)
      temp.phone = fieldValue.phone.length === 10 ? "" : "Phone number is exact 10 digits"
    if ("address" in fieldValue)
      validateAddress(fieldValue.address);
    if ("dob" in fieldValue)
      temp.dob = fieldValue.dob < new Date() ? "" : "Invalid Date of Birth";
    if ("role" in fieldValue)
      temp.role = fieldValue.role ? "" : "Employee postion is requied";
    if ("departmentId" in fieldValue)
      temp.departmentId = fieldValue.departmentId ? "" : "Department name is required";
    if ("salary" in fieldValue)
      temp.salary = (fieldValue.salary >= 0 && fieldValue.salary !== "") ? "" : "Invalid Salary Value";
    setErrors({ ...temp });

    if (fieldValue === values) {
      return Object.values(temp).every((val) => val === "");
    }
  }

  // Reset Form
  const resetForm = (e = null) => {
    if (e)
      e.preventDefault();
    setValues(initalValue);
    setErrors({});
    // setIsSuccess(false);
    setIsError({ error: false, errorMsg: "" });
  }

  // Submit form
  const SubmitForm = async (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    console.log("Submit form called");
    setIsSuccess(false);
    setIsError({ error: false, errorMsg: "" });
    // console.log("ERRORS =   ",errors);
    if (validate()) {
      try {
        console.log("sending requsest....");
        // Send a request to save data
        const response = await fetch("/api/staff/addstaff", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(values)
        });
        const Data = await response.json();
        // console.log("Data = ", Data);
        if (response.status === 201) {
          setIsSuccess(true);
          resetForm();
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
    console.log("IN submit ,", errors);
  };


  return (
    <>
      <Container className={DefaultClasses.container}>
        <Paper className={DefaultClasses.paperStyle}>
          {/* Alert */}
          {
            isSuccess && (<ShowAlert title="Success" description="Employee Added Successfully" className={DefaultClasses.alert} />)
          }
          {
            isError.error && (<ShowAlert title="Error" description={isError.errorMsg.replace("Error: ", "")} severity="error" />)
          }
          <Typography variant="h3" component="h1" className={DefaultClasses.heading}>Add Employee</Typography>
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
                label="Date Of Birth"
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
            {/* Role */}
            <TextField
              variant="standard"
              name="role"
              label="Position (role)"
              margin="normal"
              value={values.role}
              onChange={handleInputChange}
              {...(errors.role && { error: true, helperText: errors.role })}
              fullWidth
            />
            {/* Department name */}
            <Autocomplete
              options={HospitalDetail.departments}
              getOptionLabel={(option) => option.name}
              onChange={(e, value) => { handleInputChange(convertAutoCompleteToDefaultInputValue("departmentId", value)) }}
              renderInput={(params) => <TextField {...params} label="Select a Depatrment Name" variant="standard" margin="normal" fullWidth {...(errors.departmentId && { error: true, helperText: errors.departmentId })} />}
            />



            {/* Salary */}
            <TextField
              variant="standard"
              name="salary"
              label="Salary"
              type="number"
              margin="normal"
              value={values.salary}
              onChange={handleInputChange}
              {...(errors.salary && { error: true, helperText: errors.salary })}
              fullWidth
            />

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

export default AddEmployee;
