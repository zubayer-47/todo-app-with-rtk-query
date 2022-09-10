import { deleted } from "../actions";
import { apiUrl } from "./thunkConstent";

const deleteTodo = (todoId) => {
  return async (dispatch) => {
    await fetch(`${apiUrl}${todoId}`, {
      method: "DELETE",
    });

    dispatch(deleted(todoId));
  };
};

export default deleteTodo;
