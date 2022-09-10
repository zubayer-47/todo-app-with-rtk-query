import { Provider } from "react-redux";
import CompletedList from "./components/CompletedList";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="grid place-items-center bg-blue-100 h-full px-6 font-sans">
        <Navbar />
        <div className="mt-20 w-full  max-w-3xl shadow-lg rounded-lg p-6 bg-white">
          <Header />

          <hr className="mt-10" />

          <TodoList />
        </div>
        <hr className="mt-4" />
        <CompletedList />
      </div>
    </Provider>
  );
}

export default App;
