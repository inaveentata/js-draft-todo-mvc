import Todos from "./components/Todos";

import MultipleTodoLists from "./components/MultipleTodoLists";
import ApiIntegration from "./components/ApiIntegration";



function App() {
  return (
    <main className="p-5 flex flex-col items-center">
      <h1 className="text-pink-300 text-6xl p-5">todos</h1>
      {/* <Todos /> */}
      {/* <MultipleTodoLists /> */}
      <ApiIntegration />
    </main>
  );
}

export default App;
