import React, { useRef, useEffect } from "react";
import jspreadsheet from "jspreadsheet-ce";

import "../../node_modules/jspreadsheet-ce/dist/jspreadsheet.css";
import "../../node_modules/jspreadsheet-ce/dist/jspreadsheet.datatables.css";
import { type } from "@testing-library/user-event/dist/type";
import Jspreadsheet from "./Jspreadsheet";
// import "../../node_modules/jspreadsheet-ce/dist/jspreadsheet.theme.css";

export default function Datagrid() {
    const jRef = useRef(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const options = {
        data: [
            [
                "Bmw",
                "",
                "",
                <select>
                    <option>ㅇㅇㅇ</option>
                </select>,
            ],
            ["", "", "", 1, 3, "=sum(D2:E2)", "RED", "=COLORIZE(H2)"],
        ],
        stripHTML: false,
        minDimensions: [10, 10],
        columns: [
            { type: "autocomplete", title: "Country", width: "300", source: ["Alfa Romeo", "Audi", "Bmw"] },
            { type: "dropdown", title: "Food", width: "150", source: ["apple", "banana"] },
            { type: "checkbox", title: "Stock", width: "100" },
        ],
    };
    useEffect(() => {
        if (!jRef.current.jspreadsheet) {
            jspreadsheet(jRef.current, options);
        }
        console.log(jRef);
    }, [options]);

    const addRow = () => {
        jRef.current.jexcel.insertRow();
    };

    return (
        <div>
            <div ref={jRef} />
            <br />
            <input type="button" onClick={addRow} value="Add new row" />

            <p>
                Cell에는 세팅해줄 수 있는 함수도 없으며,<br></br>D1에 selectBox를 넣었으나 [object]로 표기됨<br></br>
                다만 sum * / round등 간단한 계산들을 사용할 수 있음
                <br />
                함수 개별화도 리액트로 쓰려면 전부 유료에 있다. 무료는 merge도 함수만 있을 뿐, 버튼은 구현해야한다
                <br></br>하단은 유료 체험판을 사용한 함수 customizing이다. 
            </p>

            <Jspreadsheet />
        </div>
    );
}
