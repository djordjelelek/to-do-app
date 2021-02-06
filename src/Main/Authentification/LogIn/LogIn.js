import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import classesCSS from "./LogIn.module.css";
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
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../../../AuthContext/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    boxShadow: "4px 4px 15px  grey",
    margin: "auto",
    borderRadius: "6px",
    zIndex: "3",
  },
  paper: {
    marginTop: "22px",
    marginBottom: "22px",
    marginLeft: "5px",
    marginRight: "5px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    marginTop: "25px",
    marginBottom: "-6px",
  },
}));

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

        sessionStorage.setItem("token", resp.data.idToken);
        sessionStorage.setItem("userId", resp.data.localId);
        setTimeout(() => {
          setLogIn(true);
          history.push("/home");
        }, 2000);
      })
      .catch((err) => {
        setAlertText("Wrong email or password");
        setAlertShow(true);
      });
  };

  return (
    <>
      <>
        <Container component="main" maxWidth="xs" className={classes.root}>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            {alertShow && loading === false ? (
              <Alert
                className={classes.alert}
                variant="filled"
                severity="error"
              >
                {alertText}
              </Alert>
            ) : loading ? (
              <Alert variant="filled" severity="success">
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
                className={classes.submit}
              >
                Log in
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/reset-password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </>
      {loading ? (
        <div className={classesCSS.SpinnerContainer}>
          <CircularProgress />
        </div>
      ) : (
        false
      )}
    </>
  );
}
