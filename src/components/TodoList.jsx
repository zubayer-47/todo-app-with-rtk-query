import Todo from "./Todo";

export default function TodoList({todos, isError, isLoading, isSuccess}) {
  // const filters = useSelector((state) => state.filters);
  // const filterByStatus = (todo) => {
  //   const { status } = filters;
  //   switch (status) {
  //     case "Complete":
  //       return todo.completed;

  //     case "Incomplete":
  //       return !todo.completed;

  //     default:
  //       return true;
  //   }
  // };

  // const filterByColors = (todo) => {
  //   const { colors } = filters;
  //   if (colors.length > 0) {
  //     return colors.includes(todo?.color);
  //   }
  //   return true;
  // };

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
          // .filter(filterByStatus)
          // .filter(filterByColors)
          .map((todo) => (
            <Todo todo={todo} key={todo.id} />
          ))}
      </div>
    );
  }

  return (
    <>
      {content}
    </>
  );
}
