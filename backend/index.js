require('dotenv').config();

const express = require('express')

const RunServer = require('./database/connection')

const cors = require('cors')

const todoRouter = require('./routes/todolist_routes')

const app = express()

const port = process.env.PORT || 3000;

app.use(express.json())
app.use(cors({
    origin: 'https://react-todo-list-2ml3.onrender.com', 
  }));

RunServer()

app.use('/todolist', todoRouter)

app.listen(port, ()=> {

console.log(`server is running on ${port}`) })