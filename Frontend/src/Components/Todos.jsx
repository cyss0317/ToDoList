import React from 'react';
import {useState, useEffect } from "react";
import TodoDisplay from "./TodoDisplay"

const Todos = ({todos, title, status}) => {

    return (
        <div className="todos-container">
            <div className="title-addButton">
                <h1 className="title">{title}</h1>
                <button className="addTodo">+ Add new todo</button>
            </div>
            {
                todos.map(todo => (
                    <TodoDisplay status={status} key={todo._id} id={todo._id} propTodo={todo} />
                ))
            }
        </div>
    )
}

export default Todos
