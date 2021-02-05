import React, { useState, useEffect } from "react";
import classesCSS from "./ToDo.module.css";
import axios from "axios";
import ListItems from "./ListItems/ListItems";
import InputButton from "./InputButton/InputButton";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    borderRadius: "15px",
    marginTop: "30px",
    marginBottom: "30px",
    zIndex: "3",
  },
}));

const ToDo = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [keys, setKeys] = useState([]);
  const [checked, setChecked] = useState([]);
  const [edit, setEdit] = useState(false);
  const classes = useStyles();
  //GET todos
  useEffect(() => {
    const getToDos = () => {
      axios
        .get("https://to-do-app-dl-default-rtdb.firebaseio.com/todos.json")
        .then((response) => {
          if (response.data != null) {
            const responseFilter = Object.values(response.data);
            const todos = responseFilter.map((el) => Object.values(el)[0]);
            const keys = Object.keys(response.data);
            const check = responseFilter
              .filter((el) => el.true)
              .map((el) => Object.values(el)[0]);
            setTodos([...todos]);
            setKeys([...keys]);
            setChecked([...check]);
          }
        });
    };
    getToDos();
  }, []);

  //POST todos
  const postToDos = (event) => {
    event.preventDefault();
    axios
      .post("https://to-do-app-dl-default-rtdb.firebaseio.com/todos.json", {
        false: input,
      })
      .then((response) => {
        setTodos([...todos, input]);
        setKeys([...keys, response.data.name]);
        setInput("");
      });
  };

  //DELETE todos
  const deleteToDoHandler = (index, value) => {
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
        const checkDelete = [...checked].filter((el) => el !== value);
        setTodos([...toDoDelete]);
        setKeys([...keyDelete]);
        setChecked([...checkDelete]);
      });
  };

  //UPDATE todos
  const updateToDoHandler = (updateText, placeholder) => {
    if (checked.includes(placeholder)) {
      axios
        .put(
          "https://to-do-app-dl-default-rtdb.firebaseio.com/todos/" +
            keys[todos.indexOf(placeholder)] +
            ".json",
          {
            true: updateText,
          }
        )
        .then(() => {
          const updateToDos = [...todos];
          updateToDos[todos.indexOf(placeholder)] = updateText;
          setTodos([...updateToDos]);
          const updateChecked = [...checked];
          updateChecked[checked.indexOf(placeholder)] = updateText;
          setChecked([...updateChecked]);
        });
    } else {
      axios
        .put(
          "https://to-do-app-dl-default-rtdb.firebaseio.com/todos/" +
            keys[todos.indexOf(placeholder)] +
            ".json",
          {
            false: updateText,
          }
        )
        .then(() => {
          const updateToDos = [...todos];
          updateToDos[todos.indexOf(placeholder)] = updateText;
          setTodos([...updateToDos]);
        });
    }
  };
  return (
    <>
      <Container maxWidth="sm" className={classes.root}>
        <h1>ToDo</h1>
        {!edit ? (
          <InputButton
            input={input}
            setInput={setInput}
            postToDos={postToDos}
          />
        ) : null}
        <ListItems
          todos={todos}
          keys={keys}
          checked={checked}
          setChecked={setChecked}
          deleteToDo={deleteToDoHandler}
          updateToDo={updateToDoHandler}
          edit={edit}
          setEdit={setEdit}
        />
      </Container>
      <div className={classesCSS.headerBlockquote}>
        <h1 className={classesCSS.headerQuote}>
          "When things go well, 'tis easy to be good; <br /> adversity shows who
          is the hero"
        </h1>
        <div className={classesCSS.headerCite}>- P.P. Njegos</div>
      </div>
    </>
  );
};

export default ToDo;
