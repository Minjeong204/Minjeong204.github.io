import React, { useEffect, useState } from "react";

function Clock(props) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <>
      <h1>현재 시간</h1>
      <h2>{time.toLocaleTimeString()}</h2>
    </>
  );
}

export default Clock;
