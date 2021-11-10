import React from 'react';
import {useState, useEffect } from "react";
import TodoDisplay from "./TodoDisplay"
import * as todoAPIUtil from "../util/todo_util"


const Todos = ({propTodos, title, status}) => {

    const [todos, setTodos] = useState(propTodos)
    const [newDescription, setNewDescription] = useState("")
    const [newDone, setNewDone] = useState()
    const [newProgress, setNewProgress] = useState()
    const [todo, setTodo] = useState({})

    useEffect( () => {
        
    },[todos])
    console.log("description",newDescription)

    const onClickSetStatus = e => {
        if(status === "done"){
            setNewDone(true)
            setNewProgress(false)
        } else if (status === " inProgress"){
            setNewDone(false)
            setNewProgress(true)
        } else{
            setNewDone(false)
            setNewProgress(false)
        }
    }

    const createTodo = e => {
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
        e.preventDefault()
        const newTodo = {
            description: newDescription,
            done: newDone,
            inProgress: newProgress,
            dueDate: "2022-12-22",
            tags: []
        }

        todoAPIUtil.createTodo(newTodo)
            .then(console.log(newTodo))
    }
    console.log("newDone",newDone)
    console.log("newDone",newProgress)


    return (
        <div className="todos-container">
            {/* <div className="modal" style={{display:"none"}}>

            </div> */}
            <div className="title-addButton">
                <h1 className="title">{title}</h1>
                <button onClick={e => createTodo(e)} className="addTodo">+ Add new todo</button>
            </div>
            {
                propTodos.map(todo => (
                    <TodoDisplay status={status} key={todo._id} id={todo._id} propTodo={todo} />
                ))
            }
            <div className="modal-background" style={{ display: "none" }}>
                <div className="modal-child" onClick={e => e.stopPropagation()}>
                    <form>
                        {/* <label htmlFor="description">description</label> */}
                        Description:  <input type="text" value={newDescription} onChange={e => setNewDescription(e.target.value)}/>
                        <input type="text" />
                        <div> Done
                            <input type="radio" className="Done" name="Done"  onClick={e => onClickSetStatus(e)  } />true
                            <input type="radio" className="Done" name="Done" data-value-done="false" />false
                        </div>
                        <label htmlFor="description">description</label>
                        <input type="text" />
                        <label htmlFor="description">description</label>
                        <input type="text" />
                        <label htmlFor="description">description</label>
                        <input type="text" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Todos
