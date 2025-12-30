import { useEffect, useState } from 'react';
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({ _id: null, message: "" });
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllTodos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/todolist/getall`);
      setTodos(response.data.data || []);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch todos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  const handleEdit = (todo) => {
    setIsEditing(true);
    setCurrentTodo({ _id: todo._id, message: todo.message });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentTodo({ _id: null, message: "" });
  };

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
        getAllTodos();
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update todo.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await axios.delete(`${apiUrl}/todolist/deleteToDo/${id}`);
      if (result.data.success === 'deleted') {
        toast.success('Todo deleted successfully!');
        getAllTodos();
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
            <li>Loading...</li>
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
            <li className="no-todos">No todos available</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default TodoList;