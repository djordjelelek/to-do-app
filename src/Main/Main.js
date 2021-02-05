import React from "react";
import classes from "./Main.module.css";
import { Switch, Route, Redirect } from "react-router-dom";
import ToDo from "./ToDo/ToDo";
import LogIn from "./Authentification/LogIn/LogIn";
import SignUp from "./Authentification/SignUp/SignUp";
import ResetPassword from "./Authentification/ResetPassword/ResetPassword";
import { useAuth } from "../AuthContext/AuthContext";

const Main = () => {
  const { logIn } = useAuth();
  return (
    <main className={classes.main}>
      <Switch>
        <Route path="/home" exact component={ToDo} />
        <Redirect from="/" exact to="/home" />
      </Switch>
      {logIn ? (
        <>
          <Redirect from="/signup" to="/home" />
          <Redirect from="/login" to="/home" />
          <Redirect from="/reset-password" to="/home" />
        </>
      ) : (
        <>
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={LogIn} />
          <Route path="/reset-password" component={ResetPassword} />
        </>
      )}
    </main>
  );
};

export default Main;
