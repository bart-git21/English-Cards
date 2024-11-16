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
const dragDropBtnStart = document.querySelector("#dragdrop_btn_start");
const dragDropBtnCheck = document.querySelector("#dragdrop_btn_check");
const dragdropQuestion = document.querySelector("#dragdrop_question");
const dragdropAnswer = document.querySelector("#dragdrop_answer");
export { shuffle, html, backToTopBtn, textArea, tabs, translationTab, dragdropTab, writingTab, dragDropBtnStart, dragDropBtnCheck, dragdropQuestion, dragdropAnswer, };
//# sourceMappingURL=global.js.map