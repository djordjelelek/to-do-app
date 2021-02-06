import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  footer: {
    paddingTop: "8px",
    marginTop: "auto",
    backgroundColor: "white",
  },
  Icons: {
    marginBottom: "-10px",
  },
  Owner: {
    fontSize: "12px",
    marginBottom: "6px",
    color: "rgba(0, 0, 0, 0.54)",
  },
  LinedIn: {
    marginRight: "3px",
  },
  GitHub: {
    marginLeft: "3px",
  },
}));

const Footer = () => {
  const classes = useStyles();
  const a = (
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

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm" className={classes.Container}>
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
      </Container>
    </footer>
  );
};
export default Footer;
