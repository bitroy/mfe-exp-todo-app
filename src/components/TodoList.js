import React, { useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo]);
      setNewTodo("");
    }
  };

  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">Todo List</h1>

      {/* Input Section */}
      <div className="flex mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add a new task"
        />
        <button
          onClick={addTodo}
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
        >
          Add
        </button>
      </div>

      {/* Todo List */}
      <ul className="space-y-2">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-2 border border-gray-200 rounded-md shadow-sm bg-gray-50"
          >
            <span className="text-gray-700">{todo}</span>
            <button
              onClick={() => removeTodo(index)}
              className="text-red-500 hover:text-red-700 focus:outline-none"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
