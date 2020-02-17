import React from 'react';



export function Todo({ todo, completeTodo, removeTodo }) {
    return (
        <div
            className="todo"
            style={{ textDecoration: todo.done ? "line-through" : "" }}
        >
            ID: {todo.id} <br />
            Description: {todo.description}
            <div>
                <label>Done:</label>
                <input type="checkbox" checked={todo.done} onClick={() => completeTodo(todo.id)} />
                <button onClick={() => removeTodo(todo.id)}>Delete Task</button>
            </div>
        </div>
    )
}