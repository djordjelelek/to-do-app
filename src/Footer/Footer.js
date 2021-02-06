import React from "react";
import classes from "./Footer.module.css";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

const footer = () => (
  <footer className={classes.Footer}>
    <div className={classes.Container}>
      <div className={classes.Icons}>
        <a
          href="https://www.linkedin.com/in/djordje-lelek-3580b7193/"
          rel="noopener noreferrer"
          target="_blank"
          className={classes.LinedIn}
        >
          <LinkedInIcon fontSize="default" color="action" />
        </a>
        <a
          href="https://github.com/djordjelelek"
          className={classes.GitHub}
          rel="noopener noreferrer"
          target="_blank"
        >
          <GitHubIcon fontSize="default" color="action" />
        </a>
      </div>
      <p className={classes.Owner}>Created by: Djordje Lelek</p>
    </div>
  </footer>
);
export default footer;
