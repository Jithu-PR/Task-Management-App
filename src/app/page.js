'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import TodoItem from './components/todoItem';
import { BsDashCircleDotted } from "react-icons/bs";

export default function Home() {

  const [isScreen,setisScreen] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const [allTodos,setallTodos] = useState([]);
  const [allCompletedTodos,setallCompletedTodos] = useState([]);
  const [todoItem , setTodoItem] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [newTitle,setNewTitle] = useState("");
  const [newDescription,setNewDescription] = useState("");
  const [newDate,setNewDate] = useState("");

  const handleAddTodos = async(e)=> {
    e.preventDefault();

    try{
        setIsLoading(true);
        const response = await axios.post("/api/todolist", {title: newTitle, 
          description: newDescription, 
          deadline: newDate});
        setNewTitle("");
        setNewDescription("");
        setNewDate("");
        getAllTodo();
    }catch(e) {
      console.log(e);
    }finally {
      setIsLoading(false);
    }
  }

  const getAllTodo = async()=> {

    try{
      setIsLoading(true);
      const response = await axios.get("/api/todolist");
      setallTodos(response.data);
      
    }catch(e) {
      console.log(e);
    }finally {
      setIsLoading(false);
    }
  }

  const handleEditTodo = async(currentTodoitem)=> {
    try{
      setIsLoading(true);
      setIsEdit(true);
      setNewTitle(currentTodoitem.title);
      setNewDescription(currentTodoitem.description);
      setNewDate(currentTodoitem.deadline);
      setTodoItem(currentTodoitem);
    }catch(e) {
      console.log((e));
    }finally {
      setIsLoading(false);
    }
  }

 const handleUpdateTodo = async(e)=> {
  e.preventDefault();
    try{
      setIsLoading(true);
      setNewTitle(newTitle);
      setNewDescription(newDescription);
      setNewDate(newDate);
      const response = await axios.put(`/api/todolist?id=${todoItem._id}`,{title: newTitle, 
        description: newDescription, 
        deadline: newDate});
      setIsEdit(false);
      setTodoItem({});
      setNewTitle("");
      setNewDescription("");
      setNewDate("");
      getAllTodo();
    }catch(e) {
      console.log(e);
    }finally {
      setIsLoading(false);
    }
 }

  const handleCompleteTodo = async(currentTodoItem)=> {
    try{
      setIsLoading(true);
      const response = await axios.post("/api/completedTodolist", {title: currentTodoItem.title, 
        description: currentTodoItem.description, 
        deadline: currentTodoItem.deadline});
        console.log(response.status);
        if(response.status === 201) {
          handleDeleteTodo(currentTodoItem._id);
          getAllTodo();
        }
    }catch(e) {
      console.log((e));
    }finally {
      setIsLoading(false);
    }
  }

  const getAllCompletedTodo = async()=> {

    try{
      setIsLoading(true);
      const response = await axios.get("/api/completedTodolist");
      setallCompletedTodos(response.data);
    }catch(e) {
      console.log(e);
    }finally {
      setIsLoading(false);
    }
  }

  const handleDeleteTodo = async(currentTodoId)=> {
    try {
      setIsLoading(true);
      const response = await axios.delete(`/api/todolist?id=${currentTodoId}`);
      console.log("Todo deleted:", response.data);
      getAllTodo();

    } catch (error) {
      console.log("Error deleting todo:", error);
    }finally {
      setIsLoading(false);
    }
  }

  const handleDeleteCompletedTodo = async(currentTodoId)=> {
    try {
      setIsLoading(true);
      const response = await axios.delete(`/api/completedTodolist?id=${currentTodoId}`);
      console.log("Completed Todo deleted:", response.data);
      getAllCompletedTodo();

    } catch (error) {
      console.log("Error deleting todo:", error);
    }finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllTodo();
    getAllCompletedTodo();
  }, [])

  
  

  return (

      <div className="bg-[#1f1e1e] text-white overflow-hidden min-h-screen">
      <h1 className="text-center">To-Do List</h1>
      <div className='bg-[#1f1e1e] p-[2%] mx-auto mt-[3%] max-h-[80%] overflow-y-auto shadow-[0px_5px_7px_black]'>
        <div className='flex items-center justify-center border-t border-b border-gray-400 py-6 mb-6'>
          <div className='flex flex-col items-start ml-6 mr-6'>
            <label className="font-bold mb-2.5">Title</label>
            <input type='text' className='text-black' value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder='What is the Title'></input>
          </div>
          <div className='flex flex-col items-start mr-6'>
            <label className="font-bold mb-2.5">Description</label>
            <input className="text-black focus:outline-none focus:ring-2 focus:ring-[#00e67a]" type='text' value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder='What is the Description'></input>
          </div>
          <div className='flex flex-col items-start mr-6'>
            <label className="font-bold mb-2.5">Deadline</label>
            <input className="text-black focus:outline-none focus:ring-2 focus:ring-[#00e67a]" type='date' value={newDate} onChange={(e)=>setNewDate(e.target.value)}></input>
          </div>
          <div className='flex flex-col items-start mr-6'>
            {
              isEdit !== true
              ? <button type='button' className='bg-[#00e67a] text-white border-none rounded-none mt-6 p-2.5 w-15 cursor-pointer hover:bg-[#00a34e]' onClick={handleAddTodos}>Add</button>
              : <button type='button' className='bg-[#00e67a] text-white border-none rounded-none mt-6 p-2.5 w-15 cursor-pointer hover:bg-[#00a34e]' onClick={handleUpdateTodo}>Edit</button>
            }
          </div>
        </div>
          <div className='mb-3.5'>
            <div>
              <button className={`text-white border-none rounded-none mt-6 p-2 cursor-pointer ${!isScreen ? 'bg-[#00e67a]' : 'bg-[#494949]'} w-15`} onClick={()=>{setisScreen(false)}}>ToDo</button>
              <button className={`text-white border-none rounded-none mt-6 p-2 cursor-pointer ${isScreen ? 'bg-[#00e67a]' : 'bg-[#494949]'} w-auto`} onClick={()=>{setisScreen(true)}}>Complete</button>
            </div>
            <div className='flex flex-col'>
            {
              (isScreen === false ? allTodos : allCompletedTodos) && 
              (isScreen === false ? allTodos : allCompletedTodos).length > 0 ?
                (isScreen === false ? allTodos : allCompletedTodos).map((todoItem) => (
                  <TodoItem
                    key={todoItem._id}
                    todoItem={todoItem}
                    handleCompleteTodo={handleCompleteTodo}
                    handleEditTodo={handleEditTodo}
                    handleDeleteTodo={handleDeleteTodo}
                    handleDeleteCompletedTodo={handleDeleteCompletedTodo}
                    isCompleted={isScreen === true}
                />
    )) : (
      <p>No todos available</p>
    )
}
            </div>
        </div>
      </div>
    </div>
  );
}
