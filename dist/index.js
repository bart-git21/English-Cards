import { tabs, dragdropTab, writingTab, backToTopBtn, } from "./global.js";
import { visibleBactToTopButton, backToTop } from "./components/backtotop.js";
import { appTranslate } from "./controller/translate_controller.js";
import { appDragdrop } from "./controller/dragdrop_controller.js";
import { appWriting } from "./controller/writing_controller.js";
document.addEventListener("scroll", visibleBactToTopButton);
backToTopBtn?.addEventListener("click", backToTop);
backToTop();
tabs.forEach((e) => {
    e.addEventListener("keydown", (event) => {
        event.stopImmediatePropagation();
    });
    e.addEventListener("click", () => {
        appTranslate.stop();
        appDragdrop.handleRemoveKeyListener();
        appWriting.handleRemoveKeyListener();
    });
});
dragdropTab?.addEventListener("click", () => {
    appDragdrop.handleAddKeyListener();
});
writingTab?.addEventListener("click", function () {
    appWriting.handleAddKeyListener();
});
//# sourceMappingURL=index.js.map