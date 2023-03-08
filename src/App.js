import "./css/App.css";
import { Routes, Route } from "react-router-dom";
import Counter from "./components/CounterNumber";
import Clock from "./components/Date";
import InputTodo from "./components/InputTodo";
import NotFound from "./components/NotFound";
import Main from "./components/Main";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/count" element={<Counter />}></Route>
        <Route path="/clock" element={<Clock />}></Route>
        <Route path="/todo" element={<InputTodo />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
