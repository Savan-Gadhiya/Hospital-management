import React from 'react'
import SideBar from './Utility_Component/SideBar'
import Layout from './Utility_Component/Layout'
import { makeStyles } from '@material-ui/core';
import { Switch, Route } from 'react-router';
const Create = () => {
    return (
        <h1>Create Component</h1>
    )
}


const Test = () => {
    return (
        <>
            
                <Layout>
                    <Create />
                    {/* <Switch>
                    <Route exact path="/test/create" component={() => {return (<Create />)}} />
                </Switch> */}
                </Layout>
        </>
    )
}

export default Test
