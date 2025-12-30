require('dotenv').config();
const express = require('express');
const RunServer = require('./database/connection');
const cors = require('cors');
const todoRouter = require('./routes/todolist_routes');
const app = express();

const port = process.env.PORT || 3000;

const allowedOrigins = [
  'https://react-todo-list-4jyj.onrender.com',
  'http://localhost:5173',
  'http://51.20.138.101'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('CORS Error:', origin); // Log the origin causing issues
      callback(new Error('Not allowed by CORS'));
    }
  }
}));


app.use(express.json());
RunServer();
app.use('/todolist', todoRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log("Server running on port:", process.env.PORT);

});
