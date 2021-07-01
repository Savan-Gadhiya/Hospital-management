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
        padding: theme.spacing(3),
    },
}));

export default function ClippedDrawer(props) {
    console.log(props);
    const classes = useStyles();

    return (
        <>
            <div className={classes.root}>
                <SideBar />
                <main className={classes.content}>
                    <Toolbar />
                    <h1>Heafing this is a  hadind</h1>
                    {props.children}
                </main>

            </div>
        </>
    );
}
