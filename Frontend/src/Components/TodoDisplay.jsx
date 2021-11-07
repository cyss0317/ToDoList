import React from 'react'
const TodoDisplay = ({todo, id}) => {
    const todoDuedate = todo.dueDate.split("/"); 
    const currentDate = new Date();
    let pastDue = undefined;
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
                        todo.tags.map((tag, i) => (
                            <button key={i}>{tag}</button>
                        ))
                    }
                    <p>Due: {todo.dueDate}</p>
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
