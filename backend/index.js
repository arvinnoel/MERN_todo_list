require('dotenv').config();

const express = require('express')

const RunServer = require('./database/connection')

const cors = require('cors')

const todoRouter = require('./routes/todolist_routes')

const app = express()

const port = 3000;

app.use(express.json())

app.use(cors())

RunServer()

app.use('/todolist', todoRouter)

app.listen(port, ()=> {

console.log(`server is running on ${port}`) })