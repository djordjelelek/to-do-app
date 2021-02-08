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
              const todosCopy = props.todos;

              console.log(todosCopy);

              //   const todosCopy = todos;
              // todosCopy.filter((el) => checked.includes(el));
              // setTodos([...todosCopy]);
              // setChecked([]);
              // setLoading(true);
              // setTimeout(() => {
              //   setLogIn(false);
              //   setToken("");
              //   setUserId("");
              //   sessionStorage.removeItem("token");
              //   sessionStorage.removeItem("userId");
              //   window.location.reload();
              // }, 2000);
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
              }, 1000);
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
