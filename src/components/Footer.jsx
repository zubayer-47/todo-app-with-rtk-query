import { useDispatch, useSelector } from "react-redux";
import { changeColor, changeStatus } from "../features/filter/filterSlice";

export default function Footer({ totalTask }) {
  // const todos = useSelector((state) => state.todos);
  const {colors, status} = useSelector((state) => state.filter);

  const dispatch = useDispatch();
  // const todosRemaining = todos.filter((todo) => !todo.completed).length;
  // const { status, colors } = filters;

  const handleStatusChange = (status) => {

    dispatch(changeStatus(status));
  };

  const handleColorChange = (color) => {
      if (colors.includes(color)) {
          dispatch(changeColor({color, colorType: "removed"}));
      } else {
          dispatch(changeColor({color, colorType: "added"}));
      }
  };

  return (
    <div className="mt-4 flex justify-between text-xs text-gray-500">
      <p>{totalTask} left</p>
      <ul className="flex space-x-1 items-center text-xs">
        <li
          className={`cursor-pointer ${
            status === "All" && "font-bold"
          }`}
          onClick={() => handleStatusChange("All")}
        >
          All
        </li>
        <li>|</li>
        <li
          className={`cursor-pointer ${
            status === "InCompleted" && "font-bold"
          }`}
          onClick={() => handleStatusChange("InCompleted")}
        >
          Incomplete
        </li>
        <li>|</li>
        <li
          className={`cursor-pointer ${
            status === "Completed" && "font-bold"
          }`}
          onClick={() => handleStatusChange("Completed")}
        >
          Complete
        </li>
        <li></li>
        <li></li>
        <li
          className={`h-3 w-3 border-2 border-green-500 md:hover:bg-green-500 rounded-full cursor-pointer ${
            colors.includes("green") && "bg-green-500"
          }`}
          onClick={() => handleColorChange("green")}
        ></li>
        <li
          className={`h-3 w-3 border-2 border-red-500 md:hover:bg-red-500 rounded-full cursor-pointer ${
            colors.includes("red") && "bg-red-500"
          }`}
          onClick={() => handleColorChange("red")}
        ></li>
        <li
          className={`h-3 w-3 border-2 border-yellow-500 md:hover:bg-yellow-500 rounded-full cursor-pointer ${
            colors.includes("yellow") && "bg-yellow-500"
          }`}
          onClick={() => handleColorChange("yellow")}
        ></li>
      </ul>
    </div>
  );
}
