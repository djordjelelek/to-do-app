import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "white",
    boxShadow: "4px 4px 15px  grey",
    paddingTop: "8px",
    marginTop: "65px",
    borderRadius: "6px",
    zIndex: "11",
  },
  paper: {
    paddingTop: "13px",
    paddingBottom: "22px",
    paddingLeft: "5px",
    paddingRight: "5px",
    display: "flex",
    flexDirection: "column",
  },
  Header: {
    cursor: "pointer",
    fontSize: "15px",
    color: "gray",
    marginTop: "0px",
    "&:hover": {
      color: "rgb(73, 134, 231)",
    },
  },
  ToDoHeader: {
    color: "black",
    marginTop: "10px",
  },
  alert: {
    marginBottom: "10px",
    marginLeft: "auto",
    marginRight: "auto",
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
    marginTop: "180px",
    color: "#4caf50",
  },
}));

export default useStyles;
