import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { BsCheckCircle, BsCircle } from "react-icons/bs";
import { RiCloseLine } from "react-icons/ri";

const MultipleTodoLists = () => {
  const [todosData, setTodosData] = useState([
    {
      id: uuid(),
      title:'',
      todoItem: { id: uuid(), text: "", isTodoMarked: false },
      todos: [],
      isActiveTodosTab: false,
      isCompletedTodosTab: false,
    },
  ]);

  const handleTitle = (id, e) => {
    const { name, value } = e.target;
    setTodosData((prevData) => {
      return prevData.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }
        return {
          ...todo,
          [name]:value
        };
      });
    });
  };
  const handleChange = (id, e) => {
    const { name, value } = e.target;
    setTodosData((prevData) => {
      return prevData.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }
        return {
          ...todo,
          todoItem: { ...todo.todoItem, [name]: value },
        };
      });
    });
  };

  const handleSubmit = (id, e) => {
    e.preventDefault();
    const targetList = todosData.find((item) => item.id === id);
    const newTodo = {
      id: targetList.todoItem.id,
      text: targetList.todoItem.text,
      isTodoMarked: targetList.todoItem.isTodoMarked,
    };

    setTodosData((prevData) => {
      return prevData.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }
        return {
          ...todo,
          todos: [...todo.todos, newTodo],
        };
      });
    });

    setTodosData((prevData) => {
      return prevData.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }
        return {
          ...todo,
          todoItem: { id: uuid(), text: "", isTodoMarked: false },
        };
      });
    });
  };

  const handleStrikeThrough = (itemId, todoId) => {
    const targetList = todosData.find((item) => item.id === itemId);

    const sortTodoItems = targetList.todos.filter((item) => item.id !== todoId);
    const targetTodoItem = targetList.todos.find((item) => item.id === todoId);

    const strikeThrough = {
      id: targetTodoItem.id,
      text: targetTodoItem.text,
      isTodoMarked: !targetTodoItem.isTodoMarked,
    };

    setTodosData((prevData) => {
      return prevData.map((todo) => {
        if (todo.id !== itemId) {
          return todo;
        }
        return {
          ...todo,
          todos: [...sortTodoItems, strikeThrough],
        };
      });
    });
  };

  const deleteTodo = (itemId, todoId) => {
    const targetList = todosData.find((item) => item.id === itemId);

    const sortTodoItems = targetList.todos.filter((item) => item.id !== todoId);

    setTodosData((prevData) => {
      return prevData.map((todo) => {
        if (todo.id !== itemId) {
          return todo;
        }
        return {
          ...todo,
          todos: [...sortTodoItems],
        };
      });
    });
  };

  const clearCompletedTodos = (itemId) => {
    const targetList = todosData.find((item) => item.id === itemId);

    const sortTodoItems = targetList.todos.filter((item) => item.isTodoMarked === false);

    setTodosData((prevData) => {
      return prevData.map((todo) => {
        if (todo.id !== itemId) {
          return todo;
        }
        return {
          ...todo,
          todos: [...sortTodoItems],
        };
      });
    });
  };

  const allTodos = (itemId) => {
    setTodosData((prevData) => {
      return prevData.map((todo) => {
        if (todo.id !== itemId) {
          return todo;
        }
        return {
          ...todo,
          isActiveTodosTab: false,
          isCompletedTodosTab: false,
        };
      });
    });
  };

  const activeTodos = (itemId) => {
    setTodosData((prevData) => {
      return prevData.map((todo) => {
        if (todo.id !== itemId) {
          return todo;
        }
        return {
          ...todo,
          isActiveTodosTab: true,
          isCompletedTodosTab: false,
        };
      });
    });
  };

  const completedTodos = (itemId) => {
    setTodosData((prevData) => {
      return prevData.map((todo) => {
        if (todo.id !== itemId) {
          return todo;
        }
        return {
          ...todo,
          isActiveTodosTab: false,
          isCompletedTodosTab: true,
        };
      });
    });
  };

  const renderTodos = (itemId,todoList,activeTab,completedTab) => {
    let todoItems;
    if (activeTab) {
      todoItems = todoList.filter((item) => item.isTodoMarked === false);
    } else if (completedTab) {
      todoItems = todoList.filter((item) => item.isTodoMarked === true);
    } else {
      todoItems = todoList
    }
    return (
      <>
        {todoItems.map((todo) => (
          <span
            key={todo.id}
            className="flex items-center justify-between px-3 border-b-[1px]"
          >
            <li
              className={`${
                todo.isTodoMarked && "line-through text-gray-300"
              } cursor-pointer py-3 pl-4 text-2xl`}
              onClick={() => handleStrikeThrough(itemId, todo.id)}
            >
              <span className="flex items-center ">
                {todo.isTodoMarked ? (
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
                {todo.text}
              </span>
            </li>
            <span
              onClick={() => deleteTodo(itemId, todo.id)}
              className=" cursor-pointer 
            opacity-50 hover:opacity-100 "
            >
              <RiCloseLine color="#f43f5e" size={20} />
            </span>
          </span>
        ))}
      </>
    );

  }

  function itemsLength(items) {
    const itemsLeft = items.filter((item) => item.isTodoMarked === false);
    return (
      <>
        {itemsLeft.length === 0 ? (
          <span>No active items</span>
        ) : itemsLeft.length === 1 ? (
          <span>{`${itemsLeft.length} item left`}</span>
        ) : (
          <span>{`${itemsLeft.length} items left`}</span>
        )}
      </>
    );
  };
    

  const addList = () => {
    const list = {
      id: uuid(),
      title:'',
      todoItem: { id: uuid(), text: "", isTodoMarked: false },
      todos: [],
      isActiveTodosTab: false,
      isCompletedTodosTab: false,
    };
    setTodosData((prevData) => [...prevData, list]);
  };

  return (
    <>
      <div className="flex flex-wrap">
        {todosData.length
          ? todosData.map((item) => {
              return (
                <section
                  className="bg-white shadow-lg border-2 border-gray-50 mx-2 "
                  key={item.id}
                >
                  <input
                    name="title"
                    type="text"
                    value={item.title}
                    onChange={(e) => handleTitle(item.id, e)}
                    placeholder='Title'
                    className="tracking-wide text-center font-semibold placeholder:font-medium text-pink-700 placeholder:text-gray-200 px-3 border-b-[1px] text-2xl shadow-md border-gray-200 h-16 w-full outline-none"
                  />
                  <form
                    onSubmit={(e) => {
                      handleSubmit(item.id, e);
                    }}
                  >
                    <input
                      className="placeholder:italic placeholder:text-gray-200 px-3 border-b-[1px] text-2xl shadow-md border-gray-200 h-12 w-full outline-none"
                      placeholder="What needs to be done ?"
                      name="text"
                      type="text"
                      value={item.todoItem.text}
                      onChange={(e) => handleChange(item.id, e)}
                    />
                  </form>
                  <ul>
                    {/* make the below render todos separate component */}
                    {renderTodos(
                      item.id,
                      item.todos,
                      item.isActiveTodosTab,
                      item.isCompletedTodosTab
                    )}
                  </ul>
                  {/* ----> status check buttons start <--- */}
                  {item.todos.length ? (
                    <div className="p-2 flex justify-between text-gray-600">
                      {/* ---->  */}
                      {itemsLength(item.todos)}
                      {/* ---->  */}
                      <div>
                        <button onClick={() => allTodos(item.id)}>All</button>
                        <button
                          onClick={() => activeTodos(item.id)}
                          className="mx-5"
                        >
                          Active
                        </button>
                        <button onClick={() => completedTodos(item.id)}>
                          Completed
                        </button>
                      </div>
                      <button
                        onClick={() => clearCompletedTodos(item.id)}
                        className=" hover:underline"
                      >
                        Clear completed
                      </button>
                    </div>
                  ) : null}
                  {/* ----> status check buttons end<--- */}
                </section>
              );
            })
          : null}
      </div>
      <button
        onClick={addList}
        className="border-[2px] border-gray-400 bg-pink-300 py-2 w-24 mt-20 active:translate-y-[2px]"
      >
        Add List
      </button>
    </>
  );
};

export default MultipleTodoLists;
