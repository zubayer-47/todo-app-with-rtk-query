import React from "react";
import { useSelector } from "react-redux";
import { useGetCompletedTodosQuery } from "../features/api/apiSlice";
import numberOfTodos from "../utils/numberOfTodo";
import CompletedTodo from "./CompletedTodo";

export default function CompletedList() {
  const filters = useSelector((state) => state.filters);

  const {
    data: todos,
    isLoading,
    isError,
    isSuccess,
  } = useGetCompletedTodosQuery();

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
      <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
        {todos
          .filter(filterByStatus)
          .filter(filterByColors)
          .map((todo) => (
            <CompletedTodo todo={todo} key={todo.id} />
          ))}
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl shadow-lg rounded-lg p-6 bg-white">
      <h1 className="text-center font-bold text-gray-700">Completed Tasks</h1>
      <hr className="my-3" />

      {content}

      <div className="mt-4 flex justify-between text-xs text-gray-500">
        <p>{numberOfTodos(todos?.length || 0)} completed</p>
      </div>
    </div>
  );
}
