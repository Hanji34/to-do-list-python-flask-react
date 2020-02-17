import React, { useState } from 'react';

export function TodoForm({ addTodo }) {
    const [value, setValue] = useState("");
    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        addTodo(value);
        setValue("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Description: </label>
            <input
                type="text"
                className="input"
                value={value}
                onChange={e => setValue(e.target.value)}
            />
        </form>

    )
}