class WView {
    html;
    textArea;
    writingQuestion;
    writingAnswer;
    writingBtnStart;
    writingBtnNext;
    writingBtnCheck;
    addKeyListener;
    constructor() {
        this.html = document.querySelector("html");
        this.textArea = document.querySelector("#textarea");
        this.writingQuestion = document.querySelector("#writing_question");
        this.writingAnswer = document.querySelector("#writing_answer");
        this.writingBtnStart = document.querySelector("#writing_start");
        this.writingBtnNext = document.querySelector("#writing_next");
        this.writingBtnCheck = document.querySelector("#writing_check");
        this.addKeyListener = () => { };
    }
    subscribeToKeyup(previous, next) {
        this.addKeyListener = () => {
            this.html.onkeyup = (event) => {
                switch (event.key) {
                    case "ArrowLeft":
                        previous();
                        break;
                    case "ArrowRight":
                        next();
                        break;
                }
            };
        };
    }
    removeKeyListener() {
        this.html.onkeyup = null;
    }
    onClickTextarea() {
        this.textArea.addEventListener("click", () => {
            this.removeKeyListener();
        });
    }
    onBlurTextarea() {
        this.textArea.addEventListener("blur", () => {
            this.writingQuestion.textContent =
                "Sentences are changed. The game is over. Click to start!";
            this.writingAnswer.textContent = "";
        });
    }
    failTexarea() {
        this.writingQuestion.textContent =
            "Write pairs of English and Russian sentences in the area first!";
        this.writingAnswer.textContent = "";
    }
    failStart() {
        this.writingQuestion.textContent = "Start the game first!";
        this.writingAnswer.textContent = "";
    }
    bindToInput(handler) {
        this.writingAnswer.addEventListener("keydown", (e) => {
            if (e.key === "Enter")
                handler(this.writingAnswer.value.toLowerCase());
        });
    }
    bindToStart(handler) {
        this.writingBtnStart.addEventListener("click", () => {
            this.writingBtnNext.focus();
            handler();
        });
    }
    bindToNext(handler) {
        this.writingBtnNext.addEventListener("click", () => {
            handler();
        });
    }
    bindToCheck(handler) {
        this.writingBtnCheck.addEventListener("click", (e) => {
            e.preventDefault();
            this.writingAnswer.value = "";
            handler();
        });
    }
    displayQuestion(question) {
        this.writingAnswer.value = "";
        this.writingAnswer.focus();
        this.writingQuestion.textContent = question;
    }
}
export { WView };
//# sourceMappingURL=writing_view.js.map