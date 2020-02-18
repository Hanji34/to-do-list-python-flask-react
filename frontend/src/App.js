import React, { useState, useEffect } from 'react';
import './App.css';
import { Todo } from './components/Todo';
import { TodoForm } from './components/TodoForm';
import axios from 'axios';



function App() {
  const [selected, setSelected] = useState("all")

  const [todos, setTodos] = useState([])
  useEffect(() => {
    axios.get(
      "http://localhost:5000/todo"
    ).then(
      (response) => setTodos(response.data.ToDo)
    ).catch(
      (error) => console.log(error)
    )
  }, []);
  const completeTodo = id => {
    axios.post(
      `http://localhost:5000/todo/${id}/finish`
    ).then(
      (response) => {
        let newTodos = [...todos]
        for (let i = 0; i < todos.length; i++) {
          if (newTodos[i].id === response.data.id) {
            newTodos[i].done = response.data.done
          }
        }
        setTodos(newTodos)
      }
    ).catch((error) => console.log(error))
  }

  const removeTodo = id => {
    axios.delete(
      `http://localhost:5000/todo/${id}`
    ).then(
      (_response) => setTodos(todos.filter((t) => t.id !== id))
    ).catch(
      (error) => console.log(error))
  }

  const addTodo = (description) => {
    axios.post(
      "http://localhost:5000/todo",
      { description: description, done: false }
    ).then(
      (response) => setTodos([...todos, response.data])
    ).catch((error) => console.log(error))
  }

  return (
    <div className="app">
      <div className="todo-list">
        {todos.filter((todo) => selected === "all" || (todo.done ? "done" : "undone") === selected).map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <select value={selected} onChange={(e) => setSelected(e.target.value)}>
          <option value="all">All</option>
          <option value="done">Done</option>
          <option value="undone">Undone</option>
        </select>
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;