import React from "react";
import classes from "./Main.module.css";

const main = () => (
  <main className={classes.main}>
    <div className={classes.headerBlockquote}>
      <h1 className={classes.headerQuote}>
        If you want to go fast, go alone, if you want to go far, go together!
      </h1>
      <div className={classes.headerCite}>- Author</div>
    </div>
    <div></div>
  </main>
);

export default main;
