import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
    container: {
        //   background: `url(${HospitalImage})`,
        // background: "#efefef",
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        minHeight: "100vh",
    },
    paperStyle: {
        width: "60%",
        padding: `${theme.spacing(1)}px ${theme.spacing(3)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
        margin: `${theme.spacing(5)}px 0px`,
    },
    heading: {
        margin: `${theme.spacing(2)}px 0px`,
        textAlign: "center",
    },
    form: {
        width: "100%",
    },
    btn: {
        margin: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        // border: "4px solid black"
    },
    link: {
        color: "#1E4620"
    },
    alert: {
        margin: "5px auto"
    }
}));
export default useStyle;