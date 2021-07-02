import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import SideBar from './SideBar';
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    content: {
        flexGrow: 1,
        // padding: theme.spacing(3),
    },
}));

const Layout = (props) => {
    // console.log(props);
    const classes = useStyles();

    return (
        <>
            <div className={classes.root}>
                <SideBar />
                <main className={classes.content}>
                    {/* <Toolbar /> */}
                    {props.children}
                </main>

            </div>
        </>
    );
}
export default Layout;
