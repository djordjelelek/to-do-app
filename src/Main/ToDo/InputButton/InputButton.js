import React from "react";
import { Button, FormLabel, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  MuiButton: {
    backgroundColor: "rgb(73, 134, 231)",
    "&:hover": {
      backgroundColor: "rgb(58, 105, 181)",
    },
  },
}));

function InputButton(props) {
  const classes = useStyles();
  return (
    <form action="">
      <FormLabel>
        <TextField
          id="standard-full-width"
          label="Write here"
          style={{ marginLeft: "-2px", marginBottom: "12px", width: "97%" }}
          type="text"
          // fullWidth
          value={props.input}
          onChange={(event) => props.setInput(() => event.target.value)}
        />
        <Button
          disabled={!props.input}
          variant="contained"
          color="primary"
          type="submit"
          onClick={props.postToDos}
          className={classes.MuiButton}
        >
          ADD
        </Button>
      </FormLabel>
    </form>
  );
}

export default InputButton;
