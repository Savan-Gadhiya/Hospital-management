import React, { useState } from 'react'
import { Container, Paper, Typography, TextField, Button, makeStyles } from '@material-ui/core';
import useDefaultStyle from '../../Form_Component/FormStyle';
import { useHistory } from "react-router-dom";
import ShowAlert from '../../Form_Component/ShowAlert';
import NavBarState from "../../Utility_Component/NavBarState";

const useStyle = makeStyles((theme) => ({
  paperStyle: {
    width: "50%"
  },
  btn: {
    margin: `${theme.spacing(1)}px 0px`,
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,

  }
}));


const Login = () => {
  const history = useHistory();
  const DefaultClasses = useDefaultStyle();
  const classes = useStyle();
  const [values, setValues] = useState({ email: " ", password: "" });
  const [errors, setErrors] = useState({});
  const [isError, setIsError] = useState({ error: false, errorMsg: "" })
  const { isLoggedin,
    setisLoggedin,
    whoLoggein,
    setWhoLoggedin } = NavBarState();
  if (isLoggedin) {
    history.push("/");
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    validate({ [name]: value })
  }

  const validate = (fieldValue = values) => {
    const temp = { ...errors };
    if ("email" in fieldValue)
      temp.email = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}/.test(fieldValue.email) ? "" : "Email address is not valid";
    if ("password" in fieldValue)
      temp.password = fieldValue.password.length >= 8 ? "" : "Password is minimum 8 charector long";
    setErrors({ ...temp });

    if (fieldValue === values)
      return Object.values(temp).every((value) => value === "");
  }

  const SubmitLoginDetail = async (e) => {
    try {
      e.preventDefault();
      setIsError({ error: false, errorMsg: "" });
      if (validate()) {
        console.log("REquest send....");
        const response = await fetch("/api/hospital/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const data = await response.json();
        console.log(data);
        if (response.status === 200) {
          setisLoggedin(true);
          window.location.href = "/"
        }
        else {
          setIsError({ error: true, errorMsg: data.msg });
        }
      }
      else {
        console.log("Validation not fullfill");
        console.log(errors);
      }
    }
    catch (err) {
      console.log("Error in Login : ", err);
    }
  }

  return (
    <>
      <Container className={DefaultClasses.container}>
        <Paper className={`${DefaultClasses.paperStyle} ${classes.paperStyle}`}>
          {
            isError.error && (<ShowAlert title="Error" description={isError.errorMsg.replace("Error: ", "")} severity="error" />)
          }
          <Typography variant="h3" component="h1" className={DefaultClasses.heading}>Hospital Login</Typography>
          <form method="POST" className={DefaultClasses.form} onSubmit={SubmitLoginDetail}>{/* autoComplete="off" */}
            {/* Email */}
            <TextField
              type="email"
              variant="outlined"
              name="email"
              label="Hospital Email"
              margin="normal"
              value={values.email}
              // required
              onChange={handleInputChange}
              {...(errors.email && { error: true, helperText: errors.email })}
              fullWidth
            />
            {/* Password */}
            <TextField
              type="password"
              variant="outlined"
              name="password"
              label="Password"
              margin="normal"
              value={values.password}
              onChange={handleInputChange}
              {...(errors.password && { error: true, helperText: errors.password })}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.btn}
            >
              Signup Now
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  )
}

export default Login
