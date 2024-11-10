import { textArea } from "../global.js";
import {
  originList,
  dragdropModel,
  writingModel,
} from "../model/expressionsModel.js";

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

const controllers_writing = {
  html: document.querySelector("html") as HTMLElement,
  writingQuestion: document.querySelector("#writing_question") as HTMLElement,
  writingBtnStart: document.querySelector(
    "#writing_start"
  ) as HTMLButtonElement,
  writingBtnNext: document.querySelector("#writing_start") as HTMLButtonElement,
  stopTranslateBtn: document.querySelector(
    "#translate_btn_stop"
  ) as HTMLButtonElement,
  writingGame: new writingModel() || null,
  writingClearMode() {
    this.writingGame = new writingModel();
  },
  writingKeyListener(event: KeyboardEvent): void {
    console.log("listener is added");
    switch (event.key) {
      case "ArrowLeft":
        this.writingPrev();
        break;
      case "ArrowRight":
        this.writingNext();
        break;
      case " ":
        this.writingStart();
        break;
    }
  },
  writingAddKeyListener() {
    this.html.onkeyup = (event) => {
      this.writingKeyListener(event);
    };
  },
  writingRemoveKeyListener() {
    this.html.onkeyup = null;
  },
  onInput() {
    this.writingGame.setUserText();
  },
  writingStart() {
    // this.stopTranslateBtn.click();
    this.writingBtnNext.focus();

    originList.create();
    originList.shuffled();

    if (originList.list.length) {
      this.writingGame = new writingModel(originList.list);
      this.writingGame.play();
    } else {
      this.writingGame.fail();
    }
  },
  writingCheck() {
    // this.writingGame.writingSetUserText();
    this.writingGame.check() && this.writingGame.next();
  },
  writingNext() {
    if (!this.writingGame.writingList.length) {
      this.writingQuestion.textContent = "Start the game first!";
      return;
    }
    this.writingGame.next();
  },
  writingPrev() {
    if (!this.writingGame.writingList.length) {
      this.writingQuestion.textContent = "Start the game first!";
      return;
    }
    this.writingGame.prev();
  },
};

export default {
  removeKeyListeners() {
    console.log("key listeners are removed");
    this.dragdropRemoveKeyListener();
    this.writingRemoveKeyListener();
  },
  clearGames() {
    console.log("games are stopped");
    this.dragdropClearMode();
    this.writingClearMode();
  },
  ...(controllers_drag_drop as typeof controllers_drag_drop),
  ...(controllers_writing as typeof controllers_writing),
};
