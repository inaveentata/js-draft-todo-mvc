import Todos from "./components/Todos";
import MultipleTodoLists from "./components/MultipleTodoLists";
import RQSingleTodoList from "./components/react-query/RQSingleTodoList";

function App() {
  return (
    <main className="p-5 flex flex-col items-center">
      <h1 className="text-pink-300 text-6xl p-5">todos</h1>

      <RQSingleTodoList />
    </main>
  );
}

export default App;
