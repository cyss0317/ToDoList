import logo from './logo.svg';
import './App.css';
import {useState, useEffect, useMemo } from "react";
import Todos from "./Components/Todos";
import * as todoAPIUtil from "./util/todo_util"



// import axios from "axios"
// const todos = 
//   [
//     {
//       "_id": "6186b7603810cc944ef20849",
//       "description": "Studying for React",
//       "done": false,
//       "dueDate": "2021-11-06",
//       "inProgress": false,
//       "tags": ["hooks", "react", "study"]
//     },
//     {
//       "_id": "6186db2d3810cc944ef2084a",
//       "description": "Workout for today",
//       "done": false,
//       "inProgress": true,
//       "dueDate": "2021-11-06",
//       "tags": ["health", "chest day", "morning"]
//     },
//     {
//       "_id": "6186db6c3810cc944ef2084b",
//       "description": "practice assessment",
//       "done": true,
//       "inProgress": false,
//       "dueDate": "2021-11-10",
//       "tags": ["study", "Comapny: Wingz"]
//     }
//   ];

const App = () => {
  const [todos, setTodos] = useState([]);
  const [unDones, setUnDones] = useState([]);
  const [progress, setProgress] = useState([]);
  const [dones, setDones ] = useState([]);
  // const b = todoAPIUtil.createTodo(
  //   { 
  //     description: "why not working",
  //     tags: ["hooks"]
  //   }
  // )
  // console.log(b)

  window.unDones = unDones;
  window.progress = progress;
  window.dones =dones ;

  useEffect(()=> {

    const fetchTodos = async () => {
      const response = await todoAPIUtil.getTodos()
      const data = response.data
      setTodos(data)
      console.log("data from App.js", data)
      console.log(`todos from App.js`, todos)
      console.log("App.js rendering")
    }
    todos.length === 0 ? fetchTodos() : console.log(todos)
    // fetchTodos();

    todos.forEach(todo => {
      if (todo.done) {
        setDones(old => [...old, todo])
      } else if (!todo.done && todo.inProgress) {
        setProgress(old => [...old, todo])
      } else if (!todo.done && !todo.inProgress) {
        setUnDones(old => [...old, todo])
      }
    })
    console.log(unDones)
    console.log(progress)
    console.log(dones)

  },[todos])

  return (
    <div className="custom-shape-divider-top-1636227455" className="App">
      <span className="modal" style={{ display: "none" }}>

      </span>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
        </svg>
        <section className="containers">
          <Todos status="upcoming" propTodos={unDones} title="Upcoming"  className="todo-list" />
          <Todos status="inProgress" propTodos={progress} title="In Progress"  className="progress" />
          <Todos status="done" propTodos={dones} title="Done"  className="done" />
        </section>

     
    </div>
  );
}

export default App;
