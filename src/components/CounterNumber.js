import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { plus, minus, init } from "../redux/counter";
import "../css/Like.css"
const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="like">
      <p>♥ {count}</p>
      <button onClick={() => dispatch(plus())}>좋아요</button>
      <button onClick={() => dispatch(minus())}>싫어요</button>
      <button onClick={() => dispatch(init())}>초기화</button>
    </div>
  );
};

export default Counter;
