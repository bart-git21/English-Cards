class WView {
  html: HTMLHtmlElement;
  writingQuestion: HTMLElement;
  writingAnswer: HTMLInputElement;
  writingBtnStart: HTMLButtonElement;
  writingBtnNext: HTMLButtonElement;
  writingBtnCheck: HTMLButtonElement;
  addKeyListener: () => void;
  constructor() {
    this.html = document.querySelector("html") as HTMLHtmlElement;
    this.writingQuestion = document.querySelector(
      "#writing_question"
    ) as HTMLElement;
    this.writingAnswer = document.querySelector(
      "#writing_answer"
    ) as HTMLInputElement;
    this.writingBtnStart = document.querySelector(
      "#writing_start"
    ) as HTMLButtonElement;
    this.writingBtnNext = document.querySelector(
      "#writing_next"
    ) as HTMLButtonElement;
    this.writingBtnCheck = document.querySelector(
      "#writing_check"
    ) as HTMLButtonElement;
    this.addKeyListener = () => {};
  }
  subscribeToKeyup(previous: () => void, next: () => void) {
    this.addKeyListener = () => {
      this.html.onkeyup = (event: KeyboardEvent): void => {
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
  bindToInput(handler: (arg: string) => void): void {
    this.writingAnswer.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handler(this.writingAnswer.value.toLowerCase());
    });
  }
  bindToStart(handler: () => void) {
    this.writingBtnStart.addEventListener("click", () => {
      this.writingBtnNext.focus();
      handler();
    });
  }
  bindToNext(handler: () => void): void {
    this.writingBtnNext.addEventListener("click", () => {
      handler();
    });
  }
  bindToCheck(handler: () => void) {
    this.writingBtnCheck.addEventListener("click", (e) => {
      e.preventDefault();
      this.writingAnswer.value = "";
      handler();
    });
  }
  message(string: string): void {
    this.writingQuestion.textContent = string;
    this.writingAnswer.value = "";
    this.writingAnswer.focus();
  }
}

export { WView };
