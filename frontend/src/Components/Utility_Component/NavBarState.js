import { useEffect, useState } from 'react'
import { getPatientData,getHospitalData } from './Utility functions';
const NavBarState = () => {
    const [isLoggedin,setisLoggedin] = useState(false);
    const [whoLoggein,setWhoLoggedin] = useState("");
    const fetchPatientData = async () => {
        const response = await getPatientData();
        if(response.status === 200){
            setisLoggedin(true);
            setWhoLoggedin("patient");
        }
    }
    const fetchHospitalData = async () => {
        const response = await getHospitalData();
        if(response.status === 200){
            setisLoggedin(true);
            setWhoLoggedin("hospital");
        }
    }
    useEffect(() => {
        fetchHospitalData();
        fetchPatientData();
    },[])
    return {
        isLoggedin,
        setisLoggedin,
        whoLoggein,
        setWhoLoggedin
    }
}

export default NavBarState;
