import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../AuthContext/AuthContext";
import { Container, CircularProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import useStyles from "./toDoUseStyles";
import ListItems from "./ListItems/ListItems";
import InputButton from "./InputButton/InputButton";
import Header from "./Header/Header";

const ToDo = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [keys, setKeys] = useState([]);
  const [checked, setChecked] = useState([]);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alertShow, setAlertShow] = useState(false);
  const classes = useStyles();

  const { userId } = useAuth();
  const { token } = useAuth();

  //GET todos
  useEffect(() => {
    const getToDos = () => {
      axios
        .get(
          "https://to-do-app-dl-default-rtdb.firebaseio.com/todos.json" +
            "?auth=" +
            token +
            '&orderBy="userId"&equalTo="' +
            userId +
            '"'
        )
        .then((response) => {
          setLoading(false);
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
  }, []); //eslint ignore line

  //POST todos
  const postToDos = (event) => {
    event.preventDefault();
    if (todos.includes(input)) {
      setAlertShow(true);
      return setTimeout(() => {
        setAlertShow(false);
      }, 1400);
    }
    setTodos([...todos, input]);
    setInput("");
    axios
      .post(
        "https://to-do-app-dl-default-rtdb.firebaseio.com/todos.json?auth=" +
          token,
        {
          false: input,
          userId: userId,
        }
      )
      .then((response) => {
        setKeys([...keys, response.data.name]);
      });
  };

  //DELETE todos
  const deleteToDoHandler = (index, value) => {
    const toDoDelete = [...todos];
    toDoDelete.splice(index, 1);
    const keyDelete = [...keys];
    keyDelete.splice(index, 1);
    const checkDelete = [...checked].filter((el) => el !== value);
    setTodos([...toDoDelete]);
    setKeys([...keyDelete]);
    setChecked([...checkDelete]);

    axios.delete(
      "https://to-do-app-dl-default-rtdb.firebaseio.com/todos/" +
        keys[index] +
        ".json?auth=" +
        token
    );
  };

  //UPDATE todos
  const updateToDoHandler = (updateText, placeholder) => {
    const updateToDos = [...todos];
    updateToDos[todos.indexOf(placeholder)] = updateText;
    setTodos([...updateToDos]);
    const updateChecked = [...checked];
    updateChecked[checked.indexOf(placeholder)] = updateText;
    setChecked([...updateChecked]);
    if (checked.includes(placeholder)) {
      axios
        .put(
          "https://to-do-app-dl-default-rtdb.firebaseio.com/todos/" +
            keys[todos.indexOf(placeholder)] +
            ".json?auth=" +
            token,
          {
            true: updateText,
            userId: userId,
          }
        )
        .then(() => {});
    } else {
      axios.put(
        "https://to-do-app-dl-default-rtdb.firebaseio.com/todos/" +
          keys[todos.indexOf(placeholder)] +
          ".json",
        {
          false: updateText,
        }
      );
    }
  };

  //UPDATE check
  const handleToggle = (index, value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    currentIndex === -1
      ? newChecked.push(value)
      : newChecked.splice(currentIndex, 1);
    axios.put(
      "https://to-do-app-dl-default-rtdb.firebaseio.com/todos/" +
        keys[index] +
        ".json",
      currentIndex === -1
        ? { true: value, userId: userId }
        : { false: value, userId: userId }
    );
    setChecked(newChecked);
  };

  //DELETE all checked
  const handleClearDone = (keysDelete) => {
    console.log(keysDelete);
    const request = keysDelete.map((el) =>
      axios.delete(
        "https://to-do-app-dl-default-rtdb.firebaseio.com/todos/" +
          el +
          ".json?auth=" +
          token
      )
    );
    axios.all(request);
  };

  return (
    <>
      {loading ? (
        <div className={classes.SpinnerContainer}>
          <CircularProgress className={classes.Spinner} />
        </div>
      ) : (
        false
      )}
      <Container maxWidth="sm" className={classes.root}>
        <div className={classes.paper}>
          <Header
            setLoading={setLoading}
            todos={todos}
            setTodos={setTodos}
            checked={checked}
            setChecked={setChecked}
            keys={keys}
            setKeys={setKeys}
            handleClearDone={handleClearDone}
          />
          {alertShow ? (
            <Alert className={classes.alert} variant="filled" severity="error">
              {"Can't add duplicates"}
            </Alert>
          ) : null}
          {!edit ? (
            <InputButton
              input={input}
              setInput={setInput}
              postToDos={postToDos}
            />
          ) : null}

          <ListItems
            checked={checked}
            todos={todos}
            keys={keys}
            setChecked={setChecked}
            deleteToDo={deleteToDoHandler}
            updateToDo={updateToDoHandler}
            handleToggle={handleToggle}
            edit={edit}
            setEdit={setEdit}
          />
        </div>
      </Container>
    </>
  );
};

export default ToDo;
