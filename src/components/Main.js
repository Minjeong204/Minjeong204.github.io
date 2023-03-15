import { Button } from "@mui/material";
import React from "react";
import "../css/Main.css";
import * as common from "../Static/Common";
const Main = () => {
  const alert = () => {
    common.alert();
  };
  const confirm = () => {
    common.confirm();
  };
  const toast = () => {
    common.toast();
  };
  return (
    <>
      {/* <img src="http://image.dongascience.com/Photo/2020/10/8a5748b94df480da7df06adcdaa417c9.jpg" alt="고양이 야옹"/> */}
      <Button onClick={alert}>Alert</Button>
      <Button onClick={confirm}>confirm</Button>
      <Button onClick={toast}>toast</Button>
    </>
  );
};

export default Main;
