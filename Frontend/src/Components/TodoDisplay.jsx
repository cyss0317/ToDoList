import React from 'react'
import {useState, useEffect} from "react"
import * as todoAPIUtil from "../util/todo_util"


const TodoDisplay = ({props, propTodo, id, status}) => {
    const [todo, setTodo] = useState(propTodo)
    const [tags, setTags] = useState(propTodo.tags);
    const [tag, setTag] = useState("");
    const [newDueDate, setNewDueDate] = useState(propTodo.dueDate);


    
    useEffect(() => {

    },[setTodo])

    const onClickUpdateStatus =  e => {
        e.preventDefault();
        let newTodo = {};
        const answer = window.confirm(`Move this to ${status}?`)
        if(!answer) return ;

        //question, it updates but won't re-render
        if(answer && e.target.value === "Done"){
            newTodo =
                {
                    id: id,
                    description: todo.description,
                    dueDate: todo.dueDate,
                    done: true,
                    inProgress: todo.inProgress,
                    tags: tags
                }
            setTodo(newTodo)    
        } else if (answer && e.target.value === "In Progress") {
            newTodo =
                {
                    id: id,
                    description: todo.description,
                    dueDate: todo.dueDate,
                    done: todo.done,
                    inProgress: true,
                    tags: tags
                }
            setTodo(newTodo)
        } else if (answer && e.target.value === "Upcoming"){
            newTodo =
                {
                    id: id,
                    description: todo.description,
                    dueDate: todo.dueDate,
                    done: false,
                    inProgress: false,
                    tags: tags
                }
            setTodo(newTodo)
        }
            console.log("newtodo", newTodo)
            todoAPIUtil.updateTodo(newTodo)
    }

    const deleteTodo = (e) => {
        e.preventDefault();
        todoAPIUtil.deleteTodo(id)
        //question, it deletes but doesn't re-render
        setTodo({})
    }


    let pastDue = undefined;

    const dueDateOnChange = (e) => {
        const changeButton = document.getElementById(`${id}`);
        setNewDueDate(e.target.value);
        changeButton.style.display = "block"
    }

    const submitTag = async e => {
        e.preventDefault();
        if( tag.length > 0){
            const tagsDup = [...tags, tag]
            setTags(old => [...old, tag]);
            const newTodo = {
                id: id,
                description: todo.description,
                dueDate: todo.dueDate,
                done: todo.done,
                inProgress: todo.inProgress,
                tags: tagsDup
            };
            setTodo(newTodo);
            await todoAPIUtil.updateTodo(newTodo)
        }
        setTag("");

    }

    const removeTag = e => {
        e.preventDefault()
        const tagIndex = e.target.value
        // setTags(old => old = tagIndex === 0 ? old.slice(1) : old.slice(0 , tagIndex ).concat(old.slice(tagIndex + 1)))
        const tempTags = [...tags]
        tempTags.splice(tagIndex, 1)
        setTags( tempTags)
        todoAPIUtil.updateTodo(
            {
                id: id,
                description: todo.description,
                dueDate: todo.dueDate,
                done: todo.done,
                inProgress: todo.inProgress,
                tags: tempTags
            }
        )

    }

    
    const statusButtons = status => {
        if(status === "upcoming"){
            return(
                <div className="status-buttons">
                    <p>Move to:   </p>
                    <button value="In Progress" onClick={e => onClickUpdateStatus(e) }>In Progress</button>
                    <button value="Done" onClick={e => onClickUpdateStatus(e)}>Done</button>
                </div>
            )
        } else if( status === "inProgress"){
            return(
                <div className="status-buttons">
                    <p>Move to:   </p>
                    <button value="Upcoming" onClick={e => onClickUpdateStatus(e)}>Upcoming</button>
                    <button value="Done" onClick={e => onClickUpdateStatus(e) }>Done</button>
                </div>
            )
        } else if(status === "done"){
            return(
                <div className="status-buttons">
                    <p>Move to:   </p>
                    <button value="Upcoming" onClick={e => onClickUpdateStatus(e) }>Upcoming</button>
                    <button value="In Progress" onClick={e => onClickUpdateStatus(e) }>In Progress</button>
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
                            <button onClick={e => removeTag(e)} value={i} key={i}>{tag}</button>
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
                            defaultValue={newDueDate} >
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
