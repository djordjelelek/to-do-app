import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import classesCSS from "./ResetPassword.module.css";
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
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
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
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAVl1sWfC2oInNN52Fni_otTw5qT8jP_To",
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
      <div className={classesCSS.Container}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Reset Password
            </Typography>
            {alertShowError && loading === false ? (
              <Alert
                className={classes.alert}
                variant="filled"
                severity="error"
              >
                Email doesn`t exist!
              </Alert>
            ) : alertShowSucces ? (
              <Alert variant="filled" severity="info">
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
                className={classes.submit}
              >
                Send email
              </Button>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </form>
          </div>
        </Container>
      </div>
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
