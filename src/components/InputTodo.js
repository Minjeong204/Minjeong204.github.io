import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { add } from "../redux/todoSlice";
import "../css/Todolist.css";
import TodoList from "./Todo";

export default function InputTodo() {
  const dispatch = useDispatch();
  const [todolist, setTodolist] = useState({
    id: 0,
    text: "",
  });
  function handleText(e) {
    setTodolist({ text: e.target.value });
  }
  function onReset() {
    setTodolist({ text: "" });
  }
  return (
    <div className="inputTodo">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (todolist.text !== "") {
            dispatch(add(todolist.text));
          } else {
            alert("할 일을 입력하세요");
          }
          onReset();
        }}
      >
        <div>
          <input
            className="textbar"
            type="text"
            value={todolist.text}
            onChange={handleText}
          ></input>
          <input
            className="btn-two purple mini"
            type="submit"
            value="+"
          ></input>
        </div>
      </form>
      <TodoList />
    </div>
  );
}
