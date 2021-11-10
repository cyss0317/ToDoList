import React from 'react'
import {useState, useEffect} from "react"
import * as todoAPIUtil from "../util/todo_util"


const TodoDisplay = ({props, propTodo, id, status}) => {
    const [todo, setTodo] = useState(propTodo)
    const [tags, setTags] = useState(propTodo.tags);
    const [tag, setTag] = useState("");
    const [newDueDate, setNewDueDate] = useState(propTodo.dueDate);

    console.log(todo)
    
    useEffect(() => {

    },[setTodo])

    const onClickUpdateStatus =  (e, status) => {
        //why status could be undefined
        e.preventDefault();
        console.log("status",status)
        console.log(e)
        const answer = window.confirm(`Move this to ${status}?`)
        if(!answer) return ;
        if(answer && status === "done"){
            setTodo(
                {
                    _id: id,
                    description: todo.description,
                    dueDate: todo.dueDate,
                    done: true,
                    inProgress: todo.inProgress,
                    tags: tags
                }
            )
        } else if(answer && status === "inProgress") {
            setTodo(
                {
                    _id: id,
                    description: todo.description,
                    dueDate: todo.dueDate,
                    done: todo.done,
                    inProgress: true,
                    tags: tags
                }
            )
        } else if( answer && status === "upcoming"){
            setTodo(
                {
                    _id: id,
                    description: todo.description,
                    dueDate: todo.dueDate,
                    done: false,
                    inProgress: false,
                    tags: tags
                }
            )
        }
        const response =  todoAPIUtil.updateTodo(todo)
        console.log(response.data)
        console.log(todo)
    }

    const deleteTodo = (e) => {
        e.preventDefault();
        console.log("before", todo)
        todoAPIUtil.deleteTodo(id)
        setTodo({})
        console.log(todo)
        console.log("delete")
    }


    let pastDue = undefined;

    const dueDateOnChange = (e) => {
        const changeButton = document.getElementById(`${id}`);
        console.log(changeButton)
        setNewDueDate(e.target.value);
        changeButton.style.display = "block"
    }

    const submitTag = e => {
        e.preventDefault();
        if( tag.length > 0){
            setTags(old => [...old, tag]);
        }
        setTag("");
        console.log(tags)

    }
    
    const statusButtons = status => {
        if(status === "upcoming"){
            return(
                <div className="status-buttons">
                    <p>Move to:   </p>
                    <button onClick={(e, status) => onClickUpdateStatus(e, status) }>In Progress</button>
                    <button onClick={(e, status) => onClickUpdateStatus(e, status)}>Done</button>
                </div>
            )
        } else if( status === "inProgress"){
            return(
                <div className="status-buttons">
                    <p>Move to:   </p>
                    <button onClick={(e, status) => onClickUpdateStatus(e, status)}>Upcoming</button>
                    <button onClick={(e, status) => onClickUpdateStatus(e, status) }>Done</button>
                </div>
            )
        } else if(status === "done"){
            return(
                <div className="status-buttons">
                    <p>Move to:   </p>
                    <button onClick={(e, status) => onClickUpdateStatus(e, status) }>Upcoming</button>
                    <button onClick={(e, status) => onClickUpdateStatus(e, status) }>In Progress</button>
                </div>

            )
        }
    }
    
    const currentDate = new Date();
    const todayMonth = currentDate.getUTCMonth() + 1;
    const todayDay = currentDate.getUTCDate();
    const todayYear = currentDate.getUTCFullYear();

    const [dueYear, dueMonth, dueDay] = newDueDate.split("-");
    
    if(parseInt(dueYear) < todayYear || parseInt(dueMonth) < todayMonth || parseInt(dueDay) < todayDay) pastDue = true;
     
    console.log(props)
    return (
        <div className="todo" value={id} draggable="true">
            <div className="todo-sub">
                <div >
                    <div className="description-and-X">
                        <p className="description">{todo.description}</p>
                        <button onClick={e => deleteTodo(e)} style={{display: "block"}} className="X-button">X</button>
                    </div>
                    {
                        tags.map((tag, i) => (
                            <button key={i}>{tag}</button>
                        ))
                    }
                    <form className="tag-input" onSubmit={e => submitTag(e)}>
                        <input type="text" onChange={e => setTag(e.target.value) }  value={tag} placeholder="Add Tags to this"/>
                    </form>
                    {/* <form action=""> */}
                        {/* <button onClick={e => expandTag(e)} className="current-dueDate" >Due: {todo.dueDate}</button> */}
                    <form className="change-dueDates-container">
                        <div className="due-date-hover-effect">
                            <span>Due: </span>< input type="date" className="dueDate" onChange={e => dueDateOnChange(e)}
                            onClick={e => console.log(newDueDate)} defaultValue={newDueDate} >
                            </input >

                        </div>
                         <button id={id} className="change-dueDate-button" style={{display:"none"}}>Click to change</button>
                    </form>
                    {/* </form> */}
                    {
                        pastDue ? 
                        <p style={{color: "red"}}>Past Due</p>
                        :
                        <></>
                    }
                </div>
                {
                    statusButtons(status)
                }

            </div>
        </div>
    )
}

export default TodoDisplay
