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
import Chip from "@mui/material/Chip";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useEventPublisher, EVENT_TYPES } from "@mfe/shared-eventbus";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [lastAction, setLastAction] = useState(null);
  const publish = useEventPublisher();

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo = {
        id: Date.now(),
        title: newTodo,
        completed: false,
        timestamp: new Date().toISOString()
      };
      
      setTodos((prev) => [...prev, todo]);
      setNewTodo("");
      
      // Publish TODO_ADDED event
      publish(EVENT_TYPES.TODO_ADDED, todo);
      
      // Publish notification
      publish(EVENT_TYPES.NOTIFICATION, {
        message: `Todo "${todo.title}" added!`,
        severity: 'success'
      });
      
      // Visual feedback
      setLastAction({ type: 'added', id: todo.id });
      setTimeout(() => setLastAction(null), 2000);
    }
  };

  const removeTodo = (index) => {
    const todo = todos[index];
    setTodos((prev) => prev.filter((_, i) => i !== index));
    
    // Publish TODO_DELETED event
    publish(EVENT_TYPES.TODO_DELETED, { id: todo.id, title: todo.title });
    
    // Publish notification
    publish(EVENT_TYPES.NOTIFICATION, {
      message: `Todo "${todo.title}" deleted!`,
      severity: 'info'
    });
    
    // Visual feedback
    setLastAction({ type: 'deleted', id: todo.id });
    setTimeout(() => setLastAction(null), 2000);
  };

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
        <Typography
          variant="h5"
          component="h1"
          color="text.primary"
          fontWeight="bold"
        >
          Todo List
        </Typography>
        <Chip 
          label={`${todos.length} ${todos.length === 1 ? 'item' : 'items'}`}
          size="small"
          color="primary"
          sx={{ ml: 2 }}
        />
      </Box>

      {lastAction && (
        <Paper
          sx={{
            p: 1,
            mb: 2,
            bgcolor: lastAction.type === 'added' ? 'success.light' : 'info.light',
            color: 'white',
            textAlign: 'center',
            animation: 'fadeIn 0.3s ease-in'
          }}
        >
          <Typography variant="body2">
            {lastAction.type === 'added' ? '✓ Event Published: TODO_ADDED' : '✓ Event Published: TODO_DELETED'}
          </Typography>
        </Paper>
      )}

      <Box sx={{ display: "flex", mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Add a new task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ ml: 2 }}
          onClick={addTodo}
          startIcon={<AddCircleOutlineIcon />}
        >
          Add
        </Button>
      </Box>

      <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {todos.map((todo, index) => (
          <Paper
            key={todo.id}
            variant="outlined"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 1,
              bgcolor: "grey.50",
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'grey.100',
                transform: 'translateX(4px)'
              }
            }}
          >
            <ListItem disableGutters sx={{ flex: 1 }}>
              <ListItemText 
                primary={todo.title} 
                primaryTypographyProps={{ color: "text.primary" }} 
              />
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
