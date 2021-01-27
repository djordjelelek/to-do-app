import React, { useState } from "react";
import classes from "./ToDo.module.css";
import {
  Button,
  FormLabel,
  List,
  ListItem,
  TextField,
} from "@material-ui/core";

const ToDo = () => {
  const [todos, setTodos] = useState(["drink rakija", "danijela"]);
  const [input, setInput] = useState("");
  const addToDo = (event) => {
    event.preventDefault();
    setTodos([...todos, input]);
    setInput("");
  };
  const list = todos.map((el) => <ListItem>{el}</ListItem>);
  return (
    <div className={classes.ToDo}>
      <h1>Write</h1>
      <form action="">
        <FormLabel>
          <TextField
            id="standard-basic"
            label="✅ write a ToDo"
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormLabel>
        <Button
          disabled={!input}
          variant="contained"
          color="primary"
          type="submit"
          onClick={addToDo}
        >
          Add ToDo
        </Button>
        <List className={classes.root}>{list}</List>
      </form>
    </div>
  );
};

export default ToDo;
