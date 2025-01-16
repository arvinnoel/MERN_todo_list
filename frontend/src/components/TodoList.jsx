import { useEffect, useState } from 'react';
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);  // Default to an empty array
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({ _id: null, message: "" });
  const [loading, setLoading] = useState(true);  // Loading state
  const apiUrl = process.env.REACT_APP_API_URL;

  // Fetch all todos
  const getAllTodos = async () => {
    setLoading(true); // Start loading when fetching data
    try {
      const response = await axios.get(`${apiUrl}/todolist/getall`);
      setTodos(response.data.data || []);  // Ensure response is handled even if empty
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch todos.');
    } finally {
      setLoading(false);  // Stop loading after fetch
    }
  };

  useEffect(() => {
    getAllTodos();
  }, []);  // Fetch todos when component mounts

  // Start editing a todo
  const handleEdit = (todo) => {
    setIsEditing(true);
    setCurrentTodo({ _id: todo._id, message: todo.message });
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentTodo({ _id: null, message: "" });
  };

  // Update a todo
  const handleUpdate = async () => {
    if (currentTodo.message.length < 4 || currentTodo.message.length > 20) {
      toast.error('Message must be between 4 and 20 characters.');
      return;
    }

    try {
      const result = await axios.put(`${apiUrl}/todolist/updateToDo/${currentTodo._id}`, {
        message: currentTodo.message,
      });

      if (result.data.success === 'updated') {
        toast.success('Todo updated successfully!');
        setCurrentTodo({ _id: null, message: "" });
        setIsEditing(false);
        getAllTodos();  // Refresh the todos after update
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update todo.');
    }
  };

  // Delete a todo
  const handleDelete = async (id) => {
    try {
      const result = await axios.delete(`${apiUrl}/todolist/deleteToDo/${id}`);
      if (result.data.success === 'deleted') {
        toast.success('Todo deleted successfully!');
        getAllTodos();  // Refresh the todos after delete
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete todo.');
    }
  };

  return (
    <div className="todo-list-container">
      <h2>Todo List</h2>
      {isEditing ? (
        <div className="edit-container">
          <input
            type="text"
            value={currentTodo.message}
            onChange={(e) => setCurrentTodo({ ...currentTodo, message: e.target.value })}
            className="edit-input"
          />
          <button onClick={handleUpdate} className="update-button">Update</button>
          <button onClick={handleCancelEdit} className="cancel-button">Cancel</button>
        </div>
      ) : (
        <ul className="todo-list">
          {loading ? (
            <li>Loading...</li>  // Show loading while fetching todos
          ) : todos.length > 0 ? (
            todos.map((todo) => (
              <li key={todo._id} className="todo-item">
                <span>{todo.message}</span>
                <AiFillEdit
                  className="icon edit-icon"
                  onClick={() => handleEdit(todo)}
                />
                <AiOutlineDelete
                  className="icon delete-icon"
                  onClick={() => handleDelete(todo._id)}
                />
              </li>
            ))
          ) : (
            <li className="no-todos">No todos available</li>  // Show message when no todos
          )}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
