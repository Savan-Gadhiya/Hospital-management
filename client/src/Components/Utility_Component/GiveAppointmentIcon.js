import React from 'react'
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import { green, red, yellow } from '@material-ui/core/colors';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { Tooltip } from '@material-ui/core';
const GiveAppointmentIcon = (appointmentValue) => {
    if (appointmentValue === "open") return (
        <Tooltip title="Appointment is open">
            <HelpOutlineIcon style={{ color: yellow[800] }} />
        </Tooltip>
    );
    else if (appointmentValue === "notVisited") return (
        <Tooltip title="Not Visited">
            <HighlightOffIcon style={{ color: red[500] }} />
        </Tooltip >
    );
    else if (appointmentValue === "close") return (
        <Tooltip title="Appointment is completed">
            <CheckCircleOutlinedIcon style={{ color: green[500] }} />
        </Tooltip >
    );
}

export default GiveAppointmentIcon
