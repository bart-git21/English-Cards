import {
  html,
  tabs,
  translateBtnStart,
  translateBtnContinue,
  dragDropBtnStart,
  dragDropBtnCheck,
  dragdropAnswer,
  writingBtnStart,
  backToTopBtn,
  textArea,
  translateBody,
} from "./global.js";
import { visibleBactToTopButton, backToTop } from "./components/backtotop.js";
import { controllers } from "./controller/index.js";

html.addEventListener("keyup", keyboardListener);
document.addEventListener("scroll", visibleBactToTopButton);
backToTopBtn.addEventListener("click", backToTop);
backToTop();

tabs.forEach((e) =>
  e.addEventListener("keydown", (e) => {
    e.stopImmediatePropagation();
  })
);
textArea.addEventListener("input", function () {
  translateBody.innerHTML = "The new sentences have come into being!";
  if (JSON.stringify(controllers.translateGame) === "{}") return;
  controllers.translateStop();
});
textArea.addEventListener("click", function () {
  html.removeEventListener("keyup", keyboardListener);
});
textArea.addEventListener("blur", function () {
  html.addEventListener("keyup", keyboardListener);
});
translateBtnStart.addEventListener("click", function () {
  console.log("start");
  controllers.translateStart();
});
translateBtnContinue.addEventListener("click", async function () {
  await controllers.translateGame.play();
});
dragDropBtnStart.addEventListener("click", function () {
  controllers.dragdropStart();
});
dragDropBtnCheck.addEventListener("click", function () {
  controllers.dragdropCheck();
});
dragdropAnswer.addEventListener("mousedown", function (e) {
  controllers.dragdrop(e);
});

writingBtnStart.addEventListener("click", function () {
  controllers.writingStart();
});
