function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}
const backToTopBtn = document.querySelector(".scroll-to-top__btn");
const tabs = document.querySelectorAll(".nav-link");
const translationTab = document.querySelector("#translation-tab");
const dragdropTab = document.querySelector("#dragdrop-tab");
const writingTab = document.querySelector("#writing-tab");
export { shuffle, backToTopBtn, tabs, translationTab, dragdropTab, writingTab };
//# sourceMappingURL=global.js.map