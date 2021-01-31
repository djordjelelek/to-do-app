import React, { useState, useEffect } from "react";
import classes from "./ToDo.module.css";
import axios from "axios";
import ListItems from "./ListItems/ListItems";
import InputButton from "./InputButton/InputButton";

const ToDo = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [keys, setKeys] = useState([]);
  const [checked, setChecked] = useState([]);
  const [edit, setEdit] = useState(false);

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
  console.log(checked);
  return (
    <div className={classes.ToDo}>
      <h1>ToDo</h1>
      {!edit ? (
        <InputButton input={input} setInput={setInput} postToDos={postToDos} />
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
    </div>
  );
};

export default ToDo;
