import React from "react";
import { Button, FormLabel, TextField } from "@material-ui/core";

function InputButton(props) {
  return (
    <form action="">
      <FormLabel>
        <TextField
          id="standard-full-width"
          label="Write a To Do"
          style={{ marginLeft: "-2px", marginBottom: "11px", width: "97%" }}
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
        >
          ADD
        </Button>
      </FormLabel>
    </form>
  );
}

export default InputButton;
