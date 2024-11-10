import { tabs, translationTab, dragdropTab, writingTab, dragDropBtnStart, dragDropBtnCheck, dragdropAnswer, writingAnswer, writingBtnStart, writingBtnNext, writingBtnCheck, backToTopBtn, textArea, } from "./global.js";
import { appTranslate } from "./controller/translate_controller.js";
import { visibleBactToTopButton, backToTop } from "./components/backtotop.js";
import controllers from "./controller/index.js";
appTranslate.stop();
document.addEventListener("scroll", visibleBactToTopButton);
backToTopBtn?.addEventListener("click", backToTop);
backToTop();
tabs.forEach((e) => {
    e.addEventListener("keydown", (event) => {
        event.stopImmediatePropagation();
    });
    e.addEventListener("click", () => {
        controllers.removeKeyListeners();
    });
});
translationTab?.addEventListener("click", () => {
    appTranslate.handleKeyListener();
});
dragdropTab?.addEventListener("click", () => {
    appTranslate.stop();
    controllers.dragdropAddKeyListener();
});
writingTab?.addEventListener("click", function () {
    appTranslate.stop();
    controllers.writingAddKeyListener();
});
textArea?.addEventListener("input", function () {
    controllers.clearGames();
});
textArea?.addEventListener("click", function () {
    controllers.removeKeyListeners();
});
dragDropBtnStart?.addEventListener("click", function () {
    controllers.dragdropStart();
});
dragDropBtnCheck?.addEventListener("click", function () {
    controllers.dragdropCheck();
});
dragdropAnswer?.addEventListener("mousedown", function (e) {
    controllers.dragdrop(e);
});
writingAnswer?.addEventListener("blur", function () {
    controllers.onInput();
});
writingBtnStart?.addEventListener("click", function () {
    controllers.writingStart();
});
writingBtnCheck?.addEventListener("click", function (e) {
    e.preventDefault();
    controllers.writingCheck();
});
writingBtnNext?.addEventListener("click", function () {
    controllers.writingNext();
});
//# sourceMappingURL=index.js.map