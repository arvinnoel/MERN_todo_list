require('dotenv').config();
const express = require('express');
const RunServer = require('./database/connection');
const cors = require('cors');
const todoRouter = require('./routes/todolist_routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());          // simple & correct
app.use(express.json());

RunServer();

// API ROUTES
app.use('/api', todoRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
