import { textArea } from "../global.js";
import { originList, dragdropModel } from "../model/expressionsModel.js";

const controllers_drag_drop = {
  html: document.querySelector("html") as HTMLElement,
  dragdropQuestion: document.querySelector("#dragdrop_question") as HTMLElement,
  dragdropAnswer: document.querySelector("#dragdrop_answer") as HTMLElement,
  dragdropCheckBtn: document.querySelector(
    "#dragdrop_btn_check"
  ) as HTMLButtonElement,
  stopTranslateBtn: document.querySelector(
    "#translate_btn_stop"
  ) as HTMLButtonElement,
  dragdropGame: new dragdropModel() || null,
  dragdropClearMode() {
    this.dragdropGame = new dragdropModel();
  },
  dragdropKeyListener(event: KeyboardEvent): void {
    switch (event.key) {
      case "ArrowLeft":
        this.dragdropPrev();
        break;
      case "ArrowRight":
        this.dragdropNext();
        break;
      case " ":
        this.dragdropStart();
        break;
    }
  },
  dragdropAddKeyListener() {
    this.html.onkeyup = (event) => {
      this.dragdropKeyListener(event);
    };
  },
  dragdropRemoveKeyListener() {
    this.html.onkeyup = null;
  },
  dragdropStart() {
    this.stopTranslateBtn.click();

    if (!textArea?.value) {
      this.dragdropQuestion.textContent = "Enter the text first!";
      return;
    }

    this.dragdropCheckBtn.focus();
    // controllers_translate.translateGame.isPlay &&
    //   controllers_translate.translateGame.stop();

    originList.create();
    originList.shuffled();
    this.dragdropGame = new dragdropModel(originList.list);
    this.dragdropGame.play();
  },
  dragdropCheck() {
    if (this.dragdropGame.check()) {
      this.dragdropQuestion.textContent = this.dragdropAnswer.textContent =
        null;
      this.dragdropCheckBtn.textContent = "it'correct! next question?";
      this.dragdropGame.play() &&
        (this.dragdropQuestion.textContent = "Finish!");
    } else {
      this.dragdropCheckBtn.textContent = "No, it's wrong! Try again!";
    }
  },
  move(event: MouseEvent) {
    if (this.dragdropGame) {
      this.dragdropGame.move(event, this.dragdropGame.target);
    }
  },
  dragdrop(event: MouseEvent) {
    if (
      [...(event.target as HTMLElement)?.classList].includes("dragdrop__word")
    ) {
      this.dragdropGame.drag(event);
      const self = this;
      this.dragdropAnswer.onmousemove = (e) => {
        self.move(e);
      };
    } else {
      this.dragdropGame.drop();
      this.dragdropAnswer.onmousemove = null;
    }
  },
  dragdropNext() {
    if (!this.dragdropGame.list.length) {
      this.dragdropQuestion.textContent = "Start the game first!";
      return;
    }
    this.dragdropGame.next();
  },
  dragdropPrev() {
    if (!this.dragdropGame.list.length) {
      this.dragdropQuestion.textContent = "Start the game first!";
      return;
    }
    this.dragdropGame.prev();
  },
};

export default {
  removeKeyListeners() {
    this.dragdropRemoveKeyListener();
  },
  clearGames() {
    console.log("games are stopped");
    this.dragdropClearMode();
  },
  ...(controllers_drag_drop as typeof controllers_drag_drop),
};
