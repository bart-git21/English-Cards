function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}
const html = document.querySelector("html");
const backToTopBtn = document.querySelector(".backToTop__btn");
const textArea = document.querySelector("#textarea");
const tabs = document.querySelectorAll(".nav-link");
const translationTab = document.querySelector("#translation-tab");
const dragdropTab = document.querySelector("#dragdrop-tab");
const writingTab = document.querySelector("#writing-tab");
const translateBody = document.querySelector(".translate");
const translateQuestion = document.querySelector("#translate_question");
const translateAnswer = document.querySelector("#translate_answer");
const translateBtnStart = document.querySelector("#translate_btn_start");
const translateBtnStop = document.querySelector("#translate_btn_stop");
const translateBtnContinue = document.querySelector("#translate_btn_continue");
const translateDelay = document.querySelector("#translate_delay");
const translatePopup = document.querySelector(".translate__popup");
const translateProgressbar = document.querySelector("#translate_progress_bar");
const dragDropBtnStart = document.querySelector("#dragdrop_btn_start");
const dragDropBtnCheck = document.querySelector("#dragdrop_btn_check");
const dragdropQuestion = document.querySelector("#dragdrop_question");
const dragdropAnswer = document.querySelector("#dragdrop_answer");
const writingQuestion = document.querySelector("#writing_question");
const writingAnswer = document.querySelector("#writing_answer");
const writingBtnStart = document.querySelector("#writing_start");
const writingBtnNext = document.querySelector("#writing_next");
const writingBtnCheck = document.querySelector("#writing_check");
export { shuffle, html, backToTopBtn, textArea, tabs, translationTab, dragdropTab, writingTab, translateBody, translateBtnStart, translateBtnStop, translateBtnContinue, translateDelay, translatePopup, translateQuestion, translateAnswer, translateProgressbar, dragDropBtnStart, dragDropBtnCheck, dragdropQuestion, dragdropAnswer, writingQuestion, writingAnswer, writingBtnStart, writingBtnNext, writingBtnCheck, };
//# sourceMappingURL=global.js.map