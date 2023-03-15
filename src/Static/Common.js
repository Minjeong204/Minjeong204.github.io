import Swal from "sweetalert2";

// alert, confirm, toast의 icon파라미터에 따른 이미지
//하단의 링크 확인! (ctrl+링크 클릭!)
//https://pointy-need-ff7.notion.site/3253e0e7ce0246d3a93e20c6ef745c21

/**
 * 공통 alert창
 * 1. param
 * 		icon	: alert창의 아이콘	사용가능한 값 :"success", "error", "warning", "info", "question" default값: info
 * 		title		: alert창의 메세지 이름	default값 : alert창입니다.
 *
 * 사용법
 * 1. import * as common from "../Static/QMS1.0.0";
 * 2. 다음을 import한 후, common.alert(icon, title); 사용
 *
 * by 김민정 2023.03.09
 *
 * */

export function alert(icon = "info", title = "alert창입니다.") {
  Swal.fire({
    icon: icon, // Alert 타입
    title: title, // Alert 제목
  });
}

/**
 * 공통 confirm창
 * 1. param
 * 		icon	: confirm창의 아이콘	사용가능한 값 :"success", "error", "warning", "info", "question" default값: info
 * 		title		: confirm창의 메세지 이름	default값 : confirm창입니다.
 *
 * 사용법
 * 1. import * as common from "../Static/QMS1.0.0";
 * 2. 다음을 import한 후, common.confirm(icon, title); 사용
 * 3. true or false 반환
 *
 * by 김민정 2023.03.10
 *
 * */
export function confirm(icon = "warning", title = "confirm창 입니다.") {
  return Swal.fire({
    icon: icon,
    title: title,
    showCancelButton: true,
    confirmButtonText: "예",
    cancelButtonText: "아니오",
  });
}

/**
 * 공통 Toast창
 * 1. param
 * 		icon	: Toast창의 아이콘,	사용가능한 값 :"success", "error", "warning", "info", "question"  default값: info
 * 		title		: confirm창의 메세지 이름,	default값 : toast창입니다!
 * 사용법
 * 1. import * as common from "../Static/QMS1.0.0";
 * 2. 다음을 import한 후, common.toast(icon,text); 사용
 *
 * by 김민정 2023.03.10
 *
 * */
export function toast(icon = "info", text = "toast창입니다!") {
  Swal.fire({
    icon: icon,
    text: text,
    toast: true,
    position: "bottom-right",
    showConfirmButton: false,
    timer: 3000,
  });
}

/**
 * 공통 Empty체크 확인창
 * 1. param
 *    value : 체크할 값
 *
 * 사용법
 * 1. import * as common from "../Static/QMS1.0.0";
 * 2. 다음을 import한 후, common.isEmpty(value); 사용
 * 3. true or false 반환
 *
 * by 김민정 2023.03.10
 *
 * */
export function isEmpty(value) {
  if (
    value === "" ||
    value === null ||
    value === undefined ||
    (value !== null && typeof value === "object" && !Object.keys(value).length)
  ) {
    return true;
  } else {
    return false;
  }
}
