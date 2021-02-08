import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  MuiCheckbox: {
    colorPrimary: "white",
    colorSecondary: "black",
    color: "black",
    backgroundColor: "black",
  },
  paper: {
    backgroundColor: "white",
    marginLeft: "-11px",
    marginRight: "-11px",
    marginBottom: "-11px",
  },
  Buttons: {
    cursor: "pointer",
    border: "none",
    backgroundColor: "white",
    fontSize: "15px",
    color: "gray",
  },
  Header: {
    colorPrimary: "gray",
  },
  ListText: {
    marginRight: "50px",
    marginLeft: "-15px",
    textAlign: "justify",
  },
  MuiButton: {
    marginRight: "6px",
    backgroundColor: "rgb(73, 134, 231)",
    "&:hover": {
      backgroundColor: "rgb(58, 105, 181)",
    },
  },
  MuiButtonCancel: {
    marginLeft: "6px",
    backgroundColor: "rgb(255, 117, 55)",
    "&:hover": {
      backgroundColor: "#cc5e2d",
    },
  },
}));

export default useStyles;
