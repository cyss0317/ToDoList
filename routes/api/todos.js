const express = require("express");
const router = express.Router();
const Todo = require("../../model/TodosModel");
const validateRegisterTodo = require("../../validation/todo_validation");

router.get("/test", (req, res) => {
    res.json({msg: "this is the note route"});
});

router.get("/:id", (req, res) => {
    const todo = Todo.findById(req.params.id)
        .then( todo => res.json(todo) )
        .catch( err => res.status(404).json(err))
});

router.post("/create", (req, res) => {
    console.log(req)
    const { errors, isValid } = validateRegisterTodo(req.body);

    if(!isValid) return res.status(400).json(errors)

    const newTodo = new Todo({
        description: req.body.description,
        done: false,
        inProgress: false,
        dueDate: req.body.dueDate ? req.body.dueDate : new Date().toLocaleDateString()
    })
    newTodo.save()
        .then(newTodo => res.json(newTodo))
        .catch(err => console.log(err))
})

router.delete("/:id", (req, res) => {
    const todo = Todo.findById(req.params.id)
        .then( todo => Todo.remove(todo))
        .then( () => res.json({message: "Successfully deleted"}))
        .catch(err => res.status(404).json(err))
})

router.put("/:_id", (req, res)=> {
    Todo.findOneAndUpdate({_id: req.params.id},
        {
            description: req.body.description,
            done: req.body.done,
            inProgress: req.body.inProgress,
            dueDate: req.body.dueDate 
        }, {new: true}, (err, data) => {
            data ? res.json(data) : res.json(err)
        }    
    )
})

module.exports = router;
