import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ToDo from "./ToDo/ToDo";
import LogIn from "./Authentification/LogIn/LogIn";
import SignUp from "./Authentification/SignUp/SignUp";
import ResetPassword from "./Authentification/ResetPassword/ResetPassword";
import { useAuth } from "../AuthContext/AuthContext";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: "30px",
    // backgroundColor: "white",
    // boxShadow: "4px 4px 15px  grey",
    // paddingTop: "8px",
    // marginTop: "65px",
    // borderRadius: "6px",
    // zIndex: "11",
  },
}));
const Main = () => {
  const { logIn } = useAuth();
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="sm" className={classes.root}>
      {logIn ? (
        <Switch>
          <Route path="/home" exact component={ToDo} />
          <Redirect from="/" to="/home" />
          <Redirect from="/signup" to="/home" />
          <Redirect from="/login" to="/home" />
          <Redirect from="/reset-password" to="/home" />
        </Switch>
      ) : (
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={LogIn} />
          <Route path="/reset-password" component={ResetPassword} />
          <Redirect exact from="/home" to="/login" />
          <Redirect exact from="/" to="/login" />
        </Switch>
      )}
    </Container>
  );
};

export default Main;
