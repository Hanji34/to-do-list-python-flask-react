import React, { useState, useEffect } from 'react';
import './ToDoPage.css';
import { Todo } from './components/Todo';
import { TodoForm } from './components/TodoForm';
import axios from 'axios';




export default function ToDoPage() {

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
  const updateTodo = (id, description) => {
    axios.post(
      `http://localhost:5000/todo/${id}/${description}`
    ).then(
      (response) => {
        let newTodos = [...todos]
        console.log(response)
        for (let i = 0; i < todos.length; i++) {
          if (newTodos[i].id === response.data.id) {
            newTodos[i].description = response.data.description
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
    <div className="container">
      <div className="todo-list">
        <div className="radiobttn">
          <p>
            <label>
              <input className="with-gap" name="all" type="radio" checked={selected === "all"} onClick={(e) => setSelected(e.target.name)} />
              <span className="gap">All</span>
            </label>
          </p>
          <p>
            <label>
              <input className="with-gap" name="done" type="radio" checked={selected === "done"} onClick={(e) => setSelected(e.target.name)} />
              <span className="gap">Done</span>
            </label>
          </p>
          <p>
            <label>
              <input className="with-gap" name="undone" type="radio" checked={selected === "undone"} onClick={(e) => setSelected(e.target.name)} />
              <span>Undone</span>
            </label>
          </p>
        </div>


        {todos.filter((todo) => selected === "all" || (todo.done ? "done" : "undone") === selected).map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}