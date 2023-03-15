import React, { useState, Fragment } from "react";
import { request } from "../Axios";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import Data from "./Datagrid";

export default function DataTable() {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = useState({
    userId: "",
    name: "",
    password: "",
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    request
      .post("/regi", values)
      .then(function (response) {
        alert("등록 성공");
        Location.reload();
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const regi = {
    marginLeft: "auto",
    marginRight: "auto",
    width: 400,
    p: 4,
  };

  return (
    <div
      style={{
        height: 400,
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Data />

      <Button onClick={handleOpen}>등록하기</Button>
      <Dialog open={open} style={regi}>
        <DialogTitle>가입창</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Fragment>
              <TextField
                autoFocus
                margin="dense"
                name="userId"
                value={values.userId || ""}
                label="아이디 입력해봐라"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
              />
              <TextField
                autoFocus
                margin="normal"
                name="name"
                value={values.name || ""}
                label="이름 입력해봐라"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
              />
              <TextField
                autoFocus
                name="pw"
                value={values.pw || ""}
                label="비밀번호 입력해봐라"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
              />
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">OK</Button>
              </DialogActions>
            </Fragment>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
