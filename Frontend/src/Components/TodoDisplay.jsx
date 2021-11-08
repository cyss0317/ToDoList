import React from 'react'
import {useState} from "react"

const TodoDisplay = ({todo, id}) => {
    const [tags, setTags] = useState(todo.tags)
    const [tag, setTag] = useState("")
    // const todoDuedate = todo.dueDate; 
    const todoDuedate = todo.dueDate.split("-"); 

    let pastDue = undefined;
console.log(todo.dueDate)
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

    const [dueYear, dueMonth, dueDay] = todo.dueDate.split("-");

    if(parseInt(dueYear) < todayYear || parseInt(dueMonth) < todayMonth || parseInt(dueDay) < todayDay) pastDue = true;

    return (
        <div className="todo" value={id} draggable="true">
            <div>
                <div>
                    <p className="description">{todo.description}</p>
                    {
                        tags.map((tag, i) => (
                            <button key={i}>{tag}</button>
                        ))
                    }
                    <form className="tag-input" onSubmit={e => submitTag(e)}>
                        <input type="text" onChange={e => setTag(e.target.value) }  value={tag} placeholder="Add Tags to this"/>
                    </form>
                    {/* <form action=""> */}
                        <button onClick={e => expandTag(e)} className="current-dueDate" >Due: {todo.dueDate}</button>
                        <form >
                            < input type="date" className="dueDate" onChange={e => console.log(e.target.value)} onClick={e => console.log(e.currentTarget.value)} value={todo.dueDate} ></input >
                        </form>
                    {/* </form> */}
                    {
                        pastDue ? 
                        <p style={{color: "red"}}>Past Due</p>
                        :
                        <></>
                    }
                </div>

            </div>
            <div>
                <button className="X-button">X</button>
            </div>
        </div>
    )
}

export default TodoDisplay
