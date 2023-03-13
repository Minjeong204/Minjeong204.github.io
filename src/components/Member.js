import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { request } from "../Axios";

export default function DataTable() {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    request.get("/table").then((response) => setTableData(response.data));
  });
  console.log(tableData);
  const columns = [
    { field: "userId", headerName: "ID" },
    { field: "name", headerName: "NAME" },
    { field: "regiDt", headerName: "등록일" },
    { field: "updaDt", headerName: "수정일" },
  ];
  return (
    <div
      style={{
        height: 400,
        width: "40%",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        getRowId={(row) => row.userId}
      />
    </div>
  );
}
