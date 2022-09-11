import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import tickImage from "../assets/images/double-tick.png";
import noteImage from "../assets/images/notes.png";
import plusImage from "../assets/images/plus.png";
import {
  useAddTodoMutation,
  useClearCompletedMutation,
  useCompleteAllTodosMutation,
  useGetTodosQuery
} from "../features/api/apiSlice";

export default function Header() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const { colors, status } = useSelector((state) => state.filter);
  const [addTodo, { isLoading, isError, isSuccess }] = useAddTodoMutation();
  const { data: todos, isSuccess: isTodoQuerySuccess } = useGetTodosQuery({
    colors,
    status,
  });
  const [clearCompleted] = useClearCompletedMutation();
  const [completedAllTodos] = useCompleteAllTodosMutation()

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addTodo({ text: input, completed: false, color: "red" });
    setInput("");
  };

  const handleCompleteAll = () => {
    const completedAllArr = todos.map((todo) => {
      completedAllTodos(todo.id)
    });
  };

  const handleClearCompleted = () => {
    isTodoQuerySuccess &&
      todos.forEach(
        (todo) => todo.completed === true && clearCompleted(todo.id)
      );

    // dispatch(clearCompleted());
  };

  return (
    <div>
      <form
        className="flex items-center bg-gray-100 px-4 py-4 rounded-md"
        onSubmit={submitHandler}
      >
        <img src={noteImage} className="w-6 h-6" alt="Add todo" />
        <input
          type="text"
          placeholder="Type your todo"
          className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
          value={input}
          onChange={handleInput}
        />
        <button
          type="submit"
          className={`appearance-none w-8 h-8 bg-[url('${plusImage}')] bg-no-repeat bg-contain`}
        ></button>
      </form>

      <ul className="flex justify-between my-4 text-xs text-gray-500">
        <li
          className="flex space-x-1 cursor-pointer"
          onClick={handleCompleteAll}
        >
          <img className="w-4 h-4" src={tickImage} alt="Complete" />
          <span>Complete All Tasks</span>
        </li>
        <li className="cursor-pointer" onClick={handleClearCompleted}>
          Clear completed
        </li>
      </ul>
    </div>
  );
}
