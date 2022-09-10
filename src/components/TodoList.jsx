import { useSelector } from "react-redux";
import { useGetInCompletedTodosQuery } from "../features/api/apiSlice";
import numberOfTodos from "../utils/numberOfTodo";
import Footer from "./Footer";
import Todo from "./Todo";

export default function TodoList() {
  const filters = useSelector((state) => state.filters);

  const {
    data: todos,
    isError,
    isLoading,
    isSuccess,
  } = useGetInCompletedTodosQuery();
  
  const filterByStatus = (todo) => {
    const { status } = filters;
    switch (status) {
      case "Complete":
        return todo.completed;

      case "Incomplete":
        return !todo.completed;

      default:
        return true;
    }
  };

  const filterByColors = (todo) => {
    const { colors } = filters;
    if (colors.length > 0) {
      return colors.includes(todo?.color);
    }
    return true;
  };

  let content = null;

  if (isLoading) {
    content = <div className="mt-2 text-md text-gray-700">Loading...</div>;
  }

  if (isError) {
    content = (
      <div className="text-red-500 mt-2">
        There is an Error occurred in Fetching Todos
      </div>
    );
  }

  if (isSuccess) {
    content = (
      <div className="mt-4 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
        {todos
          .filter(filterByStatus)
          .filter(filterByColors)
          .map((todo) => (
            <Todo todo={todo} key={todo.id} />
          ))}
      </div>
    );
  }

  const totalTask = numberOfTodos(todos?.length || 0);

  return (
    <>
      {content}

      <hr className="mt-4" />

      <Footer totalTask={totalTask} />
    </>
  );
}
