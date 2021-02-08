import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    boxShadow: "4px 4px 15px  grey",
    paddingTop: "8px",
    marginTop: "65px",
    borderRadius: "6px",
    zIndex: "11",
  },
  paper: {
    paddingTop: "22px",
    paddingBottom: "22px",
    paddingLeft: "5px",
    paddingRight: "5px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "rgb(255, 117, 55)",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
    zIndex: "20",
  },
  MuiButton: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#4caf50",
    "&:hover": {
      backgroundColor: "rgb(54, 125, 57)",
    },
  },
  alert: {
    marginTop: "15px",
  },
  link: {
    color: "rgb(73, 134, 231)",
    textAlign: "end",
  },
  SignUp: {
    marginTop: "10px",
  },
  SpinnerContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backdropFilter: "blur(2px)",
    zIndex: 1,
  },
  Spinner: {
    marginTop: "309px",
    color: "rgb(73, 134, 231)",
  },
  inputFields: {
    zIndex: 10,
  },
}));

export default useStyles;
