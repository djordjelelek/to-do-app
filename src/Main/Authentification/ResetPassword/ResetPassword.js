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
import useStyles from "./resetPasswordUseStyles";

export default function ResetPassword() {
  const history = useHistory();
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
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
        setLoading(true);
        setTimeout(() => {
          history.push("/login");
        }, 300);
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
          ) : loading ? (
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
