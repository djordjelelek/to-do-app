import React from "react";
import classes from "./Header.module.css";

const Header = () => (
  <header className={classes.header}>
    <div className={classes.headerBlockquote}>
      <h1 className={classes.headerQuote}>
        If you want to go fast, go alone, if you want to go far, go together!
      </h1>
      <div className={classes.headerCite}>- Author</div>
    </div>
  </header>
);

export default Header;
