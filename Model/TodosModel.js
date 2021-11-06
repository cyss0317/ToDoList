const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    // status
    // type = marketing, production
    // duedate
    // added date
    // description

    description: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        required: true,
    },
    inProgress: {
        type: Boolean,
        required: true
    },
    dueDate:{
        type: String,
        required: true
    }
},
    {timestamps: true}
);

const Todo = mongoose.model("todo", TodoSchema)
module.exports = Todo;
