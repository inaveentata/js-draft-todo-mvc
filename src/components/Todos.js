import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { BsCheckCircle, BsCircle } from "react-icons/bs";
import { RiCloseLine } from "react-icons/ri";

const Todos = () => {
  const [todoList, setTodosList] = useState([]);
  const [activeTab, setActiveTab] = useState({
    isActiveTab: false,
    isCompltedTab: false,
  });
  const [todo, setTodo] = useState({
    id: uuid(),
    text: "",
    isTodoMarked: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo((prevTodo) => {
      return {
        ...prevTodo,
        [name]: value,
      };
    });
  };
  const deleteTodo = (id) => {
    const sortedItems = todoList.filter((item) => item.id !== id);
    setTodosList(sortedItems);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      id: todo.id,
      text: todo.text,
      isTodoMarked: todo.isTodoMarked,
    };
    setTodosList((prevTodos) => [...prevTodos, newTodo]);
    setTodo({
      id: uuid(),
      text: "",
      isTodoMarked: false,
    });
  };
  const handleStrikeThrough = (id) => {
    const sortedItems = todoList.filter((item) => item.id !== id);
    const targetItem = todoList.find((item) => item.id === id);
    const strikeThrough = {
      id: targetItem.id,
      text: targetItem.text,
      isTodoMarked: !targetItem.isTodoMarked,
    };
    setTodosList([...sortedItems, strikeThrough]);
  };

  const clearCompleted = () => {
    const activeTodos = todoList.filter((item) => item.isTodoMarked === false);
    setTodosList(activeTodos);
    setActiveTab({
      isActiveTab: false,
      isCompltedTab: false,
    });
  };
  const itemsLeft = todoList.filter((item) => item.isTodoMarked === false);
  const itemsLeftText =
    itemsLeft.length === 1
      ? `${itemsLeft.length} item left`
      : `${itemsLeft.length} items left`;

  let renderTodos;
  if (activeTab.isActiveTab) {
    renderTodos = todoList.filter((item) => item.isTodoMarked === false);
  } else if (activeTab.isCompltedTab) {
    renderTodos = todoList.filter((item) => item.isTodoMarked === true);
  } else {
    renderTodos = todoList;
  }

  const render =
    renderTodos.length > 0 &&
    renderTodos.map((item) => (
      <span
        key={item.id}
        className="flex items-center justify-between px-3 border-b-[1px]"
      >
        <li
          onClick={() => handleStrikeThrough(item.id)}
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
          onClick={() => deleteTodo(item.id)}
          className=" cursor-pointer 
            opacity-50 hover:opacity-100 "
        >
          <RiCloseLine color="#f43f5e" size={20} />
        </span>
      </span>
    ));

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
      {todoList.length ? (
        <div className="p-2 flex justify-between text-gray-600">
          {itemsLeft.length === 0 ? (
            <span>No active items</span>
          ) : (
            <span>{itemsLeftText}</span>
          )}
          <div>
            <button
              onClick={() =>
                setActiveTab((prevTabs) => ({
                  ...prevTabs,
                  isActiveTab: false,
                  isCompltedTab: false,
                }))
              }
            >
              All
            </button>
            <button
              onClick={() =>
                setActiveTab({ isActiveTab: true, isCompltedTab: false })
              }
              className="mx-5"
            >
              Active
            </button>
            <button
              onClick={() =>
                setActiveTab({ isActiveTab: false, isCompltedTab: true })
              }
            >
              Completed
            </button>
          </div>
          <button onClick={clearCompleted} className=" hover:underline">
            Clear completed
          </button>
        </div>
      ) : null}
    </section>
  );
};

export default Todos;
