import React from 'react'
import {useState} from "react"

const TodoDisplay = ({props, todo, id, status}) => {
    const [tags, setTags] = useState(todo.tags);
    const [tag, setTag] = useState("");
    const [newDueDate, setNewDueDate] = useState(todo.dueDate);

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
                    <button>In Progress</button>
                    <button>Done</button>
                </div>
            )
        } else if( status === "inProgress"){
            return(
                <div className="status-buttons">
                    <p>Move to:   </p>
                    <button>Upcoming</button>
                    <button>Done</button>
                </div>
            )
        } else if(status === "done"){
            return(
                <div className="status-buttons">
                    <p>Move to:   </p>
                    <button>Upcoming</button>
                    <button>In Progress</button>
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
                        <button style={{display: "block"}} className="X-button">X</button>
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
