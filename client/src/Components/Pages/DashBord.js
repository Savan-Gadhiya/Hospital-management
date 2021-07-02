import React from 'react'
import Layout from '../Utility_Component/Layout';
import { Switch,Route } from 'react-router';
import PDashbord from './Patient/PDashbord';
import HDashbord from './Hospital/HDashBord';  
const DashBord = () => {
    return (
        <>
            <Layout>
                <Switch>
                    <Route path="/dashbord/patient"> <PDashbord /> </Route>
                    <Route path="/dashbord/hospital"> <HDashbord /> </Route>
                </Switch>
            </Layout>
        </>
    )
}

export default DashBord
