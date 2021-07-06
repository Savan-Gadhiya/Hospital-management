import React from 'react'
import Layout from '../Utility_Component/Layout';
import { Switch,Route } from 'react-router';
import PDashboard from './Patient/PDashboard';
import HDashboard from './Hospital/HDashBoard';  
const DashBoard = (props) => {
    console.log(props);
    return (
        <>
            <Layout>
                <Switch>
                    <Route path={`${props.match.url}/patient`} component={PDashboard} /> {/*<PDashboard /></Route>*/} 
                    <Route path={`${props.match.url}/hospital`} component={HDashboard} /> {/* <HDashboard /> </Route> */}
                </Switch>
            </Layout>
        </>
    )
}

export default DashBoard;