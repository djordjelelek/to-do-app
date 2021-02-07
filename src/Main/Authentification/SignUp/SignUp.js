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
import { makeStyles } from "@material-ui/core/styles";
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
    marginTop: theme.spacing(3),
    zIndex: "20",
  },
  MuiButton: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#4caf50",
    "&:hover": {
      backgroundColor: "rgb(54, 125, 57)",
    },
  },

  alert: {
    marginTop: "15px",
  },
  link: {
    color: "rgb(73, 134, 231)",
    textAlign: "end",
  },
  SignUp: {
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
    marginTop: "309px",
    color: "rgb(73, 134, 231)",
  },
  inputFields: {
    zIndex: 10,
  },
}));

export default function SignUp() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [alertShow, setAlertShow] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== passwordRepeat) {
      setAlertText("Password and Retipe Password are not the same");
      setAlertShow(true);
    } else if (password.length <= 8) {
      setAlertText("The password is shorter than 8 characters");
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
          }, 1000);
        })
        .catch(() => {
          setAlertText("You have account, already. Please log in.");
          setAlertShow(true);
        });
    }
  };
  const classes = useStyles();
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
