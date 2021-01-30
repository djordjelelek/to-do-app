import React from "react";
import { Button, FormLabel, TextField } from "@material-ui/core";

function InputButton(props) {
  return (
    <form action="">
      <FormLabel>
        <TextField
          id="standard-full-width"
          label="✅ write a ToDo"
          style={{ margin: 6 }}
          type="text"
          fullWidth
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
          Add ToDo
        </Button>
      </FormLabel>
    </form>
  );
}

export default InputButton;
