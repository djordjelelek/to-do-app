import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  CircularProgress,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Alert from "@material-ui/lab/Alert";
import useStyles from "./loginUseStyles";
import { useAuth } from "../../../AuthContext/AuthContext";

export default function LogIn() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const [alertShow, setAlertShow] = useState(false);
  const [alertText, setAlertText] = useState("");

  const { setToken } = useAuth();
  const { setLogIn } = useAuth();
  const { setUserId } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA2Snqe5VEf9yDAQkd96tYVst2uTBfmWTA",
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .then((resp) => {
        setLoading(true);
        setToken(resp.data.idToken);
        setUserId(resp.data.localId);

        localStorage.setItem("token", resp.data.idToken);
        localStorage.setItem("userId", resp.data.localId);

        setLogIn(true);
        history.push("/home");
      })
      .catch((err) => {
        setAlertText("Wrong email or password");
        setAlertShow(true);
      });
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
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" className={classes.Header}>
            <strong>Log In</strong>
          </Typography>
          {alertShow && loading === false ? (
            <Alert className={classes.alert} variant="filled" severity="error">
              {alertText}
            </Alert>
          ) : loading ? (
            <Alert
              className={classes.alert}
              variant="filled"
              severity="success"
            >
              You Have Successfully Logged in
            </Alert>
          ) : null}
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.MuiButton}
            >
              LOG IN
            </Button>
            <Grid container justify="center">
              <Grid item xs>
                <Link
                  href="/reset-password"
                  variant="body2"
                  className={classes.link}
                >
                  {"Forgot Password?"}
                </Link>
              </Grid>
              <Grid item xs>
                <Link href="/signup" variant="body2" className={classes.link}>
                  {"Create New Account"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
}
