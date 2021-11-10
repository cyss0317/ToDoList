import React from 'react';
import {useState, useEffect } from "react";
import TodoDisplay from "./TodoDisplay"
import * as todoAPIUtil from "../util/todo_util"


const Todos = ({propTodos, title, status}) => {

    const [todos, setTodos] = useState(propTodos)
    const [newDescription, setNewDescription] = useState("")
    const [newDueDate, setNewDueDate] = useState()
    const [newDone, setNewDone] = useState()
    const [newProgress, setNewProgress] = useState()
    const [todo, setTodo] = useState({})

    useEffect( () => {
        
    },[todos])
    console.log("description",newDescription)

    // const onClickSetStatus = e => {
    //     if(status === "done"){
    //         setNewDone(true)
    //         setNewProgress(false)
    //     } else if (status === " inProgress"){
    //         setNewDone(false)
    //         setNewProgress(true)
    //     } else{
    //         setNewDone(false)
    //         setNewProgress(false)
    //     }
    // }

    const createSubmit = e => {
        const newTodo = {
            description: newDescription,
            // dueDate: newDate,
            done: newDone,
            inProgress: newProgress,
            tags: []
        }
        todoAPIUtil.createTodo(newTodo)
        const modal = document.querySelector(".modal")
        modal.style.display = "none"
    }

    const openModal = e => {
        e.preventDefault()
        const modal = document.querySelector(".modal-background")
        modal.style.display = "block"
        console.log("statusssssss",status)
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
    console.log("newDone",newDone)
    console.log("newDone",newProgress)


    return (
        <div className="todos-container">
            {/* <div className="modal" style={{display:"none"}}>

            </div> */}
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
                    <form onSubmit={e => createSubmit(e)}>
                        {/* <label htmlFor="description">description</label> */}
                        <label htmlFor="descrition">Description</label>
                        <input type="text" value={newDescription} onChange={e => setNewDescription(e.target.value)}/>
                        
                        <label htmlFor="dueDate">Due date:  </label>
                        <input type="date" />
                        <button>submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Todos
