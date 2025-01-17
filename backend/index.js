require('dotenv').config();
const express = require('express');
const RunServer = require('./database/connection');
const cors = require('cors');
const todoRouter = require('./routes/todolist_routes');
const app = express();

const port = process.env.PORT || 3000;

const allowedOrigins = [
  'https://react-todo-list-2ml3.onrender.com', 
  'http://localhost:5173', 
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); 
    } else {
      callback(new Error('Not allowed by CORS')); 
    }
  }
}));

app.use(express.json());
RunServer();
app.use('/todolist', todoRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
