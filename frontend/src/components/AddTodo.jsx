import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './AddTodo.css'
import 'react-toastify/dist/ReactToastify.css';
export default function AddTodo() {
  const [message, setMessage] = useState('');

  const createToDo = async () => {
    // Validate message
    if (!message) {
      toast.error('Cannot add an empty message');
      return;
    }

    if (message.length < 4 || message.length > 20) {
      toast.error('Message must be between 4 and 20 characters');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/todolist/createtodo', {
        message,
      });

      if (response.data.success === 'created') {
        toast.success('Todo created successfully');
        // alert('Todo created successfully');
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while creating the Todo');
    }
  };

  return (
    <div className="container">
      {/* Input for message */}
      <input
        type="text"
        placeholder="Add todo here"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="todo-input"
      />
      <button onClick={createToDo} className="todo-button">
        Add Todo
      </button>
    </div>
  );
}
