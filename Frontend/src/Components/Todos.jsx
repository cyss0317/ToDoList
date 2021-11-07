import React from 'react';
import {useState, useEffect } from "react";

const Todos = ({todos}) => {

    return (
        <div>
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
