const express = require('express')
const { createToDo, updateToDo, deleteToDo, getAllToDo} = require('../controllers/todolist_controller')

const todoRouter = express.Router()

todoRouter.get('/getall', getAllToDo)
todoRouter.post('/createtodo', createToDo)
todoRouter.put('/updateTodo/:id', updateToDo)
todoRouter.delete('/deletetodo/:id', deleteToDo)

module.exports = todoRouter