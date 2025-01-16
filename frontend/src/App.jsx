import Header from "./components/Header";
import AddTodo from "./components/AddTodo";
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import TodoList from "./components/TodoList";
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <>
      <Header />
      <AddTodo />
     <TodoList />
      <ToastContainer /> 
    </>
  );
}