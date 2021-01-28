import React, { useState, useEffect } from "react";
import classes from "./ToDo.module.css";
import { Button, FormLabel, TextField } from "@material-ui/core";
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
        console.log(response);
        if (response.data != null)
          setTodos([...todos, ...Object.values(response.data)]);
      });
  };
  useEffect(() => {
    getToDos();
    postToDos();
  }, []);
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
        <Listaaa todosList={todos} />
      </form>
    </div>
  );
};

export default ToDo;
