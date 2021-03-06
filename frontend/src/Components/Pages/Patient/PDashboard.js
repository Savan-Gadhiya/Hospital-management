import React, { useEffect, useState } from 'react'
import { Switch, Route,Redirect } from 'react-router';
import DashboardMain from './Dashboard/DashboardMain';
import NewAppoinment from './Dashboard/NewAppoinment';
import { getPatientData } from '../../Utility_Component/Utility functions';
import PAppointments from './Dashboard/PAppointments';
import PAllAppointment from './Dashboard/PAllAppointment';
const PDashboard = () => {
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [patientData, setPatientData] = useState({});

    const fetchData = async () => {
        const response = await getPatientData(); // In getPatient i Make a response object that contain response status and a data
        if (response.status === 200) {
            setIsLoggedin(true);
            setPatientData(response.data);
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <>
            {
                isLoggedin ?
                    (<Switch>
                        <Route exact path="/dashboard/patient"> <DashboardMain /> </Route>
                        <Route path="/dashboard/patient/appointments"> <PAllAppointment /> </Route>
                        <Route path="/dashboard/patient/newappoinments"> <NewAppoinment /> </Route>
                        <Redirect to='/dashboard/patient' />
                    </Switch>
                    ) : <h1>You need to login for access this page</h1>

            }
        </>
    )
}

export default PDashboard;
