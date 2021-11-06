const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const todos = require("./routes/api/todos");

mongoose
    .connect(db, {useNewUrlParser: true})
    .then( (res) => console.log("Connected to MongoDB"))
    .catch( err => console.log(err))

app.get("/", (req, res) => {
    res.send("Hello hello")
})

app.use("/api/todos", todos)

const port = process.env.PORT || 5000;

app.listen(port, () => {console.log(`Listening on port ${port}`)})