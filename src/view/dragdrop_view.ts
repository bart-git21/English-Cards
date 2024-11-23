class DView {
  html: HTMLHtmlElement;
  textArea: HTMLTextAreaElement;
  dragDropBtnStart: HTMLElement;
  dragDropBtnCheck: HTMLElement;
  dragdropQuestion: HTMLElement;
  dragdropAnswer: HTMLElement;
  addKeyListener: () => void;
  target: HTMLElement | null;
  isMove: boolean;

  constructor() {
    this.dragDropBtnStart = document.querySelector(
      "#dragdrop_btn_start"
    ) as HTMLElement;
    this.dragDropBtnCheck = document.querySelector(
      "#dragdrop_btn_check"
    ) as HTMLElement;
    this.dragdropQuestion = document.querySelector(
      "#dragdrop_question"
    ) as HTMLElement;
    this.dragdropAnswer = document.querySelector(
      "#dragdrop_answer"
    ) as HTMLElement;
    this.html = document.querySelector("html") as HTMLHtmlElement;
    this.textArea = document.querySelector("#textarea") as HTMLTextAreaElement;
    this.addKeyListener = () => {};
    this.target = null;
    this.isMove = false;
  }
  subscribeToKeyup(previous: () => void, next: () => void, start: () => void) {
    this.addKeyListener = () => {
      this.html.onkeyup = (event: KeyboardEvent): void => {
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
  start(callback: () => void) {
    this.dragDropBtnStart.addEventListener("click", () => {
      if (!this.textArea.value) {
        this.message("Enter sentences first!");
        return;
      }
      this.dragDropBtnCheck.focus();
      callback();
    });
  }
  check(callback: (arg1: string, arg2: (arg: string) => void) => void) {
    this.dragDropBtnCheck.addEventListener("click", () => {
      //   callback();
      const nodeList = document.querySelectorAll<HTMLButtonElement>(
        ".dragdrop__word"
      ) as NodeListOf<HTMLButtonElement>;
      let buttons: HTMLButtonElement[] = [...nodeList];
      const userOrder: { [key: number]: string } = {};
      buttons.forEach((e: HTMLButtonElement) => {
        const xCoord = e.getBoundingClientRect().x;
        const key: number = Math.floor(xCoord);
        userOrder[key] = e.textContent ?? "";
      });
      callback(
        Object.values(userOrder).join(" ").toLowerCase(),
        this.changeCheckBtnTitle.bind(this)
      );
    });
  }
  mousedown() {
    this.dragdropAnswer.addEventListener("mousedown", (event: MouseEvent) => {
      if (
        [...(event.target as HTMLElement)?.classList].includes("dragdrop__word")
      ) {
        this.grab(event);
        //   const self = this;
        this.dragdropAnswer.onmousemove = (e: MouseEvent) => {
          this.move(e);
        };
      } else {
        this.drop();
        this.dragdropAnswer.onmousemove = null;
      }
    });
  }
  grab(e: MouseEvent) {
    this.target = e.target as HTMLElement | null;
  }
  move(event: MouseEvent) {
    if (!this.target) return;
    if (this.isMove) return;
    this.isMove = true;
    this.target.style.position = "absolute";
    this.target.style.left = `${
      event.clientX - this.dragdropAnswer.getBoundingClientRect().left
    }px`;
    this.target.style.top = `${
      event.clientY - this.dragdropAnswer.getBoundingClientRect().top
    }px`;
    setTimeout(() => {
      this.isMove = false;
    }, 50);
  }
  drop() {
    this.target = null;
  }
  message(string: string): void {
    this.dragdropQuestion.textContent = string;
    this.dragdropAnswer.textContent = "";
  }
  changeCheckBtnTitle(buttonTitle: string): void {
    this.dragDropBtnCheck.title = buttonTitle;
    setTimeout(() => {
      this.dragDropBtnCheck.title = "Check and continue";
    }, 500);
  }
  insertWord(word: string) {
    this.dragdropAnswer.insertAdjacentHTML(
      "beforeend",
      `<button class="dragdrop__word">${word}</button>`
    );
  }
}

export { DView };
