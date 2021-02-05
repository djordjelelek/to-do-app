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
        {logIn ? (
          <>
            <Route path="/home" exact component={ToDo} />
            <Redirect from="/" exact to="/home" />
            <Redirect from="/signup" to="/home" />
            <Redirect from="/login" to="/home" />
            <Redirect from="/reset-password" to="/home" />
          </>
        ) : (
          <>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={LogIn} />
            <Route path="/reset-password" component={ResetPassword} />
            <Redirect from="/home" exact to="/login" />
            <Redirect from="/" exact to="/login" />
          </>
        )}
      </Switch>
    </main>
  );
};

export default Main;
