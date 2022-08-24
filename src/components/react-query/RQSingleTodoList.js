import React, { useState } from 'react'
import { v4 as uuid } from "uuid";
import { BsCheckCircle, BsCircle } from "react-icons/bs";
import { RiCloseLine } from "react-icons/ri";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {getTodos,addTodo,updateTodo,deleteTodo} from '../../../src/api/todoApi'

const RQSingleTodoList = () => {
  const [todo, setTodo] = useState({
    id: uuid(),
    text: "",
    isTodoMarked: false,
  });

  const queryClient = useQueryClient()

  const { isLoading, isError, error, data: todos, } = useQuery(['todos'], getTodos)
  
  const { mutate:mutateAddTodo } = useMutation(addTodo, {
    onSuccess: () => queryClient.invalidateQueries('todos')
  })
  const { mutate:mutateUpdateTodo } = useMutation(updateTodo, {
    onSuccess: () => queryClient.invalidateQueries('todos')
  })
  const { mutate:mutateDeleteTodo } = useMutation(deleteTodo, {
    onSuccess: () => queryClient.invalidateQueries('todos')
  })


  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo((prevTodo) => {
      return {
        ...prevTodo,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    mutateAddTodo(todo)
    setTodo({
      id: uuid(),
      text: "",
      isTodoMarked: false,
    });
  }


  let render
  if (isLoading) {
    render = <p>Loading ...</p>
  } else if (isError) {
    render = <p>{error.message}</p>
  } else {
    render = todos.map((item) => (
      <span
        key={item.id}
        className="flex items-center justify-between px-3 border-b-[1px]"
      >
        <li
          onClick={() => {
            mutateUpdateTodo({...item,isTodoMarked: !item.isTodoMarked})
          }}
          className={`${
            item.isTodoMarked && "line-through text-gray-300"
          } cursor-pointer  py-3 pl-4 text-2xl`}
        >
          <span className="flex items-center ">
            {item.isTodoMarked ? (
              <BsCheckCircle
                color="green"
                style={{
                  marginRight: "1rem",
                  fontSize: "2rem",
                }}
              />
            ) : (
              <BsCircle
                style={{
                  color: "#e2e8f0",
                  marginRight: "1rem",
                  fontSize: "2rem",
                }}
              />
            )}
            {item.text}
          </span>
        </li>
        <span
          onClick={() => mutateDeleteTodo({id:item.id})}
          className=" cursor-pointer 
            opacity-50 hover:opacity-100 "
        >
          <RiCloseLine color="#f43f5e" size={20} />
        </span>
      </span>
    ));
  }
  
  return (
    <section className="bg-white shadow-lg border-2 border-gray-50 w-3/4">
      <form onSubmit={handleSubmit}>
        <input
          className="placeholder:italic placeholder:text-gray-200 px-3 border-b-[1px] text-2xl shadow-md border-gray-200 h-16 w-full outline-none"
          name="text"
          type="text"
          placeholder="What needs to be done ?"
          value={todo.text}
          onChange={handleChange}
        />
      </form>
      <ul className="list-none ">{render}</ul>
    </section>
  );
}

export default RQSingleTodoList