import axios from "axios";

const todoListApi = axios.create({
  baseURL: "http://localhost:4500", 
});

export const getTodoLists = async () => {
  const resp = await todoListApi.get('/lists');
  return resp.data;
};

export const addTodoList = async (list) => {
  return await todoListApi.post("/lists", list);
};

export const updateTodoList = async (list) => {
  return await todoListApi.patch(`/lists/${list.id}`, list);
};

export const deleteTodoList = async ({ id }) => {
  return await todoListApi.delete(`/lists/${id}`, id);
};


export default todoListApi

