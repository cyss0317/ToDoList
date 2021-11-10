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

router.get("/", (req, res) => {
    Todo.find()
        .then(todos => res.json(todos))
        .catch( err => res.status((404).json(err)))
})

router.post("/create", (req, res) => {

    const { errors, isValid } = validateRegisterTodo(req.body);

    if(!isValid) return res.status(400).json(errors)
    const currentDate = new Date();
    const todayMonth = currentDate.getUTCMonth() + 1;
    const todayDay = currentDate.getUTCDate();
    const todayYear = currentDate.getUTCFullYear();

    const newTodo = new Todo({
        //question: 

        description: req.body.description,
        done: req.body.done,
        inProgress: req.body.inProgress,
        dueDate: req.body.dueDate ? req.body.dueDate : `${todayYear}-${todayMonth}-${todayDay}`,
        tags: []
    })
    window.req = req.body
    newTodo.save()
        .then(newTodo => res.json(newTodo))
        .catch(err => console.log(err))
})

router.delete("/:id", (req, res) => {
    const todo = Todo.findOneAndRemove({_id: req.params.id})
        .then( () => res.json({todoDeleted: "Successfully delete"}))
        .catch( err => res.status(404).json(err))
        // .then( todo => Todo.remove(todo))
        // .then( () => res.json({message: "Successfully deleted"}))
        // .catch(err => res.status(404).json(err))
})

//question: 
router.put("/:id", (req, res)=> {
    Todo.findOneAndUpdate({_id: req.params.id},
        {
            description: req.body.description,
            done: req.body.done,
            inProgress: req.body.inProgress,
            dueDate: req.body.dueDate,
            tags: req.body.tags
            // description: req.body.description ? req.body.description : res.body.description,
            // done: req.body.done ? req.body.done : res.body.done,
            // inProgress: req.body.inProgress ? req.body.inProgress : res.body.inProgress,
            // dueDate: req.body.dueDate ? req.body.dueDate : res.body.dueDate
        }, {new: true}, (err, data) => {
            data ? res.json(data) : res.json(err)
        }    
    )
})

module.exports = router;
