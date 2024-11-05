function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

const html = document.querySelector("html");
const tabs = document.querySelectorAll(".nav-link");
const backToTopBtn = document.querySelector(".backToTop__btn");
const textArea = document.querySelector("#textarea");
const translateBody = document.querySelector(".translate");

const translateBtnStart = document.querySelector("#translate_btn_start");
const translateBtnContinue = document.querySelector("#translate_btn_continue");
const translateDelay = document.querySelector("#translate_delay");
const translatePopup = document.querySelector(".translate__popup");
const translateQuestion = document.querySelector("#translate_question");
const translateAnswer = document.querySelector("#translate_answer");
const translateProgressbar = document.querySelector("#translate_progress_bar");

const dragDropBtnStart = document.querySelector("#dragdrop_btn_start");
const dragDropBtnCheck = document.querySelector("#dragdrop_btn_check");
const dragdropQuestion = document.querySelector("#dragdrop_question");
const dragdropAnswer = document.querySelector("#dragdrop_answer");

const writingBtnStart = document.querySelector("#writing_start");
const writingBtnNext = document.querySelector("#writing_next");

export {
  shuffle,
  html,
  tabs,
  backToTopBtn,
  textArea,
  translateBody,
  translateBtnStart,
  translateBtnContinue,
  translateDelay,
  translatePopup,
  translateQuestion,
  translateAnswer,
  translateProgressbar,
  dragDropBtnStart,
  dragDropBtnCheck,
  dragdropQuestion,
  dragdropAnswer,
  writingBtnStart,
  writingBtnNext,
};
