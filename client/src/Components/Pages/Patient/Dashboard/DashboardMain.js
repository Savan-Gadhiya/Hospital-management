import React from 'react'
import Card from '../../../Utility_Component/Card';
import "./PDashboard.css";
const DashboardMain = () => {
    return (
        <>
        <div className="card-container">
            <Card className="blue-bg" title="Total Appoinments" value="5" />
            <Card className="green-bg" title="Appoinment Time" value="2-05-2021 2:30" />
            <Card className="pink-bg" title="Medial Status" value="Normal" />
            
        </div>
        </>
    )
}

export default DashboardMain
