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
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../../../AuthContext/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    boxShadow: "4px 4px 15px  grey",
    paddingTop: "8px",
    marginTop: "65px",
    borderRadius: "6px",
    zIndex: "11",
  },
  paper: {
    paddingTop: "22px",
    paddingBottom: "22px",
    paddingLeft: "5px",
    paddingRight: "5px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "rgb(255, 117, 55)",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
    zIndex: "20",
  },
  MuiButton: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "rgb(73, 134, 231)",
    "&:hover": {
      backgroundColor: "rgb(58, 105, 181)",
    },
  },
  alert: {
    marginTop: "15px",
  },
  link: {
    color: "rgb(73, 134, 231)",
    textAlign: "end",
  },
  Header: {
    color: "gray",
    marginTop: "10px",
  },
  SpinnerContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backdropFilter: "blur(2px)",
    zIndex: 1,
  },
  Spinner: {
    marginTop: "312px",
    color: "#4caf50",
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
        }, 1000);
      })
      .catch((err) => {
        setAlertText("Wrong email or password");
        setAlertShow(true);
      });
  };

  return (
    <>
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
            <Typography component="h1" variant="h5" className={classes.Header}>
              <strong>Log In</strong>
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
    </>
  );
}
