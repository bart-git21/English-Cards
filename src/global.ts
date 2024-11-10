function shuffle(arr: string[] | string[][]) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

const html: HTMLHtmlElement | null = document.querySelector("html");
const backToTopBtn: HTMLButtonElement | null = document.querySelector(".backToTop__btn");
const textArea: HTMLTextAreaElement | null = document.querySelector("#textarea");
const tabs: NodeListOf<HTMLElement> = document.querySelectorAll(".nav-link");

const translationTab: HTMLButtonElement | null = document.querySelector("#translation-tab");
const dragdropTab: HTMLButtonElement | null = document.querySelector("#dragdrop-tab");
const writingTab: HTMLButtonElement | null = document.querySelector("#writing-tab");

const dragDropBtnStart: HTMLElement | null = document.querySelector("#dragdrop_btn_start");
const dragDropBtnCheck: HTMLElement | null = document.querySelector("#dragdrop_btn_check");
const dragdropQuestion: HTMLElement | null = document.querySelector("#dragdrop_question");
const dragdropAnswer: HTMLElement | null = document.querySelector("#dragdrop_answer");

const writingQuestion: HTMLElement | null = document.querySelector("#writing_question");
const writingAnswer: HTMLInputElement | null = document.querySelector("#writing_answer");
const writingBtnStart: HTMLButtonElement | null = document.querySelector("#writing_start");
const writingBtnNext: HTMLButtonElement | null = document.querySelector("#writing_next");
const writingBtnCheck: HTMLButtonElement | null = document.querySelector("#writing_check");

export {
  shuffle,
  html,
  backToTopBtn,
  textArea,
  tabs,
  translationTab,
  dragdropTab,
  writingTab,
  dragDropBtnStart,
  dragDropBtnCheck,
  dragdropQuestion,
  dragdropAnswer,
  writingQuestion,
  writingAnswer,
  writingBtnStart,
  writingBtnNext,
  writingBtnCheck,
};
