import React from 'react'
import {useState} from "react"

const TodoDisplay = ({todo, id}) => {
    const [tags, setTags] = useState(todo.tags)
    const [tag, setTag] = useState("")
    const todoDuedate = todo.dueDate.split("/"); 
    const currentDate = new Date();
    let pastDue = undefined;

    const submitTag = e => {
        e.preventDefault();
        if( tag.length > 0){
            setTags(old => [...old, tag]);
        }
        setTag("");
        console.log(tags)

    }    

    currentDate.toLocaleDateString().split("/").forEach((date, i)=> {
        // console.log(parseInt(date) > parseInt(todoDuedate[i]))
        if( parseInt(date) > parseInt(todoDuedate[i])){
            pastDue = true;
        }
    })
    console.log(pastDue)
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
                        <label >Due: {todo.dueDate}</label>
                        < input type="date" className="dueDate" ></input >
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
