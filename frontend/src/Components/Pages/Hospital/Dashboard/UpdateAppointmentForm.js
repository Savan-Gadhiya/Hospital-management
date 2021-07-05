import React from 'react'
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
const convertToDefaultInputValue = (name, value) => {
    // console.log(value);
    if(value){
        return {
            target: {
                name: name,
                value: value.name, // This is a name of employee
                id: value._id
            }
        }

    }
}
const UpdateAppointmentForm = ({ onChange, values, allEmployee, errors }) => {
    return (
        <div>
            <form method="post">
                <TextField
                    variant="standard"
                    label="Patient Name"
                    fullWidth
                    defaultValue={values.name}
                    InputProps={{
                        readOnly: true
                    }}
                />
                <TextField
                    variant="standard"
                    label="Patient Email"
                    margin="normal"
                    fullWidth
                    defaultValue={values.email}
                    InputProps={{
                        readOnly: true
                    }}
                />
                <Autocomplete
                    options={allEmployee}
                    getOptionLabel={(option) => option.name}
                    onChange={(e, value) => { onChange(convertToDefaultInputValue("staffName", value)) }}
                    renderInput={(params) => <TextField {...params} label="Appointment Taken By" variant="standard" margin="normal" fullWidth {...(errors.staffName && { error: true, helperText: errors.staffName })} />}
                />
                <TextField
                    variant="standard"
                    label="Medical Status"
                    fullWidth
                    name="medicalStatus"
                    value={values.medicalStatus}
                    onChange={onChange}
                    margin="normal"
                    multiline
                    {...(errors.medicalStatus && { error: true, helperText: errors.medicalStatus })}
                />
                <TextField
                    variant="standard"
                    label="Remarks"
                    fullWidth
                    name="remarks"
                    value={values.remarks}
                    onChange={onChange}
                    margin="normal"
                    multiline
                />
                <TextField
                    variant="standard"
                    label="Medicines"
                    fullWidth
                    margin="normal"
                    name="medicine"
                    value={values.medicine}
                    onChange={onChange}
                    placeholder="Separate each medicine by comma"
                />
            </form>
        </div>
    )
}

export default UpdateAppointmentForm
