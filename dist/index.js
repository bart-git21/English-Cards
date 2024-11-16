import { tabs, dragdropTab, writingTab, dragDropBtnStart, dragDropBtnCheck, dragdropAnswer, backToTopBtn, textArea, } from "./global.js";
import { appTranslate } from "./controller/translate_controller.js";
import { appWriting } from "./controller/writing_controller.js";
import { visibleBactToTopButton, backToTop } from "./components/backtotop.js";
import controllers from "./controller/index.js";
document.addEventListener("scroll", visibleBactToTopButton);
backToTopBtn?.addEventListener("click", backToTop);
backToTop();
tabs.forEach((e) => {
    e.addEventListener("keydown", (event) => {
        event.stopImmediatePropagation();
    });
    e.addEventListener("click", () => {
        appTranslate.stop();
        appWriting.handleRemoveKeyListener();
        controllers.removeKeyListeners();
    });
});
dragdropTab?.addEventListener("click", () => {
    controllers.dragdropAddKeyListener();
});
writingTab?.addEventListener("click", function () {
    appWriting.handleAddKeyListener();
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
//# sourceMappingURL=index.js.map