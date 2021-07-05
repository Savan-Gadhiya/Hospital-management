import { makeStyles } from "@material-ui/core";

const useTableStyle = makeStyles((theme) => ({
    table: {
        marginTop: theme.spacing(3),
        "& thead th": {
            fontWeight: "600",
            backgroundColor: "#d5d9f0"
        },
        "& tbody td": {
            fontWeight: "400",
        },
        "& tbody tr:hover": {
            backgroundColor: "#f2f4fb"
        }
    }
}));

export default useTableStyle;