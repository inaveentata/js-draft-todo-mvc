import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { BsCheckCircle, BsCircle, BsPlus } from "react-icons/bs";
import { RiCloseLine } from "react-icons/ri";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTodoLists,
  addTodoList,
  updateTodoList,
  deleteTodoList,
} from "./api/todoListApi";

const RQMultipleTodoList = () => {
  /* const [todoListItem, setTodoListItem] = useState({
      id: uuid(),
      todoItem: { id: uuid(), text: "", isTodoMarked: false },
      todos: [],
      isActiveTodosTab: false,
      isCompletedTodosTab: false,
    }); */

  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    error,
    data: todoLists,
  } = useQuery(["lists"], getTodoLists);

  const { mutate: mutateAddTodoList } = useMutation(addTodoList, {
    onSuccess: () => queryClient.invalidateQueries("lists"),
  });
  const { mutate: mutateUpdateTodoList } = useMutation(updateTodoList, {
    onSuccess: () => queryClient.invalidateQueries("lists"),
  });
  const { mutate: mutateDeleteTodoList } = useMutation(deleteTodoList, {
    onSuccess: () => queryClient.invalidateQueries("lists"),
  });

  /* const handleChange = (id, e) => {
    const { name, value } = e.target;
      const targetList = todoLists.find((item) => item.id === id);
      console.log(id)
    mutateUpdateTodoList({
      ...targetList,
      todoItem: { ...targetList.todoItem, [name]: value },
    });
  }; */

  /* const handleSubmit = (id, e) => {
    e.preventDefault();
    let targetList = todoLists.find((item) => item.id === id);
    const newTodo = {
      id: targetList.todoItem.id,
      text: targetList.todoItem.text,
      isTodoMarked: targetList.todoItem.isTodoMarked,
    };
    targetList = todoLists.find((item) => item.id === id);
    mutateUpdateTodoList({
      ...targetList,
      todos: [...targetList.todos, newTodo],
    });

    mutateUpdateTodoList({
      ...targetList,
      todoItem: { id: uuid(), text: "", isTodoMarked: false },
    });
  }; */

  const addList = () => {
    const list = {
      id: uuid(),
      todoItem: { id: uuid(), text: "", isTodoMarked: false },
      todos: [],
      isActiveTodosTab: false,
      isCompletedTodosTab: false,
    };
    mutateAddTodoList(list);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  } else if (isError) {
    console.log(error.message);
  } else {
    console.log(todoLists);
  }

  return (
    <>
      <div className="">
        <div
        /*  className={` 
         sm: w-full
        ${todosData.length > 1 && "lg:columns-2"}
        ${todosData.length > 2 && "2xl:columns-3"}
          gap-10 [column-fill:_balance] `} */
        >
          {/* -----> */}
          {todoLists.length
            ? todoLists.map((item) => {
                return (
                  <section
                    className="bg-white  shadow-lg border-2 mx-auto border-gray-50 mb-5 break-inside-avoid max-w-2xl"
                    key={item.id}
                  >
                    {/* <input
                      name="title"
                      type="text"
                      value={item.title}
                      onChange={(e) => handleTitle(item.id, e)}
                      placeholder="Title"
                      className=" tracking-wide text-center font-semibold placeholder:font-medium text-pink-700 placeholder:text-gray-200 px-3 border-b-[1px] text-4xl shadow-md border-gray-200 h-16 w-full outline-none"
                    /> */}
                    {/* <h2 className=" tracking-wide text-center font-semibold py-2  px-3 border-b-[1px] text-4xl shadow-md border-gray-200  w-full ">
                      {item.title}
                    </h2> */}
                    <form
                      /* onSubmit={(e) => {
                        handleSubmit(item.id, e);
                      }} */
                      onSubmit={(e) => {
                        e.preventDefault();
                        const newTodo = {
                          id: item.todoItem.id,
                          text: item.todoItem.text,
                          isTodoMarked: item.todoItem.isTodoMarked,
                        };

                        mutateUpdateTodoList({
                          ...item,
                          todos: [...item.todos, newTodo],
                        });

                        mutateUpdateTodoList({
                          ...item,
                          todoItem: {
                            id: uuid(),
                            text: "",
                            isTodoMarked: false,
                          },
                        });
                      }}
                    >
                      <input
                        className="placeholder:italic placeholder:text-gray-200 px-3 border-b-[1px] text-2xl shadow-md border-gray-200 h-12 w-full outline-none tracking-wider"
                        placeholder="What needs to be done ?"
                        name="text"
                        type="text"
                        value={item.todoItem.text}
                        // onChange={(e) => handleChange(item.id, e)}
                        onChange={(e) => {
                          console.log(e.target.value);
                          const { name, value } = e.target;
                          mutateUpdateTodoList({
                            ...item,
                            todoItem: { ...item.todoItem, [name]: value },
                          });
                        }}
                      />
                    </form>
                    <ul>
                      {/* {renderTodos(
                        item.id,
                        item.todos,
                        item.isActiveTodosTab,
                        item.isCompletedTodosTab
                      )} */}
                    </ul>{" "}
                    {/* {item.todos.length ? (
                      <div className="p-2 flex justify-between text-gray-600">
                        {itemsLength(item.todos)}
                        <div>
                          <button
                            onClick={() => allTodos(item.id)}
                            className={` px-1 rounded-sm ${
                              !item.isActiveTodosTab &&
                              !item.isCompletedTodosTab &&
                              "border-[1.5px] border-pink-300"
                            } `}
                          >
                            All
                          </button>
                          <button
                            onClick={() => activeTodos(item.id)}
                            className={`mx-5 px-1 rounded-sm ${
                              item.isActiveTodosTab &&
                              "border-[1.5px] border-pink-300"
                            } `}
                          >
                            Active
                          </button>
                          <button
                            onClick={() => completedTodos(item.id)}
                            className={` px-1 rounded-sm ${
                              item.isCompletedTodosTab &&
                              "border-[1.5px] border-pink-300"
                            } `}
                          >
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
                    ) : null} */}
                    <button
                      className="w-full bg-pink-300"
                      onClick={() => mutateDeleteTodoList({ id: item.id })}
                    >
                      Delete
                    </button>
                  </section>
                );
              })
            : null}
          {/* ----> */}
        </div>
      </div>
      {/* {isModalOpen && (
        <TitleModal
          title={title}
          setTitle={setTitle}
          handleAdd={addList}
          setIsModalOpen={setIsModalOpen}
        />
      )} */}
      <button
        onClick={addList}
        className="rounded-md border-[2px] border-gray-400 bg-pink-300 py-2 w-24 mt-20 active:translate-y-[2px]"
      >
        <span className="flex">
          <BsPlus size={25} />
          Add List
        </span>
      </button>
    </>
  );
};

export default RQMultipleTodoList;
