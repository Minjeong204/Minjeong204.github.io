import { Workbook } from "exceljs";
import { saveAs } from "file-saver";
import XLSX from "sheetjs-style";
/**
 * 공통 Excel로 예쁘게 내보내기 모듈
 * 1. param
 *    paging : 페이지 그리드의 경우 첫번째 파람에 url을 넣음
 *    defaults : default 그리드의 경우 두 번째 파람에 ref를 넣음
 *    header:데이터그리드의 column
 *    pagename: 엑셀 제목 (ex. 성적서 관리)
 *    userNm :  사용자 이름
 *      const userInfo = useSelector((state) => state.root.userInfo);
 *      userInfo.userNm <= 이거 넣어주세요!
 *
 * 사용법
 * 1. import ExportPretty from "../../modules/common/ExportPretty";를 임포트함
 * 2. const expo = () => {
        ExportPretty(null, ref, { column }, "사용자정보", "관리자");
    };
 *
 *
 * by 김민정 2023.03.23
 *
 * */

const exportExcel = (paging, defaults, header, pagename, userNm) => {
    const saveWorkbook = () => {
        worksheet.workbook.xlsx
            .writeBuffer()
            .then((buffer) => saveAs(new Blob([buffer]), `${pagename}.xlsx`))
            .catch(() => alert("error=엑셀 내보내기가 실패하였습니다."));
    };
    // const fetchData = async () => {
    //     await axiosJson
    //         .post(paging, { pageIndex: 1, pageSize: 100, filter: filterObj(undefined), sort: null })
    //         .then((response) => {
    //             response.data.data.map((d) => worksheet.addRow(d));
    //             saveWorkbook();
    //         });
    // };
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("사용자");
    workbook.creator = userNm;
    const headers = [];
    let property = null;
    header.map((col) => {
        if (col.hasOwnProperty("property")) {
            property = col.property;
        } else {
            property = null;
        }
        headers.push({ header: col.caption, key: col.dataField, property: property });
    });
    // header.map((col) => headers.push({ header: col.caption, key: col.dataField, property: property }));

    console.log(headers);
    let count = 0;
    worksheet.columns = headers;
    headers.map((co, i) => {
        if (co.property != null) {
            count++;
        }
    });

    const borderStyle = {
        top: { style: "thin", color: { argb: "FFFFFFFF" } },
        left: { style: "thin", color: { argb: "FFFFFFFF" } },
        bottom: { style: "thin", color: { argb: "FFFFFFFF" } },
        right: { style: "thin", color: { argb: "FFFFFFFF" } },
    };
    worksheet.columns.forEach((col) => {
        col.style.border = borderStyle;
        col.width = 25;
        col.height = 25;
    });

    worksheet.spliceRows(1, 0, [], [], [], [], [], [], []);
    let dobCol = worksheet.getRow(8);
    if (count >= 1) {
        worksheet.insertRow(2, []);
        for (var i = 0; i < headers.length; i++) {
            if (header[i].property != null && headers[i].property != null) {
                if (headers[i].property === header[i - 1].property) {
                    console.log(i - 1);
                }
            }
        }
        dobCol = worksheet.getRow(9);
    }
    worksheet.eachRow({ includeEmpty: true }, function (row) {
        row.border = borderStyle;
    });
    worksheet.getCell("A2").value = pagename;
    worksheet.getCell("A2").font = { name: "Arial Black", size: 24 };
    worksheet.mergeCells("A2:D2");
    worksheet.getCell("A2").border = { bottom: { style: "medium" } };
    worksheet.getCell("A4").value = `작성자: ` + workbook.creator;
    worksheet.getCell("A5").value = `작성일: ` + new Date().toISOString().slice(0, 10);

    dobCol.height = 25;
    dobCol.eachCell({ includeEmpty: true }, function (cell) {
        cell.style.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "444a5b" } };
        cell.style.font = { color: { argb: "FFFFFFFF" } };
        cell.alignment = { vertical: "middle", horizontal: "center" };
    });
    const last = worksheet.lastColumn;

    const lasts = worksheet.getRow(last);
    lasts.eachCell({ includeEmpty: true }, function (cell) {
        cell.border = borderStyle;
    });
    worksheet.properties.defaultColWidth = 100;

    if (paging == null && defaults != null) {
        const datas = defaults.current.props.dataSource;
        datas.map((d) => worksheet.addRow(d));
        saveWorkbook();
    } else {
        // fetchData();
    }
};

/**
 * 공통 Excel로 예쁘게 내보내기 모듈
 * 1. param
 *    ref : table의 ref를 넣어주세요
 *    pagename: 엑셀 제목 (ex. 성적서 관리)
 *
 * 사용법
 * 1. import { xport } from "./ExportExcel";를 임포트함
 * 2. xport(ref,"페이지명")
 *
 *
 * by 김민정 2023.03.30
 *
 * */
const xport = (apiRef, filename, title) => {
    const table = apiRef.current;
    // const table = document.getElementById(apiRef)

    const wb = XLSX.utils.book_new();

    const ws = XLSX.utils.table_to_sheet(table);

    let heading = [[filename]];
    XLSX.utils.sheet_add_aoa(ws, heading);
    ws["A1"].v = title;

    ws["A1"].s = {
        font: {
            name: "Arial",
            sz: 24,
            bold: true,
        },
        alignment: {
            vertical: "center",
            horizontal: "center",
        },
    };
    function fixWidth(ws) {
        const data = XLSX.utils.sheet_to_json(ws);
        const data2 = XLSX.utils.sheet_to_formulae(ws);
        console.log(data2);
        const arr = [];
        for (var i = 1; i < data2.length; i = i + 2) {
            arr.push(data2[i].slice(0, 2));
        }
        arr.map(
            (a) =>
                (ws[a].s = {
                    alignment: {
                        vertical: "center",
                        horizontal: "center",
                    },
                    fill: {
                        type: "solid",
                        fgColor: { rgb: "444a5b" },
                        bgColor: { rgb: "444a5b" },
                    },

                    font: {
                        bold: true,
                        color: { rgb: "FFFFFFFF" },
                    },
                })
        );
        const colLengths = Object.keys(data[0]).map((k) => k.toString().length);
        for (const d of data) {
            Object.values(d).forEach((element, index) => {
                const length = element.toString().length;
                if (colLengths[index] < length) {
                    colLengths[index] = length;
                }
            });
        }
        ws["!cols"] = colLengths.map((l) => {
            return {
                wch: l + 5,
            };
        });
        ws["!rows"] = colLengths.map((l) => {
            return {
                hpt: 30,
            };
        });
    }

    fixWidth(ws);
    XLSX.utils.book_append_sheet(wb, ws, "Member");
    XLSX.writeFile(wb, `${filename}.xlsx`, { type: "binary", cellStyles: true });
};

export { exportExcel, xport };
