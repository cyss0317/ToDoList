import React from 'react';
import {useState, useEffect } from "react";

const Todos = ({todos, title}) => {

    return (
        <div className="todos-container">
            <h1 className="title">{title}</h1>
            {
                todos.map(todo => {
                    return(
                        <>
                            <p>{todo.description}</p>
                            <p>{todo.dueDate}</p>
                        </>
                    )
                })
            }       
        </div>
    )
}

export default Todos
