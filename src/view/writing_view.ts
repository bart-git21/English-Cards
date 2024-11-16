class WView {
  html: HTMLHtmlElement;
  textArea: HTMLTextAreaElement;
  writingQuestion: HTMLElement;
  writingAnswer: HTMLInputElement;
  writingBtnStart: HTMLButtonElement;
  writingBtnNext: HTMLButtonElement;
  writingBtnCheck: HTMLButtonElement;
  addKeyListener: () => void;
  constructor() {
    this.html = document.querySelector("html") as HTMLHtmlElement;
    this.textArea = document.querySelector("#textarea") as HTMLTextAreaElement;
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
  failTexarea(): void {
    this.writingQuestion.textContent =
      "Write pairs of English and Russian sentences in the area first!";
    this.writingAnswer.textContent = "";
  }
  failStart() {
    this.writingQuestion.textContent = "Start the game first!";
    this.writingAnswer.textContent = "";
  }
  bindToInput(handler: (arg: string)=> void): void {
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
  bindToCheck(handler: ()=> void) {
    this.writingBtnCheck.addEventListener("click", (e) => {
      e.preventDefault();
      this.writingAnswer.value = "";
      handler();
    });
  }
  displayQuestion(question: string): void {
    this.writingAnswer.value = "";
    this.writingAnswer.focus();
    this.writingQuestion.textContent = question;
  }
}

export { WView };
