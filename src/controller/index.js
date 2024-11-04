import {
  translateBody,
  translatePopup,
  dragDropBtnCheck,
  dragdropQuestion,
  dragdropAnswer,
  textArea,
} from "../global.js";
import {
  TranslateModel,
  originList,
  dragdropModel,
  writingGame,
} from "../model/expressionsModel.js";

const controllers_delay = {
  incrementDelay() {
    if (JSON.stringify(this.translateGame) === "{}") {
      translatePopup.textContent = "Start the game";
      translatePopup.classList.add("show");
      return;
    }
    controllers.translateGame.updateDelay(true);
  },
  decrementDelay() {
    if (JSON.stringify(this.translateGame) === "{}") {
      translatePopup.textContent = "Start the game";
      translatePopup.classList.add("show");
      setTimeout(() => {
        translatePopup.classList.remove("show");
      }, 2000);
      return;
    }
    controllers.translateGame.updateDelay(false);
  },
};

const controllers_translate = {
  translateGame: {},
  translateFail() {
    translateBody.innerHTML =
      "Write pairs of English and Russian sentences in the area";
  },
  translateStart() {
    // if (JSON.stringify(this.translateGame) === "{}") return;
    if (!textArea.value) {
      document.querySelector(".translate").textContent =
        "Write pairs of English and Russian sentences in the area first!";
      return;
    }

    document.querySelector(".translate").innerHTML = `
        <h2
            id="translate_question"
            class="translate__question fs-1 text-light"
        ></h2>
        <h6
            id="translate_answer"
            class="translate__answer mb-2 text-light text-opacity-50"
        ></h6>
    `;
    document.querySelector("#translate_btn_continue").focus();
    originList.create();
    originList.shuffled();
    this.translateGame = new TranslateModel(originList.list);
    this.translateGame.play();
  },
  async deleteElem() {
    JSON.stringify(this.translateGame) !== "{}" &&
      (await this.translateGame.excludeElement());
  },
  async prevElem() {
    JSON.stringify(this.translateGame) !== "{}" &&
      (await this.translateGame.previewElement());
  },
  async nextElem() {
    JSON.stringify(this.translateGame) !== "{}" &&
      this.translateGame.nextElement();
  },
};

const controllers_drag_drop = {
  dragdropGame: null,
  dragdropStart() {
    if (!textArea.value) {
      dragdropQuestion.textContent = "Enter the text first!";
      return;
    }

    document.querySelector("#dragdrop_btn_check").focus();
    this.translateGame.isPlay && this.translateGame.stop();

    originList.create();
    originList.shuffled();
    this.dragdropGame = new dragdropModel(originList.list);
    this.dragdropGame.play();
  },
  dragdropCheck() {
    if (this.dragdropGame.check()) {
      dragdropQuestion.textContent = dragdropAnswer.textContent = null;
      dragDropBtnCheck.textContent = "it'correct! next question?";
      this.dragdropGame.play() && (dragdropQuestion.textContent = "Finish!");
    } else {
      dragDropBtnCheck.textContent = "No, it's wrong! Try again!";
    }
  },
  move(event) {
    if (this.dragdropGame) {
      this.dragdropGame.move(event, this.dragdropGame.target);
    }
  },
  dragdrop(event) {
    if ([...event.target.classList].includes("dragdrop__word")) {
      this.dragdropGame.drag(event);
      const self = this;
      dragdropAnswer.onmousemove = (e) => {
        self.move(e);
      };
    } else {
      this.dragdropGame.drop(event);
      dragdropAnswer.onmousemove = null;
    }
  },
};

const controllers_writing = {
  writingStart() {
    writingBtn.focus();
    this.translateStop();
    writingGame.writing();
  },
};

const controllers = {
  ...controllers_delay,
  ...controllers_translate,
  ...controllers_drag_drop,
  ...controllers_writing,
};
export { controllers };
