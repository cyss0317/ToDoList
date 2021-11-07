import React from 'react';
import {useState, useEffect } from "react";
import TodoDisplay from "./TodoDisplay"

const Todos = ({todos, title}) => {

    return (
        <div className="todos-container">
            <h1 className="title">{title}</h1>
            {
                todos.map(todo => (
                    <TodoDisplay key={todo._id} id={todo._id} todo={todo} />
                ))
            }
            <button className="addTodo">+ Add new todo</button>
        </div>
    )
}

export default Todos
