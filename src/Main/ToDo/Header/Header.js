import React from "react";
import Box from "@material-ui/core/Box";
import useStyles from "../toDoUseStyles";
import { useAuth } from "../../../AuthContext/AuthContext";

function Header(props) {
  const classes = useStyles();
  const { setUserId } = useAuth();
  const { setLogIn } = useAuth();
  const { setToken } = useAuth();

  return (
    <div style={{ width: "100%" }}>
      <Box display="flex" bgcolor="background.paper">
        <Box style={{ width: "50%", textAlign: "start" }}>
          <button
            className={classes.Buttons}
            onClick={() => {
              if (props.checked.length > 0) {
                const keysCopy = [...props.keys];
                const keysDelete = [...props.keys];
                const todosCopy = props.todos.filter((el, index) => {
                  if (!props.checked.includes(el)) keysDelete.splice(index, 1);
                  else keysCopy.splice(index, 1);
                  return !props.checked.includes(el);
                });
                props.setTodos([...todosCopy]);
                props.setChecked([]);
                props.setKeys([...keysCopy]);
                props.handleClearDone(keysDelete);
              }
            }}
          >
            <strong>Clear Done</strong>
          </button>
        </Box>
        <Box style={{ width: "50%", textAlign: "end" }}>
          <button
            className={classes.Buttons}
            onClick={() => {
              props.setLoading(true);
              setTimeout(() => {
                setLogIn(false);
                setToken("");
                setUserId("");
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("userId");
                window.location.reload();
              }, 500);
            }}
          >
            <strong>Log Out</strong>
          </button>
        </Box>
      </Box>
      <h1 className={classes.Header}>To Do</h1>
    </div>
  );
}

export default Header;
