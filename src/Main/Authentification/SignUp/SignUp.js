import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  CircularProgress,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./signUpUseStyles";

export default function SignUp() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [alertShow, setAlertShow] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== passwordRepeat) {
      setAlertText("Passwords don't match");
      setAlertShow(true);
    } else if (password.length < 8) {
      setAlertText("Password is shorter than 8 characters");
      setAlertShow(true);
    } else {
      axios
        .post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA2Snqe5VEf9yDAQkd96tYVst2uTBfmWTA",
          {
            email: email,
            password: password,
            returnSecureToken: true,
          }
        )
        .then(() => {
          setLoading(true);
          setTimeout(() => {
            history.push("/login");
          }, 300);
        })
        .catch(() => {
          setAlertText("You already have an account. Please log in.");
          setAlertShow(true);
        });
    }
  };
  return (
    <>
      {loading ? (
        <div className={classes.SpinnerContainer}>
          <CircularProgress className={classes.Spinner} />
        </div>
      ) : (
        false
      )}
      <Container component="main" maxWidth="xs" className={classes.root}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" className={classes.SignUp}>
            <strong>Sign Up</strong>
          </Typography>
          {alertShow && loading === false ? (
            <Alert className={classes.alert} variant="filled" severity="error">
              {alertText}
            </Alert>
          ) : loading ? (
            <Alert
              variant="filled"
              severity="success"
              className={classes.alert}
            >
              You Have Successfully Sign up
            </Alert>
          ) : null}
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  type="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(event) => setEmail(event.target.value)}
                  className={classes.inputFields}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(event) => setPassword(event.target.value)}
                  className={classes.MuiGrid}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="retype-password"
                  label="Retype Password"
                  type="password"
                  id="retype-password"
                  autoComplete="current-password"
                  onChange={(event) => setPasswordRepeat(event.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.MuiButton}
            >
              Sign Up
            </Button>
            <Grid container justify="center">
              <Grid item xs>
                <Link href="/login" variant="body2" className={classes.link}>
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
}
