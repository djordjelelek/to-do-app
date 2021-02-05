import React from "react";
import classes from "./Footer.module.css";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

const footer = () => (
  <footer className={classes.Footer}>
    <hr className={classes.Hr} />
    <div className={classes.Icons}>
      <a
        href="https://www.linkedin.com/in/djordje-lelek-3580b7193/"
        rel="noopener noreferrer"
        target="_blank"
        className={classes.LinedIn}
      >
        <LinkedInIcon fontSize="large" color="action" />
      </a>
      <a
        href="https://github.com/djordjelelek"
        className={classes.GitHub}
        rel="noopener noreferrer"
        target="_blank"
      >
        <GitHubIcon fontSize="large" color="action" />
      </a>
    </div>
    <p className={classes.Owner}>Created by: Djordje Lelek</p>
  </footer>
);
export default footer;
