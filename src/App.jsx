import { useEffect, useState } from "react";
import CompletedList from "./components/CompletedList";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList";
import { useGetTodosQuery } from "./features/api/apiSlice";
import numberOfTodos from "./utils/numberOfTodo";

function App() {
  const [status, setStatus] = useState('All')
  const [colors, setColors] = useState([])
  const [skip, setSkip] = useState(true)
  const { data, isLoading, isError, isSuccess, originalArgs } = useGetTodosQuery({status, colors}, {skip});
  useEffect(() => {
    setSkip(prev => !prev)

    console.log({skip})
  }, [status])

  let completedTodos = [];
  let inCompletedTodos = [];

  if (isSuccess) {
    completedTodos = data.filter((todo) => todo.completed === true);
    inCompletedTodos = data.filter((todo) => todo.completed === false);
  }

  const totalTask = numberOfTodos(inCompletedTodos?.length || 0);

  return (
    <div className="grid place-items-center bg-blue-100 h-full px-6 font-sans">
      <Navbar />
      <div className="mt-20 w-full  max-w-3xl shadow-lg rounded-lg p-6 bg-white">
        <Header />

        <hr className="mt-10" />

        <TodoList
          todos={inCompletedTodos}
          isError={isError}
          isLoading={isLoading}
          isSuccess={isSuccess}
        />
        <hr className="mt-4" />
        <Footer totalTask={totalTask} setSkip={setSkip} setStatus={setStatus} status={originalArgs} setColors={setColors} />
      </div>

      <hr className="mt-4" />
      <CompletedList
        todos={completedTodos}
        isError={isError}
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
    </div>
  );
}

export default App;
