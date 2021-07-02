import React, { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router';
import DashbordMain from './Dashboard/DashbordMain';
import NewAppoinment from './Dashboard/NewAppoinment';
import { getPatientData } from '../../Utility_Component/Utility functions';
const PDashbord = () => {
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [patientData, setPatientData] = useState({});
    // const getPatientData = async () => {
    //     const response = await fetch("/api/patient/authenticate", {
    //         method: "GET",
    //         headers: {
    //             Accept: "application/json",
    //             "Conetent-Type": "application/json"
    //         },
    //         credentials: "include"
    //     });
    //     const data = await response.json();
    //     // console.log(data);
    //     if (response.status === 200) {
    //         setIsLoggedin(true);
    //         setPatientData(data);
    //     }
    // }
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
                        <Route exact path="/dashbord/patient"> <DashbordMain patientDetail={patientData} /> </Route>
                        <Route path="/dashbord/patient/appoinments" component={() => <h1>Appoinment</h1>} />
                        <Route path="/dashbord/patient/newappoinment"> <NewAppoinment patientDetail={patientData} /> </Route>
                    </Switch>
                    ) : <h1>You need to login for access this page</h1>

            }
        </>
    )
}

export default PDashbord;
