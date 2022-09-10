import { updated } from "../actions";
import { apiUrl } from "./thunkConstent";

const updatedText = (todoId, todoText) => {
  return async (dispatch) => {
    const response = await fetch(`${apiUrl}${todoId}`, {
      method: "PATCH",
      body: JSON.stringify({
        text: todoText,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const todo = await response.json();

    dispatch(updated(todo.id, todo.text));
  };
};

export default updatedText;
