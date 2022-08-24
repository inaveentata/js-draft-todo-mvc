import axios from "axios";

const todoApi = axios.create({
  baseURL: "http://localhost:4500",
});

export const getTodos = async () => {
  const resp = await todoApi.get("/todos");
  return resp.data;
};
export const addTodo = async (todo) => {
  return await todoApi.post("/todos", todo);
};
export const updateTodo = async (todo) => {
  return await todoApi.patch(`/todos/${todo.id}`, todo);
};
export const deleteTodo = async ({ id }) => {
  return await todoApi.delete(`/todos/${id}`, id);
};

export default todoApi;
