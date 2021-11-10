import React from 'react';
import {useState, useEffect } from "react";
import TodoDisplay from "./TodoDisplay"
import * as todoAPIUtil from "../util/todo_util"


const Todos = ({propTodos, title, status}) => {
    const currentDate = new Date();
    const todayMonth = currentDate.getUTCMonth() + 1;
    const todayDay = currentDate.getUTCDate();
    const todayYear = currentDate.getUTCFullYear();

    const [todos, setTodos] = useState(propTodos)
    const [newDescription, setNewDescription] = useState("")
    const [newDueDate, setNewDueDate] = useState(`${todayYear}-${todayMonth}-${todayDay}`)
    const [newDone, setNewDone] = useState()
    const [newProgress, setNewProgress] = useState()
    const [todo, setTodo] = useState({})

    useEffect( () => {
        
    },[todos])


    console.log("status",status)

    const statusTodo = status => {
        if (status === "upcoming") {
            //question,conditional redering not working
            return (
                <div >
                     Add Upcoming Todo
                </div>
            )
        } else if (status === "inProgress") {
            return (
                <div >
                    Add In Progress Todo
                </div>
            )
        } else if (status === "done") {
            return (
                <div >
                    Add Done Todo
                </div>
            )
        }
    }
    
    const createSubmit = e => {
        console.log("newDone from submit",newDone)
        console.log("newProgress from submit",newProgress)
        const newTodo = ({
            description: newDescription,
            dueDate: newDueDate,
            done: newDone,
            inProgress: newProgress,
            tags: []
        })
        console.log("newTodo",newTodo)
        todoAPIUtil.createTodo(newTodo)
        const modal = document.querySelector(".modal")
        modal.style.display = "none"
    }

    const openModal = e => {
        e.preventDefault()
        const modal = document.querySelector(".modal-background")
        modal.style.display = "block"
        if (status === "done") {
            setNewDone(true)
            setNewProgress(false)
        } else if (status === "inProgress") {
            setNewDone(false)
            setNewProgress(true)
        } else {
            setNewDone(false)
            setNewProgress(false)
        }
    }

    const closeModal = e => {
        const modal = document.querySelector(".modal-background")
        modal.style.display = "none"
        setNewDone()
        setNewProgress()
    }

    console.log("done",newDone)
    console.log("prgress",newProgress)


    return (
        <div className="todos-container">
            <div className="title-addButton">
                <h1 className="title">{title}</h1>
                <button onClick={e => openModal(e)} className="addTodo">+ Add new todo</button>
            </div>
            {
                propTodos.map(todo => (
                    <TodoDisplay status={status} key={todo._id} id={todo._id} propTodo={todo} />
                ))
            }
            <div className="modal-background" style={{ display: "none" }}>
                <div className="modal-child" onClick={e => e.stopPropagation()}>
                    <div className="status-x-button">
                        {
                            statusTodo(status)
                        }
                        <button onClick={e => closeModal(e)}id="modal-close-button" className="X-button">X</button>
                    </div>
                    <form className="info-section" onSubmit={e => createSubmit(e)}>
                        {/* <label htmlFor="description">description</label> */}
                        <label htmlFor="descrition">Description</label>
                        <textarea className="description-input" type="text" value={newDescription} onChange={e => setNewDescription(e.target.value)}/>
                        
                        <label htmlFor="dueDate">Due date:  </label>
                        <input type="date" value={newDueDate} onChange={e => setNewDueDate(e.target.value)}/>
                        <button>submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Todos
