import { textArea } from "../global.js";
import { originList, 
//   translateModel,
dragdropModel, writingModel, } from "../model/expressionsModel.js";
// const controllers_translate = {
//   html: document.querySelector("html") as HTMLElement,
//   translateBody: document.querySelector(".translate") as HTMLElement,
//   translateQuestion: document.querySelector(
//     "#translate_question"
//   ) as HTMLElement,
//   translateAnswer: document.querySelector("#translate_answer") as HTMLElement,
//   translateDelay: document.querySelector(
//     "#translate_delay"
//   ) as HTMLInputElement,
//   translatePopup: document.querySelector(".translate__popup") as HTMLElement,
//   continueBtn: document.querySelector("#translate_btn_continue") as HTMLElement,
//   translateGame: new translateModel() || {},
//   isChangingDelay: false,
//   translateClearMode() {
//     this.translateGame = new translateModel();
//   },
//   updateDelay(value: number = 0) {
// if (this.isChangingDelay) return;
// this.isChangingDelay = true;
// let ms: number = parseFloat(this.translateDelay.value) + value;
// this.translateGame.updateDelay(ms);
// this.translatePopup.textContent = this.translateDelay.value = ms.toString();
// this.translatePopup.classList.toggle("show");
// setTimeout(() => {
//   this.isChangingDelay = false;
//   this.translatePopup.classList.toggle("show");
// }, 2000);
//   },
//   translateKeyListener(event: KeyboardEvent): void {
//     switch (event.key) {
//       case "ArrowUp":
//         this.updateDelay(0.5);
//         break;
//       case "ArrowDown":
//         this.updateDelay(-0.5);
//         break;
//       case "ArrowLeft":
//         this.prevElem();
//         break;
//       case "ArrowRight":
//         this.nextElem();
//         break;
//       case "Delete":
//         this.deleteElem();
//         break;
//       case " ":
//         this.translateStart();
//         break;
//     }
//   },
//   translateAddKeyListener() {
//     // this.html.addEventListener("keyup", this.translateKeyListener.bind(this));
//     this.html.onkeyup = (event: KeyboardEvent) => {
//       this.translateKeyListener(event);
//     };
//   },
//   translateRemoveKeyListener() {
//     this.html.onkeyup = null;
//   },
//   async translateStart() {
// this.translateStop();
// console.log("start");
// if (!textArea?.value) {
//   this.failTranslateBody();
//   this.translateRemoveKeyListener();
//   return;
// }
// this.translateAddKeyListener();
// this.successTranslateBody();
// this.continueBtn.focus();
// originList.create();
// originList.shuffled();
// this.translateGame = new translateModel(originList.list);
// this.translateDelay.value = this.translateGame.getDelay().toString();
// this.translateGame.updateList();
// await this.translateGame.playGame();
//   },
//   translateContinue() {
// this.translateGame.updateList();
// this.translateGame.playGame();
//   },
//   translateStop() {
// this.translateGame.stop();
// this.translateRemoveKeyListener();
// this.translateQuestion.textContent =
//   "The game is stopped. Click to continue";
// this.translateAnswer.textContent = "";
//   },
//   failTranslateBody() {
//     this.translateBody.innerHTML =
//       "Write pairs of English and Russian sentences in the area";
//   },
//   successTranslateBody() {
//     this.translateBody.innerHTML = `
//         <h2
//             id="translate_question"
//             class="translate__question fs-1 text-light"
//         ></h2>
//         <h6
//             id="translate_answer"
//             class="translate__answer mb-2 text-light text-opacity-50"
//         ></h6>
//     `;
//   },
//   deleteElem() {
//     this.translateGame.trainingList.length &&
//       this.translateGame.excludeElement();
//   },
//   prevElem() {
//     this.translateGame.trainingList.length &&
//       this.translateGame.previewElement();
//   },
//   nextElem(): void {
//     this.translateGame.trainingList.length && this.translateGame.nextElement();
//   },
// };
const controllers_drag_drop = {
    html: document.querySelector("html"),
    dragdropQuestion: document.querySelector("#dragdrop_question"),
    dragdropAnswer: document.querySelector("#dragdrop_answer"),
    dragdropCheckBtn: document.querySelector("#dragdrop_btn_check"),
    stopTranslateBtn: document.querySelector("#translate_btn_stop"),
    dragdropGame: new dragdropModel() || null,
    dragdropClearMode() {
        this.dragdropGame = new dragdropModel();
    },
    dragdropKeyListener(event) {
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
        }
        else {
            this.dragdropCheckBtn.textContent = "No, it's wrong! Try again!";
        }
    },
    move(event) {
        if (this.dragdropGame) {
            this.dragdropGame.move(event, this.dragdropGame.target);
        }
    },
    dragdrop(event) {
        if ([...event.target?.classList].includes("dragdrop__word")) {
            this.dragdropGame.drag(event);
            const self = this;
            this.dragdropAnswer.onmousemove = (e) => {
                self.move(e);
            };
        }
        else {
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
    html: document.querySelector("html"),
    writingQuestion: document.querySelector("#writing_question"),
    writingBtnStart: document.querySelector("#writing_start"),
    writingBtnNext: document.querySelector("#writing_start"),
    stopTranslateBtn: document.querySelector("#translate_btn_stop"),
    writingGame: new writingModel() || null,
    writingClearMode() {
        this.writingGame = new writingModel();
    },
    writingKeyListener(event) {
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
        }
        else {
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
        // this.translateRemoveKeyListener();
        this.dragdropRemoveKeyListener();
        this.writingRemoveKeyListener();
    },
    clearGames() {
        console.log("games are stopped");
        // this.translateClearMode();
        this.dragdropClearMode();
        this.writingClearMode();
    },
    //   ...(controllers_translate as typeof controllers_translate),
    ...controllers_drag_drop,
    ...controllers_writing,
};
//# sourceMappingURL=index.js.map