class TView {
  html: HTMLHtmlElement;
  textArea: HTMLTextAreaElement;
  translateQuestion: HTMLElement;
  translateAnswer: HTMLElement;
  translateBtnStart: HTMLButtonElement;
  translateBtnContinue: HTMLButtonElement;
  translateBtnStop: HTMLButtonElement;
  translateDelay: HTMLInputElement;
  translatePopup: HTMLElement;
  translateProgressbar: HTMLElement;
  addKeyListener: () => void;

  constructor() {
    this.html = document.querySelector("html") as HTMLHtmlElement;
    this.textArea = document.querySelector("#textarea") as HTMLTextAreaElement;
    this.translateDelay = document.querySelector(
      "#translate_delay"
    ) as HTMLInputElement;
    this.translatePopup = document.querySelector(
      ".translate__popup"
    ) as HTMLElement;
    this.translateQuestion = document.querySelector(
      "#translate_question"
    ) as HTMLElement;
    this.translateAnswer = document.querySelector(
      "#translate_answer"
    ) as HTMLElement;
    this.translateBtnStart = document.querySelector(
      "#translate_btn_start"
    ) as HTMLButtonElement;
    this.translateBtnStop = document.querySelector(
      "#translate_btn_stop"
    ) as HTMLButtonElement;
    this.translateBtnContinue = document.querySelector(
      "#translate_btn_continue"
    ) as HTMLButtonElement;
    this.translateProgressbar = document.querySelector(
      "#translate_progress_bar"
    ) as HTMLElement;
    this.addKeyListener = () => {};
  }

  subscribeToKeyup(
    delayCallback: (number: number) => boolean,
    preventCallback: () => void,
    nextCallback: () => void,
    deleteCallback: () => void,
    startCallback: () => void
  ) {
    this.addKeyListener = () => {
      this.html.onkeyup = (event: KeyboardEvent): void => {
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
  onClickTextarea() {
    this.textArea.addEventListener("click", () => {
      this.removeKeyListener();
    });
  }
  onBlurTextarea() {
    this.textArea.addEventListener("blur", () => {
      this.translateQuestion.textContent =
        "Sentences are changed. The game is over. Click to start!";
      this.translateAnswer.textContent = "";
    });
  }
  failTexarea() {
    this.translateQuestion.textContent =
      "Write pairs of English and Russian sentences in the area first!";
    this.translateAnswer.textContent = "";
  }
  failOriginList() {
    this.translateQuestion.textContent = "Origin list is not created!";
    this.translateAnswer.textContent = "";
  }

  bindToDelay(handler: (number: number) => void) {
    this.translateDelay.addEventListener("blur", () => {
      handler(this.getDelay());
    });
  }
  getDelay(): number {
    return parseFloat(this.translateDelay.value);
  }
  showPopup() {
    this.translatePopup.classList.toggle("show");
    setTimeout(() => {
      this.translatePopup.classList.toggle("show");
    }, 2000);
  }

  bindToStart(handler: () => void) {
    this.translateBtnStart.addEventListener("click", () => {
      this.addKeyListener();
      if (!this.textArea?.value) {
        this.failTexarea();
        this.removeKeyListener();
        return;
      }
      this.translateBtnContinue.focus();
      this.translateDelay.value = this.translateDelay.value || "10";
      handler();
    });
  }
  bindToNextLevel(handler: () => void) {
    this.translateBtnContinue.addEventListener("click", () => {
      this.addKeyListener();
      handler();
    });
  }
  bindToStop(handler: () => void) {
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

  sentence(question: string, answer: string) {
    this.translateQuestion.textContent = question;
    this.translateAnswer.textContent = answer;
  }
  result(number: number) {
    switch (true) {
      case number === 0:
        this.translateQuestion.textContent = "Keep going!";
        break;
      case number > 0: {
        this.translateQuestion.textContent = `
            Well done!
            You deleted ${number} ${number === 1 ? "card" : "cards"}!
        `;
        break;
      }
      default:
        this.translateQuestion.textContent = "Congratulations! You've won!";
        break;
    }
    this.translateAnswer.textContent = "";
  }

  updateProgress(count: number = 0, max: number = count) {
    if (!count) {
      this.translateProgressbar.style.width = "0%";
      this.translateProgressbar.textContent = "";
      return;
    }
    this.translateProgressbar.style.width = `${(count / max) * 100}%`;
    this.translateProgressbar.textContent =
      count === 1 ? `1 sentence is learned` : `${count} sentences are learned`;
  }
}

export { TView };
