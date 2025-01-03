class TView {
    html;
    translateQuestion;
    translateAnswer;
    translateBtnStart;
    translateBtnContinue;
    translateBtnStop;
    translateDelay;
    translatePopup;
    translateProgressbar;
    addKeyListener;
    constructor() {
        this.html = document.querySelector("html");
        this.translateDelay = document.querySelector("#translate_delay");
        this.translatePopup = document.querySelector(".translate__popup");
        this.translateQuestion = document.querySelector("#translate_question");
        this.translateAnswer = document.querySelector("#translate_answer");
        this.translateBtnStart = document.querySelector("#translate_btn_start");
        this.translateBtnStop = document.querySelector("#translate_btn_stop");
        this.translateBtnContinue = document.querySelector("#translate_btn_continue");
        this.translateProgressbar = document.querySelector("#translate_progress_bar");
        this.addKeyListener = () => { };
    }
    subscribeToKeyup(delayCallback, preventCallback, nextCallback, deleteCallback, startCallback) {
        this.addKeyListener = () => {
            this.html.onkeyup = (event) => {
                let ms = this.getDelay();
                switch (event.key) {
                    case "ArrowUp":
                        ms += 0.5;
                        delayCallback(ms) &&
                            (this.translatePopup.textContent = this.translateDelay.value =
                                ms.toString()) &&
                            this.showPopup();
                        break;
                    case "ArrowDown":
                        ms -= 0.5;
                        delayCallback(ms) &&
                            (this.translatePopup.textContent = this.translateDelay.value =
                                ms.toString()) &&
                            this.showPopup();
                        break;
                    case "ArrowLeft":
                        preventCallback();
                        break;
                    case "ArrowRight":
                        nextCallback();
                        break;
                    case "Delete":
                        deleteCallback();
                        break;
                    case " ":
                        startCallback();
                        break;
                }
            };
        };
    }
    removeKeyListener() {
        this.html.onkeyup = null;
    }
    bindToDelay(handler) {
        this.translateDelay.addEventListener("blur", () => {
            handler(this.getDelay());
        });
    }
    getDelay() {
        return parseFloat(this.translateDelay.value);
    }
    showPopup() {
        this.translatePopup.classList.toggle("show");
        setTimeout(() => {
            this.translatePopup.classList.toggle("show");
        }, 2000);
    }
    bindToStart(handler) {
        this.translateBtnStart.addEventListener("click", () => {
            this.addKeyListener();
            this.translateBtnContinue.focus();
            this.translateDelay.value = this.translateDelay.value || "10";
            handler();
        });
    }
    bindToNextLevel(handler) {
        this.translateBtnContinue.addEventListener("click", () => {
            this.addKeyListener();
            handler();
        });
    }
    bindToStop(handler) {
        this.translateBtnStop.addEventListener("click", () => {
            this.stop();
            handler();
        });
    }
    stop() {
        this.removeKeyListener();
        this.translateQuestion.textContent =
            "The game is stopped. Click to continue";
        this.translateAnswer.textContent = "";
    }
    sentence(question, answer) {
        this.translateQuestion.textContent = question;
        this.translateAnswer.textContent = answer;
    }
    result(number) {
        switch (true) {
            case number === 0:
                this.message("Keep going!");
                break;
            case number > 0: {
                this.message(`
            Well done!
            You deleted ${number} ${number === 1 ? "card" : "cards"}!
        `);
                break;
            }
            default:
                this.message("Click to start!");
                break;
        }
    }
    updateProgress(count = 0, max = count) {
        if (!count) {
            this.translateProgressbar.style.width = "0%";
            this.translateProgressbar.textContent = "";
            return;
        }
        this.translateProgressbar.style.width = `${(count / max) * 100}%`;
        this.translateProgressbar.textContent =
            count === 1 ? `1 sentence is learned` : `${count} sentences are learned`;
    }
    message(string) {
        this.translateQuestion.textContent = string;
        this.translateAnswer.textContent = "";
    }
}
export { TView };
//# sourceMappingURL=translate_view.js.map