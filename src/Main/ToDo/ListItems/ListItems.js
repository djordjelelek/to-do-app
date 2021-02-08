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
  FormLabel,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateIcon from "@material-ui/icons/Update";
import useStyles from "./listItemsUseStyles";

const ListItems = (props) => {
  const [placeholder, setPlaceholder] = useState("");
  const [updateText, setUpdateText] = useState("");
  const classes = useStyles();

  return props.todos.length > 0 && !props.edit ? (
    <List className={classes.paper}>
      {props.todos.map((value, index) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
            key={index}
            role={undefined}
            dense
            button
            onClick={() => props.handleToggle(index, value)}
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
            <ListItemText
              id={labelId}
              primary={value}
              className={classes.ListText}
            />
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
          label="Edit"
          style={{ margin: 8, marginBottom: "12px" }}
          defaultValue={placeholder}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(event) =>
            setUpdateText(() => {
              if (event.target.value === placeholder) return "";
              else return event.target.value;
            })
          }
        />
        <Button
          color="primary"
          variant="contained"
          type="submit"
          onClick={(event) => {
            console.log(placeholder);
            console.log(props.todos);
            console.log(props.todos.includes(placeholder));
            if (
              props.todos.includes(updateText)
              // !props.todos.includes(placeholder)
            ) {
              event.preventDefault();
              props.setAlertShow(true);
              return setTimeout(() => {
                props.setAlertShow(false);
              }, 2000);
            }
            props.updateToDo(updateText, placeholder);
            props.setEdit(false);
            setUpdateText("");
          }}
          disabled={!updateText}
          className={classes.MuiButton}
        >
          &nbsp; &nbsp;Edit&nbsp; &nbsp;
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => props.setEdit(false)}
          className={classes.MuiButtonCancel}
        >
          Cancel
        </Button>
      </FormLabel>
    </form>
  ) : null;
};

export default ListItems;
