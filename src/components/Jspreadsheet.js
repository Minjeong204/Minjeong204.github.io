import React, { useRef } from "react";
import { Spreadsheet, Worksheet, jspreadsheet } from "@jspreadsheet/react";
import formula from "@jspreadsheet/formula-pro";

// Set your JSS license key (The following key only works for one day)
const license =
    'ZDA1MTU1MGI4MTY0MDZlNzExZDFmYTM1NDkyMDRlNTNjYzAxZDQwYjllNTQ4ODllNjE5ODg3YWM3ZjA1MWM2ZjM1Y2Q4OWFkZmI1MTQ2ZDdkMTliZmRkMjIxYmM5NTNkNDFmNTQ5ZDA0ZTQyNTU3YjhkODg4OTlkZWYzZDY0ZDcsZXlKdVlXMWxJam9pU25Od2NtVmhaSE5vWldWMElpd2laR0YwWlNJNk1UWTVNRE16TVRZNE5Dd2laRzl0WVdsdUlqcGJJbXB6Y0hKbFlXUnphR1ZsZEM1amIyMGlMQ0pqYjJSbGMyRnVaR0p2ZUM1cGJ5SXNJbXB6YUdWc2JDNXVaWFFpTENKamMySXVZWEJ3SWl3aWQyVmlJaXdpYkc5allXeG9iM04wSWwwc0luQnNZVzRpT2lJek5DSXNJbk5qYjNCbElqcGJJblkzSWl3aWRqZ2lMQ0oyT1NJc0luWXhNQ0lzSW1Ob1lYSjBjeUlzSW1admNtMXpJaXdpWm05eWJYVnNZU0lzSW5CaGNuTmxjaUlzSW5KbGJtUmxjaUlzSW1OdmJXMWxiblJ6SWl3aWFXMXdiM0owSWl3aVltRnlJaXdpZG1Gc2FXUmhkR2x2Ym5NaUxDSnpaV0Z5WTJnaUxDSndjbWx1ZENJc0luTm9aV1YwY3lKZExDSmtaVzF2SWpwMGNuVmxmUT09';

// Create a custom javascript method (capital case)
const COLORIZE = function (v) {
    let d = document.createElement("span");
    d.style.color = v;
    d.innerText = v.toUpperCase();
    return d;
};

const SUMCOL = function () {
    // Update formula chain when a new row is added
    this.instance.setTracking.call(this, true);
    // Total
    let total = 0;
    // Sum all values in the column from zero to the row number
    for (let j = 0; j < this.y; j++) {
        total += parseInt(this.instance.options.data[j][this.x]) || 0;
        // Formula chain
        if (typeof this.instance.records[j][this.x].chain === "undefined") {
            this.instance.records[j][this.x].chain = new Map();
        }
        // Keep reference in the formula
        this.instance.records[j][this.x].chain.set(this.instance.records[this.y][this.x], this.instance);
    }

    return total;
};

// Send custom formula to the correct scope
formula.setFormula({ SUMCOL, COLORIZE });

// Extensions
const extensions = { formula };

// Create the component
export default function Jspreadsheet() {
    // Array with all the data grids
    const cell = {
        G1: { type: "html" },
    };
    const spreadsheet = useRef();
    // Data
    const data = [
        [
            "Apple",
            931,
            "",
            "RED",
            "=COLORIZE(D1)",
            "",
            ` <label for="checkbox">체크박스:</label>
            <input type="checkbox" id="checkbox" name="checkbox" value="check1"> <label for="checkbox">체크박스:</label>
            <input type="checkbox" id="checkbox" name="checkbox" value="check2">`,
        ],
        ["Google", 431],
        ["Amazon", 534],
        ["Total", "=SUMCOL()"],
        [],
        [],
        [],
    ];
    const columns = [
        { type: "text", width: "300px" },
        { type: "text", width: "200px" },
    ];

    // Render data grid component
    return (
        <Spreadsheet ref={spreadsheet} license={license} extensions={extensions} toolbar>
            <Worksheet data={data} columns={columns} cells={cell} />
        </Spreadsheet>
    );
}
