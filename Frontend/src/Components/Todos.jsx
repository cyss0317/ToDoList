import React from 'react';
import {useState, useEffect } from "react";
import TodoDisplay from "./TodoDisplay"
import * as todoAPIUtil from "../util/todo_util"


const Todos = ({propTodos, title, status, setPropTodos}) => {
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
    window.todos = todos
    window.propTodos = propTodos
    let newTodo = ({
        description: newDescription,
        dueDate: newDueDate,
        done: status === "done" ? true : false,
        inProgress: status === "inProgress" ? true : false,
        tags: []
    })
    
    useEffect( () => {
        setTodo({
            description: newDescription,
            done: "",
            inProgress: "",
            dueDate: "",
            tag: []
        })
    },[newDescription])




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
        console.log("current Status in setDescription", status)
        // debugger
        setNewDescription(e.target.value)
        console.log(newTodo)

    }

    
    
    const openModal = e => {
        e.preventDefault()
        console.log("status when openModal", status)
        console.log(newTodo)
        const modal = document.querySelector(`.modal-background-${status}`)
        modal.style.display = "block"

    }
    //answer
    //on click, it might open up a modal from other container, maybe I need to specify the class name

    // console.log("newTodo",newTodo)


    window.newDone = newDone
    const createSubmit = (e, status) => {
        e.preventDefault()
        //question, it wouldn't rerender after creation
        
        // console.log("newDone from submit",newDone)
        // console.log("newProgress from submit",newProgress)
        
        // debugger
        setTodos(old => [...old, newTodo])
        todoAPIUtil.createTodo(newTodo)

        const modal = document.querySelector(`.modal-background-${status}`)
        modal.style.display = "none"

    }
    const closeModal = e => {
        const modal = document.querySelector(`.modal-background-${status}`)
        modal.style.display = "none"
        // setNewDone()
        // setNewProgress()
    }

    // console.log("done",newDone)
    // console.log("prgress",newProgress)
    if(todos !== undefined){

        return (
            <div className="todos-container">
                <div className="title-addButton">
    {/* it's fine rendering title */}
                    <h1 className="title">{title}</h1>
                    <button onClick={e => openModal(e)} className="addTodo">+ Add new todo</button>
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
    } else {
        return(
            <p>Loading...</p>
        )
    }
}

export default Todos
