import React from 'react'
import Layout from '../Utility_Component/Layout';
import { Switch,Route } from 'react-router';
import PDashboard from './Patient/PDashboard';
import HDashboard from './Hospital/HDashBoard';  
const DashBoard = () => {
    return (
        <>
            <Layout>
                <Switch>
                    <Route path="/dashboard/patient"> <PDashboard /> </Route>
                    <Route path="/dashboard/hospital"> <HDashboard /> </Route>
                </Switch>
            </Layout>
        </>
    )
}

export default DashBoard
