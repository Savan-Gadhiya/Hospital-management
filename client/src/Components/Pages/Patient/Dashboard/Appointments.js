import React, { useEffect, useState } from 'react'
import { Typography, Container, Paper } from '@material-ui/core';
import { getPatientData } from '../../../Utility_Component/Utility functions';
const Appointments = () => {
    const [patientData, setPatientData] = useState({});

    const fetchPatientData = async () => {
        const response = await getPatientData();
        console.log(response.data);
        if (response.status === 200) {
            setPatientData(response.data);
        }

    }
    useEffect(() => {
        fetchPatientData();
    }, [])
    return (
        <>
            <Container>
                <Paper style={{ margin: '10px', padding: "10px" }}>
                    <Typography variant="h3" component="h1">Your Appointments</Typography>

                    {
                        patientData.appointments !== undefined && patientData.appointments.length?
                            (
                                <table>
                                    <thead>
                                        <th>hospital Name</th>
                                        <th>Time</th>
                                        <th>Remarks</th>
                                    </thead>
                                    <tbody>
                                        {patientData.appointments.map((appointment, index) => (
                                            <>
                                                <tr>
                                                    <td>{appointment.hospitalName}</td>
                                                    {/* <td>{appointment.hospitalId}</td>  */}
                                                    <td>{new Date(appointment.time).toLocaleString()}</td>
                                                    <td></td>
                                                </tr>
                                            </>
                                        ))
                                        }
                                    </tbody>
                                </table>
                            ) : "You not Book any appointment"
                    }
                </Paper>
            </Container>

        </>
    )
}

export default Appointments;
