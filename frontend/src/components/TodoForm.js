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
            <label htmlFor="description">Description: </label>
            <input
                id="description"
                type="text"
                className="input"
                value={value}
                onChange={e => setValue(e.target.value)}
            />
            <button onClick={handleSubmit} class="btn waves-effect waves-light light-green darken-2" type="submit" name="action">Submit
                <i class="material-icons right">send</i>
            </button>
        </form>

    )
}