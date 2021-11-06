const validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateRegisterTodo(data) {
    let error = {};
    data.description = validText(data.description) ? data.description : '';
    if
}