import React from "react";
import classes from "./Main.module.css";
import { Switch, Route, Redirect } from "react-router-dom";
import ToDo from "./ToDo/ToDo";
import LogIn from "./Authentification/LogIn/LogIn";
import SignUp from "./Authentification/SignUp/SignUp";
import ResetPassword from "./Authentification/ResetPassword/ResetPassword";
import { useAuth } from "../AuthContext/AuthContext";
import Container from "@material-ui/core/Container";

const Main = () => {
  const { logIn } = useAuth();
  return (
    <Container component="main" className={classes.main} maxWidth="sm">
      {logIn ? (
        <Switch>
          <Route path="/home" exact component={ToDo} />
          <Route path="/login" component={LogIn} />
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
