import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos((prev) => [...prev, newTodo]);
      setNewTodo("");
    }
  };

  const removeTodo = (index) => {
    setTodos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <Typography
        variant="h5"
        component="h1"
        align="center"
        color="text.primary"
        fontWeight="bold"
        gutterBottom
      >
        Todo List
      </Typography>

      <Box sx={{ display: "flex", mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Add a new task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ ml: 2 }}
          onClick={addTodo}
        >
          Add
        </Button>
      </Box>

      <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {todos.map((todo, index) => (
          <Paper
            key={index}
            variant="outlined"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 1,
              bgcolor: "grey.50",
            }}
          >
            <ListItem disableGutters sx={{ flex: 1 }}>
              <ListItemText primary={todo} primaryTypographyProps={{ color: "text.primary" }} />
            </ListItem>
            <IconButton
              edge="end"
              color="error"
              onClick={() => removeTodo(index)}
            >
              <DeleteIcon />
            </IconButton>
          </Paper>
        ))}
      </List>
    </Box>
  );
};

export default TodoList;
