import React, { useState } from "react";
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
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateIcon from "@material-ui/icons/Update";
import axios from "axios";

const ListItems = (props) => {
  const [placeholder, setPlaceholder] = useState("");
  const [updateText, setUpdateText] = useState("");

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
        { true: value }
      );
    } else {
      newChecked.splice(currentIndex, 1);
      axios.put(
        "https://to-do-app-dl-default-rtdb.firebaseio.com/todos/" +
          props.keys[index] +
          ".json",
        { false: value }
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
    </form>
  ) : null;
};

export default ListItems;
