import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { remove, complete } from "../redux/todoSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const TodoItem = React.memo(({ todo, onToggleComplete, onRemove }) => {
  return (
    <li className="list" key={todo.id}>
      <input
        className="checkbox"
        type="checkbox"
        onChange={() => onToggleComplete(todo.id)}
      ></input>
      <div className="todolist">
        <span className="todoContent">
          {todo.complete === false ? <>{todo.text}</> : <del>{todo.text}</del>}{" "}
          <button
            className="deleteBtn"
            type="button"
            onClick={() => onRemove(todo.id)}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </span>
      </div>
    </li>
  );
});

const TodoList = () => {
  const todolist = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const handleToggleComplete = useCallback(
    (id) => {
      dispatch(complete(id));
    },
    [dispatch]
  );

  const handleRemove = useCallback(
    (id) => {
      dispatch(remove(id));
    },
    [dispatch]
  );

  const todolistView = todolist.map((todo) => (
    <TodoItem
      key={todo.id}
      todo={todo}
      onToggleComplete={handleToggleComplete}
      onRemove={handleRemove}
    />
  ));

  return <ul className="todoUl">{todolistView}</ul>;
};

export default TodoList;
