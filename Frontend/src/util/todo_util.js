import axios from 'axios';

export const createTodo = data => {
    return axios.post('/api/todos/create', data)
}

export const updateTodo = todo => {
    return axios.put(`/api/todos/${todo.id}`, todo)
}

export const deleteTodo = todoId => {
    return axios.delete(`/api/todos/${todoId}`)
}

export const getTodo = todoId => {
    return axios.get(`/api/todos/${todoId}`)
}

export const getTodos = () => {
    return axios.get(`/api/todos/`)
}