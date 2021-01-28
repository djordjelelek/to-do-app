import React, { useState, useEffect } from "react";
import classes from "./ToDo.module.css";
import {
  Button,
  FormLabel,
  List,
  ListItem,
  TextField,
  Checkbox,
  ListItemText,
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import Listaaa from "./List/List";

const ToDo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState([]);
  const postToDos = () => {
    setTodos([...todos, input]);
    axios
      .post(
        "https://to-do-app-dl-default-rtdb.firebaseio.com/todos.json",
        input
      )
      .then(setInput(""));
  };
  const getToDos = () => {
    axios
      .get("https://to-do-app-dl-default-rtdb.firebaseio.com/todos.json")
      .then((response) => {
        if (response.data != null)
          setTodos([...todos, ...Object.values(response.data)]);
      });
  };
  useEffect(() => {
    getToDos();
    postToDos();
  }, []);
  const list =
    todos.length > 0
      ? todos.map((el, id) => (
          <ListItem key={id}>
            <ListItemText>{el}</ListItemText>
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              startIcon={<CloudUploadIcon />}
            >
              Upload
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </ListItem>
        ))
      : null;
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
            onChange={(event) => setInput([event.target.value])}
          />
        </FormLabel>
        <Button
          disabled={!input}
          variant="contained"
          color="primary"
          type="submit"
          onClick={postToDos}
        >
          Add ToDo
        </Button>
        {/* <List className={classes.root}>{list}</List> */}
        <Listaaa listaaa={todos} />
      </form>
    </div>
  );
};

export default ToDo;
