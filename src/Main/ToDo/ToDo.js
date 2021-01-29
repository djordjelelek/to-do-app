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
import UpdateIcon from "@material-ui/icons/Update";
import axios from "axios";
import Listaaa from "./List/List";

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
          // console.log(response.data);
          const a = Object.values(response.data);
          const b = a.map((el) => Object.keys(el)[0]);
          const c = a.map((el) => Object.values(el)[0]);
          const d = Object.keys(response.data);
          // console.log(b);
          // console.log(c);
          // console.log(d);
          if (response.data != null) {
            // setTodos([a]);
            // setKeys([...todos, ...Object.keys(response.data)]);
          }
        });
    };
    getToDos();
  }, []);
  const deleteToDoHandler = (index) => {
    const link =
      "https://to-do-app-dl-default-rtdb.firebaseio.com/todos/" +
      keys[index] +
      ".json";
    axios
      .delete(link, { origin: true })
      .then(() => {
        const toDoDelete = [...todos].splice(index, 1);
        const keyDelete = [...keys].splice(index, 1);
        setTodos([...toDoDelete]);
        setKeys([...keyDelete]);
      })
      .catch((e) => {
        debugger;
      });
  };

  const list =
    todos.length > 1
      ? todos.map((el, id) => (
          <ListItem key={id}>
            <ListItemText className={classes.Text}>{el}</ListItemText>
            <UpdateIcon className={classes.ButtonUpdate} />
            <DeleteIcon
              onClick={() => deleteToDoHandler(id)}
              className={classes.ButtonDelete}
            />
          </ListItem>
        ))
      : null;
  return (
    <div className={classes.ToDo}>
      <h1>ToDo</h1>
      <form action="">
        <FormLabel>
          <TextField
            id="standard-full-width"
            label="✅ write a ToDo"
            style={{ margin: 6 }}
            type="text"
            fullWidth
            value={input}
            onChange={(event) => setInput(() => event.target.value)}
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
        {todos.length > 1 && !edit ? (
          <List className={classes.root}>{list}</List>
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
        {/* <Listaaa listaaa={todos} deleteToDo={deleteToDoHandler} /> */}
      </form>
    </div>
  );
};

export default ToDo;
