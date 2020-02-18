import React, { useState } from 'react';


export function Todo({ todo, completeTodo, removeTodo, updateTodo }) {
    const [value, setValue] = useState("");
    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        updateTodo(todo.id, value);
        setValue("");
    }

    return (
        <div
            className="todo"
        >
            <div>
                <p style={{ textDecoration: todo.done ? "line-through" : "" }}>
                    <strong style={{ fontSize: "1rem" }}>ID: </strong>{todo.id}
                </p>
                <p style={{ textDecoration: todo.done ? "line-through" : "" }}>
                    <strong style={{ fontSize: "1rem" }}>Description: </strong>{todo.description}
                </p>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="description">Edit: </label>
                    <input
                        id="description"
                        type="text"
                        className="input"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <a onClick={handleSubmit} class="waves-effect waves-light btn-small light-green darken-2">
                        <i class="large material-icons">edit</i>
                    </a>
                </form>
            </div>
            <div>
                <label>
                    <input type="checkbox" checked={todo.done} onClick={() => completeTodo(todo.id)} />
                    <span className="gap">Done</span>
                </label>
                <a onClick={() => removeTodo(todo.id)} class="waves-effect waves-light btn-small red darken-3">
                    <i class="large material-icons">delete_forever</i>
                </a>
            </div>
        </div >
    )
}
