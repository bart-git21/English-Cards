class DView {
    html;
    textArea;
    dragDropBtnStart;
    dragDropBtnCheck;
    dragdropQuestion;
    dragdropAnswer;
    addKeyListener;
    target;
    isMove;
    constructor() {
        this.dragDropBtnStart = document.querySelector("#dragdrop_btn_start");
        this.dragDropBtnCheck = document.querySelector("#dragdrop_btn_check");
        this.dragdropQuestion = document.querySelector("#dragdrop_question");
        this.dragdropAnswer = document.querySelector("#dragdrop_answer");
        this.html = document.querySelector("html");
        this.textArea = document.querySelector("#textarea");
        this.addKeyListener = () => { };
        this.target = null;
        this.isMove = false;
    }
    subscribeToKeyup(previous, next, start) {
        this.addKeyListener = () => {
            this.html.onkeyup = (event) => {
                switch (event.key) {
                    case "ArrowLeft":
                        previous();
                        break;
                    case "ArrowRight":
                        next();
                        break;
                    case " ":
                        start();
                        break;
                }
            };
        };
    }
    removeKeyListener() {
        this.html.onkeyup = null;
    }
    onBlur() {
        this.textArea.addEventListener("blur", () => {
            this.dragdropQuestion.textContent =
                "The sentences are cnahged. Click to start!";
            this.dragdropAnswer.textContent = "";
            this.addKeyListener();
        });
    }
    onClick() {
        this.textArea.addEventListener("click", () => {
            this.removeKeyListener();
        });
    }
    start(callback) {
        this.dragDropBtnStart.addEventListener("click", () => {
            if (!this.textArea.value) {
                this.message("Enter sentences first!");
                return;
            }
            this.dragDropBtnCheck.focus();
            callback();
        });
    }
    check(callback) {
        this.dragDropBtnCheck.addEventListener("click", () => {
            //   callback();
            const nodeList = document.querySelectorAll(".dragdrop__word");
            let buttons = [...nodeList];
            const userOrder = {};
            buttons.forEach((e) => {
                const xCoord = e.getBoundingClientRect().x;
                const key = Math.floor(xCoord);
                userOrder[key] = e.textContent ?? "";
            });
            callback(Object.values(userOrder).join(" ").toLowerCase(), this.changeCheckBtnTitle.bind(this));
        });
    }
    mousedown() {
        this.dragdropAnswer.addEventListener("mousedown", (event) => {
            if ([...event.target?.classList].includes("dragdrop__word")) {
                this.grab(event);
                //   const self = this;
                this.dragdropAnswer.onmousemove = (e) => {
                    this.move(e);
                };
            }
            else {
                this.drop();
                this.dragdropAnswer.onmousemove = null;
            }
        });
    }
    grab(e) {
        this.target = e.target;
    }
    move(event) {
        if (!this.target)
            return;
        if (this.isMove)
            return;
        this.isMove = true;
        this.target.style.position = "absolute";
        this.target.style.left = `${event.clientX - this.dragdropAnswer.getBoundingClientRect().left}px`;
        this.target.style.top = `${event.clientY - this.dragdropAnswer.getBoundingClientRect().top}px`;
        setTimeout(() => {
            this.isMove = false;
        }, 50);
    }
    drop() {
        this.target = null;
    }
    message(string) {
        this.dragdropQuestion.textContent = string;
        this.dragdropAnswer.textContent = "";
    }
    changeCheckBtnTitle(buttonTitle) {
        this.dragDropBtnCheck.title = buttonTitle;
        setTimeout(() => {
            this.dragDropBtnCheck.title = "Check and continue";
        }, 500);
    }
    insertWord(word) {
        this.dragdropAnswer.insertAdjacentHTML("beforeend", `<button class="dragdrop__word">${word}</button>`);
    }
}
export { DView };
//# sourceMappingURL=dragdrop_view.js.map