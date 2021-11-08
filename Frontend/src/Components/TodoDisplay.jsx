import React from 'react'
import {useState} from "react"

const TodoDisplay = ({todo, id, status}) => {
    const [tags, setTags] = useState(todo.tags);
    const [tag, setTag] = useState("");
    const [newDueDate, setNewDueDate] = useState(todo.dueDate);

    let pastDue = undefined;

    const expandTag = e => {
        e.preventDefault();

        const dateInput = document.getElementsByClassName("dueDate");
        console.log(dateInput)
        if( dateInput.display === "none"){
            dateInput.display = "block";
        } else {
            dateInput.display = "none"
        }
    }

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
    const currentDate = new Date();
    const todayMonth = currentDate.getUTCMonth() + 1;
    const todayDay = currentDate.getUTCDate();
    const todayYear = currentDate.getUTCFullYear();

    const [dueYear, dueMonth, dueDay] = newDueDate.split("-");
    
    if(parseInt(dueYear) < todayYear || parseInt(dueMonth) < todayMonth || parseInt(dueDay) < todayDay) pastDue = true;
    
    return (
        <div className="todo" value={id} draggable="true">
            <div>
                <div>
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
                <div className="done-progress-container">
                    <div>
                        <p>Done</p>
                        {/* {
                            todo.done === true ?
                                <div>
                                    <label htmlFor="true">true</label>
                                    <input type="radio" name="done-done" value="true" checked />
                                    <label htmlFor="false">false</label>
                                    <input type="radio" name="done-done" value="false" />
                                </div>
                                :
                                <div>
                                    <label htmlFor="true">true</label>
                                    <input type="radio" name="done-progress" value="true"  />
                                    <label htmlFor="false">false</label>
                                    <input type="radio" name="done-progress" value="false" checked />
                                </div>

                        } */}
                        {/* <label htmlFor="true">true</label>
                            <input type="radio" value="true" />
                        <label htmlFor="false">false</label>
                            <input type="radio" value="false" /> */}
                    </div>
                    <div className="inProgress-button">
                        <p>In Progress</p>
                            {/* {
                                todo.inProgress === true ?
                                <form>
                                    <label htmlFor="true">true</label>
                                    <input type="radio" name="progress-done" value="true" checked />
                                    <label htmlFor="false">false</label>
                                    <input type="radio" name="progress-done" value="false"  />
                                </form>
                                :
                                <div>
                                    <label htmlFor="false">false</label>
                                    <input type="radio" name="progress-progress" value="true" />
                                    <label htmlFor="false">false</label>
                                    <input type="radio" name="progress-progress" value="false" checked />
                                </div>

                            } */}
                            {/* <input type="radio" value="true"/>
                        <label htmlFor="false">false</label>
                            <input type="radio" value="false" /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoDisplay
