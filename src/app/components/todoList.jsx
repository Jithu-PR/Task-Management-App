'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import TodoItem from './todoItem';

const initialState = {
  title: '',
  description: '',
  deadline: '',
};

export default function TodoList() {
  const [isScreen, setIsScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [todo, setTodo] = useState(initialState);
  const [todoItem, setTodoItem] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const { toast } = useToast();

  const handleAddTodos = async (e) => {
    e.preventDefault();
    if (!todo.title || !todo.description || !todo.deadline) {
      toast({
        title: 'All fields are required',
        variant: 'destructive',
      });
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post('/api/todolist', todo);
      if (response.status === 201) {
        setAllTodos((prevTodos) => [...prevTodos, response.data.newTodo]);
        setTodo(initialState);
        toast({
          title: response.data.message || 'Todo added successfully',
        });
      } else {
        toast({
          title: response.data.message || 'Something went wrong',
          variant: 'destructive',
        });
      }
    } catch (e) {
      console.log(e);
      toast({
        title: 'An error occurred while adding the todo.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getAllTodo = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/todolist');
      setAllTodos(response.data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditTodo = async (currentTodoitem) => {
    try {
      setIsLoading(true);
      setIsEdit(true);
      setTodo((prevState) => ({
        ...prevState,
        title: currentTodoitem.title,
        description: currentTodoitem.description,
        deadline: currentTodoitem.deadline,
      }));
      setTodoItem(currentTodoitem);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateTodo = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.put(
        `/api/todolist?id=${todoItem._id}`,
        todo,
        { completed: false }
      );
      if (response.status === 200) {
        setAllTodos((prevTodos) => {
          return prevTodos.map((todo) =>
            todo._id === todoItem._id
              ? { ...todo, ...response.data.updatedTodo }
              : todo
          );
        });
        toast({
          title: response.data.message || 'Todo edited successfully',
        });
      } else {
        toast({
          title: response.data.message || 'Something went wrong',
          variant: 'destructive',
        });
      }
      setIsEdit(false);
      setTodoItem({});
      setTodo(initialState);
    } catch (e) {
      console.log(e);
      toast({
        title: 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteTodo = async (currentTodoId) => {
    try {
      setIsLoading(true);
      const response = await axios.put(`/api/todolist?id=${currentTodoId}`, {
        completed: true,
      });
      if (response.status === 200) {
        setAllTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === currentTodoId ? { ...todo, completed: true } : todo
          )
        );
        toast({
          title: response.data.message || 'Todo marked as completed',
        });
      } else {
        toast({
          title: response.data.message || 'Something went wrong',
          variant: 'destructive',
        });
      }
    } catch (e) {
      console.log(e);
      toast({
        title: 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTodo = async (currentTodoId) => {
    try {
      setIsLoading(true);
      const response = await axios.delete(`/api/todolist?id=${currentTodoId}`);
      if (response.status === 200) {
        toast({
          title: response.data.message || 'Todo deleted',
        });
      } else {
        toast({
          title: response.data.message || 'Something went wrong',
          variant: 'destructive',
        });
      }
      setAllTodos((prevTodos) =>
        prevTodos.filter((todo) => todo._id !== currentTodoId)
      );
    } catch (error) {
      console.log('Error deleting todo:', error);
      toast({
        title: 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllTodo();
  }, []);

  return (
    <div
      className={`bg-[#1f1e1e] text-white overflow-hidden min-h-screen transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}
    >
      <h1 className="text-center text-4xl mt-5">To-Do List</h1>
      <div className="bg-[#1f1e1e] p-[2%] mx-auto mt-[3%] max-h-[80%] overflow-y-auto shadow-[0px_5px_7px_black]">
        <div className="flex items-center justify-center border-t border-b border-gray-400 py-6 mb-6">
          <div className="flex flex-col items-start ml-6 mr-6">
            <label className="font-bold mb-2.5">Title</label>
            <input
              type="text"
              className="text-black"
              value={todo.title}
              onChange={(e) =>
                setTodo((prevState) => ({
                  ...prevState,
                  title: e.target.value,
                }))
              }
              placeholder="What is the Title"
            ></input>
          </div>
          <div className="flex flex-col items-start mr-6">
            <label className="font-bold mb-2.5">Description</label>
            <input
              className="text-black focus:outline-none focus:ring-2 focus:ring-[#00e67a]"
              type="text"
              value={todo.description}
              onChange={(e) =>
                setTodo((prevState) => ({
                  ...prevState,
                  description: e.target.value,
                }))
              }
              placeholder="What is the Description"
            ></input>
          </div>
          <div className="flex flex-col items-start mr-6">
            <label className="font-bold mb-2.5">Deadline</label>
            <input
              className="text-black focus:outline-none focus:ring-2 focus:ring-[#00e67a]"
              type="date"
              value={todo.deadline}
              onChange={(e) =>
                setTodo((prevState) => ({
                  ...prevState,
                  deadline: e.target.value,
                }))
              }
            ></input>
          </div>
          <div className="flex flex-col items-start mr-6">
            {isEdit !== true ? (
              <button
                type="button"
                className="bg-[#00e67a] text-white border-none rounded-none mt-6 p-2.5 w-15 cursor-pointer hover:bg-[#00a34e]"
                onClick={handleAddTodos}
              >
                Add
              </button>
            ) : (
              <button
                type="button"
                className="bg-[#00e67a] text-white border-none rounded-none mt-6 p-2.5 w-15 cursor-pointer hover:bg-[#00a34e]"
                onClick={handleUpdateTodo}
              >
                Edit
              </button>
            )}
          </div>
        </div>
        <div className="mb-3.5">
          <div>
            <button
              className={`text-white border-none rounded-none mt-6 p-2 cursor-pointer ${!isScreen ? 'bg-[#00e67a]' : 'bg-[#494949]'} w-15`}
              onClick={() => {
                setIsScreen(false);
              }}
            >
              ToDo
            </button>
            <button
              className={`text-white border-none rounded-none mt-6 p-2 cursor-pointer ${isScreen ? 'bg-[#00e67a]' : 'bg-[#494949]'} w-auto`}
              onClick={() => {
                setIsScreen(true);
              }}
            >
              Complete
            </button>
          </div>
          <div className="flex flex-col">
            {allTodos && allTodos.length > 0 ? (
              allTodos
                .filter((todo) => (isScreen ? todo.completed : !todo.completed))
                .map((todoItem) => (
                  <TodoItem
                    key={todoItem._id}
                    todoItem={todoItem}
                    onCompleteTodo={handleCompleteTodo}
                    onEditTodo={handleEditTodo}
                    onDeleteTodo={handleDeleteTodo}
                  />
                ))
            ) : (
              <p>No todos available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
