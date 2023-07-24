import React from "react";
import DataGrid, { Column, ColumnChooser, Export } from "devextreme-react/data-grid";
import { countries } from "./data";
import { Button } from "@mui/material";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
import exportExcel from "./ExportExcel";

const CustomDatagrid = () => {
    const gdpFormat = {
        type: "percent",
        precision: 1,
    };
    const ref = React.useRef();
    const columns = [
        {
            dataField: "Country",
            caption: "Country",
        },
        {
            dataField: "Area",
            caption: "Area",
        },
        {
            dataField: "Population_Total",
            caption: "Total",
            property: "Population",
        },
        {
            dataField: "Population_Urban",
            caption: "Urban",
            property: "Population",
        },
        {
            dataField: "GDP_Total",
            caption: "Total, min $",
            property: "GDP",
        },
        {
            dataField: "GDP_Agriculture",
            caption: "Argiculture",
            property: "GDP",
        },
        {
            dataField: "GDP_Industry",
            caption: "Industry",
            property: "GDP",
        },
        {
            dataField: "GDP_Services",
            caption: "Services",
            property: "GDP",
        },
    ];

    const column = [
        {
            caption: "전체1",
            columns: [
                {
                    caption: "상세1",
                    dataField: "Country",
                },
            ],
        },
        {
            caption: "Population",
            columns: [
                {
                    caption: "상세2",
                    columns: [{ dataField: "Population_Total", caption: "Total" }],
                },
                {
                    caption: "상세3",
                    columns: [{ dataField: "Population_Urban", caption: "Population_Urban" }],
                },
            ],
        },
    ];

    columns.map((d) => {
        if (d.hasOwnProperty("property")) {
            console.log(d.property);
        }
    });
    return (
        <>
            <DataGrid
                id="grid"
                dataSource={countries}
                keyExpr="ID"
                columnAutoWidth={true}
                allowColumnReordering={true}
                showBorders={true}
                ref={ref}>
                <ColumnChooser enabled={true} />
                <Column dataField="Country" />
                <Column dataField="Area" />
                <Column caption="Population">
                    <Column dataField="Population_Total" caption="Total" format="fixedPoint" />
                    <Column dataField="Population_Urban" caption="Urban" format="percent" />
                </Column>
                <Column caption="Nominal GDP">
                    <Column dataField="GDP_Total" caption="Total, mln $" format="fixedPoint" sortOrder="desc" />
                    <Column caption="By Sector">
                        <Column dataField="GDP_Agriculture" caption="Agriculture" format={gdpFormat} width={95} />
                        <Column dataField="GDP_Industry" caption="Industry" format={gdpFormat} width={80} />
                        <Column dataField="GDP_Services" caption="Services" format={gdpFormat} width={85} />
                    </Column>
                </Column>
            </DataGrid>
            <Button onClick={() => exportExcel(null, ref, columns, "test", "김민정")}>엑셀로 내보내기</Button>
        </>
    );
};

export default CustomDatagrid;
