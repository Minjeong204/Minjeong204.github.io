import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { request } from "../Axios";

export default function DataTable() {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    request.get("/table").then((response) => setTableData(response.data));
  });
  const columns = [
    { field: "userId", headerName: "ID" },
    { field: "userNm", headerName: "NAME" },
    { field: "deptCd", headerName: "이게 뭐지" },
    { field: "teleNo", headerName: "전화번호", width: 150 },
    {
      field: "regiDt",
      headerName: "등록일",
      width: 150,
      valueFormatter: (params) => {
        if (params.value == null) {
          return "";
        }
        const valueFormatted = params.value.slice(0, 10);
        return valueFormatted;
      },
    },
    {
      field: "updaDt",
      headerName: "수정일",
      width: 150,
      valueFormatter: (params) => {
        if (params.value == null) {
          return "";
        }
        const valueFormatted = params.value.slice(0, 10);
        return valueFormatted;
      },
    },
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
