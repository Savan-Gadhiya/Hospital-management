import React, { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router';
import DashbordMain from './Dashboard/DashbordMain';
import NewAppoinment from './Dashboard/NewAppoinment';
import { getPatientData } from '../../Utility_Component/Utility functions';
import Appointments from './Dashboard/Appointments';
const PDashbord = () => {
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
                        <Route exact path="/dashbord/patient"> <DashbordMain /> </Route>
                        <Route path="/dashbord/patient/appoinments"> <Appointments /> </Route>
                        <Route path="/dashbord/patient/newappoinment"> <NewAppoinment /> </Route>
                    </Switch>
                    ) : <h1>You need to login for access this page</h1>

            }
        </>
    )
}

export default PDashbord;
