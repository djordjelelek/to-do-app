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
  alertSucess: {
    marginTop: "15px",
    backgroundColor: "rgb(73, 134, 231)",
  },
  link: {
    color: "rgb(73, 134, 231)",
    textAlign: "end",
  },
  ResetPassword: {
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
    marginTop: "208px",
    color: "rgb(73, 134, 231)",
  },
}));

export default function ResetPassword() {
  const history = useHistory();
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [alertShowSucces, setAlertShowSucces] = useState(false);
  const [alertShowError, setAlertShowError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA2Snqe5VEf9yDAQkd96tYVst2uTBfmWTA",
        {
          requestType: "PASSWORD_RESET",
          email: email,
        }
      )
      .then((resp) => {
        setAlertShowSucces(true);
        setLoading(true);
        setTimeout(() => {
          history.push("/login");
        }, 2000);
      })
      .catch(() => {
        setAlertShowError(true);
      });
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
          <Typography
            component="h1"
            variant="h5"
            className={classes.ResetPassword}
          >
            Reset Password
          </Typography>
          {alertShowError && loading === false ? (
            <Alert className={classes.alert} variant="filled" severity="error">
              Email doesn`t exist!
            </Alert>
          ) : alertShowSucces ? (
            <Alert
              className={`${classes.alert}, ${classes.alertSucess}`}
              variant="filled"
              severity="info"
            >
              You have recive email reset password
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.MuiButton}
            >
              Send email
            </Button>
            <Grid item>
              <Link href="/signup" variant="body2" className={classes.link}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
}
