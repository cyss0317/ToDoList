import React from 'react';
import {useState, useEffect } from "react";
import TodoDisplay from "./TodoDisplay"
import * as todoAPIUtil from "../util/todo_util"


const Todos = ({propTodos, title, status}) => {
    console.log("propTodos",propTodos)
    const [todos, setTodos] = useState(propTodos)
    console.log(todos)
    useEffect( () => {
        
    },[todos])

    const createTodo = (e) => {
        e.preventDefault()
        const newTodo = {
            description: "newTodo",
            done: true,
            inProgress: false,
            dueDate: "2022-12-22",
            tags: []
        }

        todoAPIUtil.createTodo(newTodo)
            .then(console.log(newTodo))
    }

    return (
        <div className="todos-container">
            <div className="title-addButton">
                <h1 className="title">{title}</h1>
                <button onClick={e => createTodo(e)} className="addTodo">+ Add new todo</button>
            </div>
            {
                propTodos.map(todo => (
                    <TodoDisplay status={status} key={todo._id} id={todo._id} propTodo={todo} />
                ))
            }
        </div>
    )
}

export default Todos
