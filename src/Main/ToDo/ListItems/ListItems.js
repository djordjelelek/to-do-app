import React, { useState } from "react";
import axios from "axios";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Checkbox,
  IconButton,
  TextField,
  Button,
  FormLabel,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateIcon from "@material-ui/icons/Update";
import { useAuth } from "../../../AuthContext/AuthContext";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  MuiCheckbox: {
    colorPrimary: "white",
    colorSecondary: "black",
    color: "black",
    backgroundColor: "black",
  },
  paper: {
    paddingTop: "13px",
    paddingBottom: "22px",
    paddingLeft: "5px",
    paddingRight: "5px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  Buttons: {
    cursor: "pointer",
    border: "none",
    backgroundColor: "white",
    fontSize: "15px",
    color: "gray",
  },
  Header: {
    colorPrimary: "gray",
  },
}));

const ListItems = (props) => {
  const [placeholder, setPlaceholder] = useState("");
  const [updateText, setUpdateText] = useState("");
  const classes = useStyles();
  const { userId } = useAuth();

  //SET check
  const handleToggle = (value, index) => () => {
    const currentIndex = props.checked.indexOf(value);
    const newChecked = [...props.checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      axios.put(
        "https://to-do-app-dl-default-rtdb.firebaseio.com/todos/" +
          props.keys[index] +
          ".json",
        { true: value, userId: userId }
      );
    } else {
      newChecked.splice(currentIndex, 1);
      axios.put(
        "https://to-do-app-dl-default-rtdb.firebaseio.com/todos/" +
          props.keys[index] +
          ".json",
        { false: value, userId: userId }
      );
    }
    props.setChecked(newChecked);
  };

  return props.todos.length > 0 && !props.edit ? (
    <List>
      {props.todos.map((value, index) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
            key={value}
            role={undefined}
            dense
            button
            onClick={handleToggle(value, index)}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                style={{
                  color: "#4caf50",
                  "&:hover": {
                    color: "rgb(54, 125, 57)",
                  },
                }}
                checked={props.checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={value} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="comments"
                onClick={() => {
                  props.setEdit(true);
                  setPlaceholder(value);
                }}
              >
                <UpdateIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="comments"
                onClick={() => props.deleteToDo(index, value)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  ) : props.edit ? (
    <form>
      <FormLabel>
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
          onChange={(event) => setUpdateText(() => event.target.value)}
        />
        <Button
          color="primary"
          onClick={() => {
            props.updateToDo(updateText, placeholder);
            props.setEdit(false);
          }}
          disabled={!updateText}
        >
          Edit
        </Button>
        <Button color="secondary" onClick={() => props.setEdit(false)}>
          Cancel
        </Button>
      </FormLabel>
    </form>
  ) : null;
};

export default ListItems;
