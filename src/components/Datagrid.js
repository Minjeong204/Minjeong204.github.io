import DataGrid, {
  Column,
  Selection,
  Editing,
} from "devextreme-react/data-grid";
import "devextreme/dist/css/dx.light.css";
import React, { useState, useEffect, useRef, Fragment } from "react";
import { request } from "../Axios";

const Data = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    request.get("/table").then((response) => {
      setTableData(response.data);
    });
  }, []);
  const apiRef = useRef();
  const delete2 = () => {
    const ids = apiRef.current.instance.getSelectedRowKeys();
    request
      .post("/delete", ids)
      .then(function (response) {
        alert("삭제 성공");
        Location.reload();
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  const editing = () => {
    const data = apiRef.current.instance.getSelectedRowsData();
    console.log(data[0]);
    request
      .post("/edit", data[0])
      .then(function (response) {
        alert("수정 성공");
        Location.reload();
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  return (
    <>
      <DataGrid
        dataSource={tableData}
        pageSize={5}
        showBorders={true}
        rowsPerPageOptions={[5]}
        ref={apiRef}
        keyExpr="userId"
        onRowRemoving={delete2}
        onSaved={editing}
      >
        <Selection mode={"multiple"}></Selection>
        <Editing allowUpdating={true} allowDeleting={true} mode="popup" />
        <Column dataField={"userId"} allowEditing={false}></Column>
        <Column dataField={"name"}></Column>
        <Column dataField={"pw"}></Column>
        <Column
          dataField={"regiDt"}
          allowEditing={false}
          customizeText={(cellInfo) => {
            var data = null;
            if (cellInfo.value != null) data = cellInfo.value.substr(0, 10);
            return data;
          }}
        ></Column>
        <Column dataField={"regiUser"} allowEditing={false}></Column>
        <Column dataField={"updaDt"} allowEditing={false}></Column>
        <Column dataField={"useYn"} allowEditing={false}></Column>
      </DataGrid>
    </>
  );
};

export default Data;
