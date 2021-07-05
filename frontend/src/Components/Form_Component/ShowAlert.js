import React from 'react'
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { Collapse, IconButton, makeStyles, } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from 'react-router-dom';

const useStyle = makeStyles(theme => ({
    alert: {
        width: "100%",
        // marginLeft: `-${theme.spacing(2)}px`,
    },
}))

const ShowAlert = (props) => {
    const classes = useStyle();
    const { title, description, ...other } = props;
    const [open, setOpen] = React.useState(true); // For alert 
    return (
        <>
            <Collapse in={open}>
                <Alert className={classes.alert}
                    {...other}
                    action={
                        <IconButton onClick={() => { setOpen(false); }}>
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    <AlertTitle>{title}</AlertTitle>
                    {description}
                </Alert>
            </Collapse>
        </>
    )
}

export default ShowAlert;