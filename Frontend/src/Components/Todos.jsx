import React from 'react';
import {useState, useEffect } from "react";
import TodoDisplay from "./TodoDisplay"
import * as todoAPIUtil from "../util/todo_util"


const Todos = ({propTodos, title, status, setPropTodos, number}) => {
    const currentDate = new Date();
    const todayMonth = currentDate.getUTCMonth() + 1;
    const todayDay = currentDate.getUTCDate() - 1;
    const todayYear = currentDate.getUTCFullYear();
    
    const [newDescription, setNewDescription] = useState("")
    const [newDueDate, setNewDueDate] = useState(`${todayYear}-${todayMonth}-${todayDay}`)
    const [newDone, setNewDone] = useState()
    const [newProgress, setNewProgress] = useState()
    const [todos, setTodos] = useState(propTodos)
    const [todo, setTodo] = useState({})
    const modal = document.querySelector(`.modal-background-${status}`)
    const textArea = document.querySelector(`.description-input-${status}`)
    const textAreas = document.querySelectorAll(`#description-input`)

    window.todos = todos
    window.propTodos = propTodos
    let newTodo = ({
        description: newDescription,
        dueDate: newDueDate,
        done: status === "done" ? true : false,
        inProgress: status === "inProgress" ? true : false,
        tags: []
    })


    const setDescriptionOnChange = (e) => {
        setNewDescription(e.target.value)
    }

    const openModal = e => {
        e.preventDefault()
        modal.style.display = "block"
    }

    const createSubmit = (e, status) => {
        e.preventDefault()
        todoAPIUtil.createTodo(newTodo)
        setPropTodos(old => [...old, newTodo])
        textArea.value = ""
        modal.style.display = "none"
    }

    const closeModal = e => {
        modal.style.display = "none"
    }

    if(todos !== undefined){
        return (
            <div key={number} className="todos-container">
                <div className="title-addButton">
                    <h1 className="title">{title}&nbsp;&nbsp;{propTodos.length}</h1>
                    <button onClick={e => openModal(e)} className="addTodo">+ Add new {title} todo </button>
                </div>
                {
                    propTodos.map(todo => (
                        <TodoDisplay todos={todos} setTodos={setTodos} status={status} key={todo._id} id={todo._id} propTodo={todo} />
                    ))
                }
                <div onClick={e => closeModal(e)} id="modal-background" className={`modal-background-${status}`} style={{ display: "none" }}>
                    <div className="modal-child" onClick={e => e.stopPropagation()}>
                        <div className="status-x-button">
                        <div>Create {title} todos</div>
                            <button onClick={e => closeModal(e)}id="modal-close-button" className="X-button">X</button>
                        </div>
                        <form className="info-section" onSubmit={(e, status) => createSubmit(e, status)}>
                            <label htmlFor="descrition">Description</label>
                            <textarea id="description-input" className={`description-input-${status}`} type="text" value={newDescription} 
                                onChange={e => setDescriptionOnChange(e)}/>
                            
                            <label htmlFor="dueDate">Due date:  </label>
                            <input type="date" value={newDueDate} onChange={e => setNewDueDate(e.target.value)}/>
                            <button>submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    } else {
        return(
            <p>Loading...</p>
        )
    }
}

export default Todos
