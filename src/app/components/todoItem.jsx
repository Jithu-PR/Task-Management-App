'use client';
import React from 'react';
import { FiCheck, FiClipboard } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';

const TodoItem = ({
  todoItem,
  handleCompleteTodo,
  handleEditTodo,
  handleDeleteTodo,
  handleDeleteCompletedTodo,
  isCompleted,
}) => {
  return (
    <div
      key={todoItem._id}
      className="bg-black-500 flex items-center justify-between p-6 pt-2 pb-2 mt-2 mb-2 shadow-md"
    >
      <div>
        <h3 className="text-xl text-[#00e67a] font-bold m-0">
          {todoItem.title}
        </h3>
        <p className="text-[14px] text-[#838383] mt-2">
          {todoItem.description}
        </p>
        <p className="text-[14px] text-[#838383] mt-2">
          Complete by: {todoItem.deadline.substring(0, 10)}
        </p>
      </div>
      <div className="flex items-center space-x-3">
        {!isCompleted && (
          <>
            <FiCheck
              className="text-[25px] mr-2.5 cursor-pointer text-[#00e67a] hover:text-[#04c46a]"
              onClick={() => {
                handleCompleteTodo(todoItem._id);
              }}
              title="Complete?"
            />
            <FiClipboard
              className="text-[25px] mr-2.5 cursor-pointer text-white hover:text-blue-500"
              onClick={() => {
                handleEditTodo(todoItem);
              }}
              title="Edit?"
            />
          </>
        )}
        <AiOutlineDelete
          className="text-4xl cursor-pointer hover:text-red-500"
          onClick={() => {
            isCompleted
              ? handleDeleteTodo(todoItem._id)
              : handleDeleteTodo(todoItem._id);
          }}
          title="Delete?"
        />
      </div>
    </div>
  );
};

export default TodoItem;
