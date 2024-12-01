import {
  tabs,
  dragdropTab,
  writingTab,
  backToTopBtn,
} from "./global.js";
import { visibleBackToTopButton, backToTop } from "./components/backtotop.js";
import { appTranslate } from "./controller/translate_controller.js";
import { appDragdrop } from "./controller/dragdrop_controller.js";
import { appWriting } from "./controller/writing_controller.js";
import { appTextarea } from "./view/textarea_view.js";

document.addEventListener("scroll", visibleBackToTopButton);
backToTopBtn?.addEventListener("click", backToTop);
backToTop();

appTextarea.onClick();
appTextarea.onInput();
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
writingTab?.addEventListener("click", function() {
  appWriting.handleAddKeyListener();
});


