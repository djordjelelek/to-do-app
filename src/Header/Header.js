import React from "react";
import classes from "./Header.module.css";

const Header = () => (
  <header className={classes.header}>
    <div className={classes.wrap}>
      {/* <span className="classes.btn-icon">
        <img
          className="icon icon-plus js-modal-init"
          src="icons/icon-plus.svg"
          alt="Add New Item"
        />
      </span> */}
      <div className={classes.headerBlockquote}>
        <h1 className={classes.headerQuote}>
          If you want to go fast, go alone, if you want to go far, go together!
        </h1>
        <div className={classes.headerCite}>- Author</div>
      </div>
    </div>
    <div className={classes.headerInner}>
      <div className={classes.wrap}>
        {/* <div className="classes.date-wrap">
          <img
            className="classes.icon"
            src="icons/icon-calendar.svg"
            alt="Calendar"
          />
          <time>14 / 11 / 2020</time>
        </div> */}
      </div>
    </div>
  </header>
);

export default Header;
