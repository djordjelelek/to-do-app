import React, { useState, useEffect } from "react";
import classes from "./ToDo.module.css";
import { List, TextField } from "@material-ui/core";
import axios from "axios";
import ListItems from "./ListItems/ListItems";
import InputButton from "./InputButton/InputButton";

const ToDo = () => {
  const [input, setInput] = useState("");

  const [todos, setTodos] = useState([]);
  const [keys, setKeys] = useState([]);
  const [check, setCheck] = useState([]);

  const [edit, setEdit] = useState(false);
  const [placeholder, setPlaceholder] = useState("");

  const postToDos = (event) => {
    event.preventDefault();
    axios
      .post("https://to-do-app-dl-default-rtdb.firebaseio.com/todos.json", {
        false: input,
      })
      .then((response) => {
        setTodos([...todos, input]);
        setKeys([...keys, response.data.name]);
        setCheck([...check, false]);
        setInput("");
      });
  };
  useEffect(() => {
    const getToDos = () => {
      axios
        .get("https://to-do-app-dl-default-rtdb.firebaseio.com/todos.json")
        .then((response) => {
          if (response.data != null) {
            const responseFilter = Object.values(response.data);
            const todos = responseFilter.map((el) => Object.values(el)[0]);
            const keys = Object.keys(response.data);
            const check = responseFilter.map((el) => Object.keys(el)[0]);
            setTodos([...todos]);
            setKeys([...keys]);
            setCheck([...check]);
          }
        });
    };
    getToDos();
  }, []);
  const deleteToDoHandler = (index) => {
    axios
      .delete(
        "https://to-do-app-dl-default-rtdb.firebaseio.com/todos/" +
          keys[index] +
          ".json"
      )
      .then(() => {
        const toDoDelete = [...todos];
        toDoDelete.splice(index, 1);
        const keyDelete = [...keys];
        keyDelete.splice(index, 1);
        const checkDelete = [...check];
        checkDelete.splice(index, 1);
        setTodos([...toDoDelete]);
        setKeys([...keyDelete]);
        setCheck([...checkDelete]);
      });
  };
  // console.log(todos);
  // console.log(keys);
  // console.log(check);
  return (
    <div className={classes.ToDo}>
      <h1>ToDo</h1>
      <InputButton input={input} setInput={setInput} postToDos={postToDos} />

      {todos.length > 1 && !edit ? (
        <List className={classes.root}>{}</List>
      ) : (
        <TextField
          id="standard-full-width"
          label="Edit!"
          style={{ margin: 8 }}
          defaultValue={placeholder}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}
      {<ListItems listaaa={todos} deleteToDo={deleteToDoHandler} />}
    </div>
  );
};

export default ToDo;
