import React, { useState } from "react";
// import classes from "./Main.module.css";

const ToDo = () => {
  const [todos, setTodos] = useState(["drink rakija", "danijela"]);
  const [input, setInput] = useState("");
  const list = todos.map((el) => <li>{el}</li>);
  const addToDo = (event) => {
    setTodos([...todos, input]);
  };
  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      <button onClick={addToDo}>Add</button>
      <ul>{list}</ul>
    </div>
  );
};

export default ToDo;
