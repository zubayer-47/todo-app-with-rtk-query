import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import cancelImage from "../assets/images/cancel.png";
import {
  useDeleteTodoMutation,
  useUpdateTodoColorMutation
} from "../features/api/apiSlice";
import updatedText from "../redux/todos/thunk/updatedText";
import updateStatus from "../redux/todos/thunk/updateStatus";

export default function Todo({ todo }) {
  const ref = useRef();
  const dispatch = useDispatch();
  const { text, id, completed, color } = todo;

  const [todoValue, setTodoValue] = useState(text);

  const [
    deleteTodo,
    {
      isError: isDeleteError,
      isLoading: isDeleteLoading,
      isSuccess: isDeleteSuccess,
    },
  ] = useDeleteTodoMutation();
  const [
    updateTodoColor,
    {
      isError: isUpdateColorError,
      isLoading: isUpdateColorLoading,
      isSuccess: isUpdateColorSuccess,
      data
    },
  ] = useUpdateTodoColorMutation();

  console.log({isUpdateColorLoading, isUpdateColorSuccess, isUpdateColorError, data})

  const handleStatusChange = (todoId) => {
    dispatch(updateStatus(todoId, completed));
  };

  const handleColorChange = (todoId, color) => {
    updateTodoColor({id: todoId, color})
    // dispatch(updateColor(todoId, color));
  };

  const handleDelete = (todoId) => {
    // dispatch(deleteTodo(todoId));
    deleteTodo(id);
  };

  return (
    <div className="flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0">
      <div
        className={`relative rounded-full bg-white border-2 border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 ${
          completed && "border-green-500 focus-within:border-green-500"
        }`}
      >
        <input
          type="checkbox"
          checked={completed}
          onChange={() => handleStatusChange(id)}
          className="opacity-0 absolute rounded-full"
        />

        {completed && (
          <svg
            className="fill-current w-3 h-3 text-green-500 pointer-events-none"
            viewBox="0 0 20 20"
          >
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        )}
      </div>

      <input
        type="text"
        className="select-none flex-1 outline-none bg-transparent p-1 my-1"
        value={todoValue}
        disabled={true}
        onChange={(e) => setTodoValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            dispatch(updatedText(id, todoValue));
            ref.current.disabled = true;
            ref.current.classList.remove(
              "focus:outline-1",
              "focus:outline-gray-300"
            );
          }
        }}
        ref={ref}
      />

      <div
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-green-500 border-green-500 ${
          color === "green" && "bg-green-500"
        }`}
        onClick={() => handleColorChange(id, "green")}
      ></div>

      <div
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-yellow-500 border-yellow-500 ${
          color === "yellow" && "bg-yellow-500"
        }`}
        onClick={() => handleColorChange(id, "yellow")}
      ></div>

      <div
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-red-500 border-red-500 ${
          color === "red" && "bg-red-500"
        }`}
        onClick={() => handleColorChange(id, "red")}
      ></div>

      <img
        src={cancelImage}
        className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
        alt="Cancel"
        onClick={() => handleDelete(id)}
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4 cursor-pointer"
        onClick={(e) => {
          ref.current.focus();
          ref.current.disabled = false;
          ref.current.classList.add(
            "focus:outline-1",
            "focus:outline-gray-400"
          );
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
        />
      </svg>
    </div>
  );
}
