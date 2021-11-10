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
        setTodo({
            description: newDescription,
            done: "",
            inProgress: "",
            dueDate: "",
            tag: []
        })
    },[newDescription])


    console.log("title",title)

    const statusTodo = status => {
        if (status === "Upcoming") {
            //question, status conditional redering not working
            return (
                <div >
                     Add Upcoming Todo
                </div>
            )
        } else if (status === "In Progress") {
            console.log("gggggggg", status === "In Progress")
            return (
                <div >
                    Add In Progress Todo
                </div>
            )
        } else if (status === "Done") {
            return (
                <div >
                    Add Done Todo
                </div>
            )
        }
    }

    const setDescriptionOnChange = (e) => {
        setNewDescription(e.target.value)
        console.log(todo)
        // const newTodo = ({
        //     description: newDescription,
        //     dueDate: newDueDate,
        //     done: newDone,
        //     inProgress: newProgress,
        //     tags: []
        // })

    }

    
    
    const openModal = e => {
        e.preventDefault()
        // console.log(newTodo)
        const modal = document.querySelector(".modal-background")
        modal.style.display = "block"
        // console.log(newTodo)
        // if (status === "done") {
        //     setNewDone(true)
        //     setNewProgress(false)
        // } else if (status === "inProgress") {
        //     setNewDone(false)
        //     setNewProgress(true)
        // } else {
        //     setNewDone(false)
        //     setNewProgress(false)
        // }
    }
    

    // console.log("newTodo",newTodo)


    console.log('doneeeeeee', newDone)
    window.newDone = newDone
    const createSubmit = e => {

        //question, it wouldn't rerender after creation

        // console.log("newDone from submit",newDone)
        // console.log("newProgress from submit",newProgress)
        // todoAPIUtil.createTodo(newTodo)

// const newTodo = ({
//     description: newDescription,
//     dueDate: newDueDate,
//     done: status === "done" ? true : false,
//     inProgress: status === "inProgress" ? true : false,
//     tags: []
// })
        console.log("newTodo", todo)
        const modal = document.querySelector(".modal")
        modal.style.display = "none"
        setNewDone()
        setNewProgress()
    }
    const closeModal = e => {
        const modal = document.querySelector(".modal-background")
        modal.style.display = "none"
        // setNewDone()
        // setNewProgress()
    }

    // console.log("done",newDone)
    // console.log("prgress",newProgress)
console.log("status", status)

    return (
        <div className="todos-container">
            <div className="title-addButton">
{/* it's fine rendering title */}
                <h1 className="title">{title}</h1>
                <button onClick={e => openModal(e)} className="addTodo">+ Add new todo</button>
            </div>
            {
                propTodos.map(todo => (
                    <TodoDisplay status={status} key={todo._id} id={todo._id} propTodo={todo} />
                ))
            }
            <div onClick={e => closeModal(e)} className="modal-background" style={{ display: "none" }}>
                <div className="modal-child" onClick={e => e.stopPropagation()}>
                    <div className="status-x-button">

                        {   
                            statusTodo(title)
                        }
                        <button onClick={e => closeModal(e)}id="modal-close-button" className="X-button">X</button>
                    </div>
                    <form className="info-section" onSubmit={e => createSubmit(e)}>
                        {/* <label htmlFor="description">description</label> */}
                        <label htmlFor="descrition">Description</label>
                        <textarea className="description-input" type="text" value={newDescription} 
                            onChange={e => setDescriptionOnChange(e)}/>
                        
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
