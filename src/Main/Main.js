import React from "react";
import classes from "./Main.module.css";
import ToDo from "./ToDo/ToDo";

const main = () => (
  <main className={classes.main}>
    <ToDo />
    <div className={classes.headerBlockquote}>
      <h1 className={classes.headerQuote}>
        "When things go well, 'tis easy to be good; <br /> adversity shows who
        is the hero"
      </h1>
      <div className={classes.headerCite}>- P.P. Njegos</div>
    </div>
  </main>
);

export default main;
