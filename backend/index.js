require('dotenv').config()
const express = require('express')
const RunServer = require('./database/connection')
const cors = require('cors')
const todoRouter = require('./routes/todolist_routes')

const app = express()
const port = process.env.PORT || 3000

// Simple CORS
app.use(cors())
app.use(express.json())

RunServer()

// Mount router at /api
app.use('/todolist', todoRouter)

// Optional health check
app.get('/todolist', (req, res) => {
  res.json({ message: 'API is working' })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
