import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { remove, complete } from "../redux/todoSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function TodoList() {
  const todolist = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const trash = <FontAwesomeIcon icon={faTrashCan} />;


  const todolistView = todolist.map((todo, idx) => (
    <li className="list" key={todolist[idx].id}>
      <input
        className="checkbox"
        type="checkbox"
        onChange={() => dispatch(complete(todolist[idx].id))}
      ></input>
      <div className="todolist">
        <span className="todoContent">
          {todo.complete === false ? <>{todo.text}</> : <del>{todo.text}</del>}{" "}
          <button
            className="deleteBtn"
            type="button"
            onClick={() => dispatch(remove(todolist[idx].id))}
          >
            {trash}
          </button>
        </span>
      </div>
    </li>
  ));
  return (
    <>
      <ul className="todoUl">{todolistView}</ul>
    </>
  );
}
