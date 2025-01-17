require('dotenv').config();
const express = require('express');
const RunServer = require('./database/connection');
const cors = require('cors');
const todoRouter = require('./routes/todolist_routes');
const app = express();

const port = process.env.PORT || 3000;

// Define the allowed origins
const allowedOrigins = [
  'https://react-todo-list-2ml3.onrender.com', // Production URL
  'http://localhost:5173', // Local development URL
];

// CORS middleware configuration
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); 
    } else {
      callback(new Error('Not allowed by CORS')); 
    }
  }
}));

// Set up middleware and routes
app.use(express.json());
RunServer();
app.use('/todolist', todoRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
