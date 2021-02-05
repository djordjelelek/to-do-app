import React from "react";
import classes from "./Main.module.css";
import { Switch, Route, Redirect } from "react-router-dom";
import ToDo from "./ToDo/ToDo";

const main = () => (
  <main className={classes.main}>
    <Switch>
      <Route path="/home" exact component={ToDo} />
      <Redirect from="/" exact to="/home" />
    </Switch>
  </main>
  // {logIn ? (
  //   <>
  //     <Redirect from="/signup" to="/home" />
  //     <Redirect from="/login" to="/home" />
  //     <Redirect from="/reset-password" to="/home" />
  //   </>
  // ) : (
  //   <>
  //     <Route path="/signup" component={SignUp} />
  //     <Route path="/login" component={LogIn} />
  //     <Route path="/reset-password" component={ResetPassword} />
  //   </>
  // )}
);

export default main;
