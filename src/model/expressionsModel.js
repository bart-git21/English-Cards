import {
  translateAnswer,
  translateProgressbar,
  translateDelay,
  translatePopup,
  dragdropAnswer,
  shuffle,
  textArea,
} from "../global.js";

function getRussianAndEnglishExpressions(string) {
  let russianExpression = "";
  let engExpression = "";
  let rusExpressionIndex = string.search(/[а-яА-Я]/g);
  let engExpressionIndex = string.search(/[a-zA-Z]/g);
  if (rusExpressionIndex > engExpressionIndex) {
    russianExpression = string.slice(rusExpressionIndex);
    engExpression = string.slice(0, rusExpressionIndex);
  } else {
    russianExpression = string.slice(0, engExpressionIndex);
    engExpression = string.slice(engExpressionIndex);
  }
  // чистим фразы от мусора (лишние пробелы, запятые, точки и проч.)
  //   engExpression = engExpression.replace(/^\d+/g, "");
  //   engExpression = engExpression.replace(/[-—\.,\*]/g, "");
  engExpression = engExpression.replace(/^[\d+\s+]/g, "");
  engExpression = engExpression.replace(/\s*$/g, "");
  engExpression = engExpression.trimEnd();
  russianExpression = russianExpression.replace(/[\.\d]/g, "");
  return { russianExpression, engExpression };
}

const originList = {
  list: [],

  create() {
    let textAreaValue = textArea.value;
    if (!textAreaValue) return (this.list = []);

    textAreaValue = textAreaValue.replace(/[-—\.\*+\d+]/g, "");
    textAreaValue = textAreaValue.replace(/ {2,}/g, " ");
    textAreaValue = textAreaValue.split("\n");
    textAreaValue = textAreaValue.filter(Boolean);

    if (!textAreaValue) {
      const translateQuestion = document.querySelector("#translate_question");
      translateQuestion.innerHTML = "Enter the expressions!";
      return;
    }
    let newList = textAreaValue.filter(Boolean); // удалить пустые строки

    // если каждая из англ и рус фраз записаны в отдельном абзаце - преобразовать два абзаца в один (англ+рус)
    for (let i = 1; i < newList.length; i++) {
      if (
        newList[i].trim().search(/[а-яА-Я]/g) === 0 &&
        newList[i - 1].trim().search(/[а-яА-Я]/g) === -1
      ) {
        newList[i - 1] = newList[i - 1].concat(newList[i]);
        newList.splice(i, 1);
      } else if (
        newList[i].trim().search(/[a-zA-Z]/g) === 0 &&
        newList[i - 1].trim().search(/[a-zA-Z]/g) === -1
      ) {
        newList[i - 1] = newList[i - 1].concat(newList[i]);
        newList.splice(i, 1);
      }
    }

    // преобразовываем каждую строку в массив [рус, англ]
    newList = newList.map((e) => {
      const { russianExpression, engExpression } =
        getRussianAndEnglishExpressions(e);
      return [russianExpression, engExpression];
    });

    this.list = newList;
    // return newList;
  },
  shuffled() {
    shuffle(this.list);
  },
  clear() {
    this.list = [];
  },
};

class TranslateModel {
  constructor(array = []) {
    this.motherList = JSON.parse(JSON.stringify(array)) || [];
    this.trainingList = [];
    this.counter = 0;
    this.timerId = 0;
    this.ms = 5;
    this.amount = this.motherList.length;
    this.progress = 0;
    this.isPlay = false;
    this.isChangingDelay = false;
  }
  add() {
    this.motherList.length && this.trainingList.push(this.motherList.pop());
  }
  shuffleTrainingList() {
    shuffle(this.trainingList);
  }
  getDelay() {
    this.ms = parseFloat(translateDelay.value) || 5;
  }
  updateDelay(isHigher) {
    if (this.isChangingDelay) return;
    this.isChangingDelay = true;
    this.ms = isHigher ? this.ms + 0.5 : this.ms - 0.5;
    translateDelay.value = this.ms;
    translatePopup.textContent = this.ms;
    translatePopup.classList.toggle("show");
    setTimeout(() => {
      this.isChangingDelay = false;
      translatePopup.classList.toggle("show");
    }, 2000);
  }
  stop() {
    clearTimeout(this.timerId);
    this.isPlay = false;
  }
  updateProgress() {
    if (!this.motherList.length && !this.trainingList.length) {
      this.progress = 0;
      translateProgressbar.style.width = "0%";
      translateProgressbar.textContent = "";
      return;
    }

    this.progress =
      this.amount - this.motherList.length - this.trainingList.length;
    translateProgressbar.style.width = `${
      (this.progress / this.amount) * 100
    }%`;
    translateProgressbar.textContent =
      this.progress === 1
        ? `1 sentence is learned`
        : `${this.progress} sentences are left`;
  }
  excludeElement() {
    if (!this.isPlay) return;
    this.stop();
    this.trainingList.splice(this.counter, 1);
    this.updateProgress();
    this.display();
  }
  nextElement() {
    this.stop();
    if (this.counter < this.trainingList.length) {
      this.counter += 1;
      this.display();
    } else {
      this.play();
    }
  }
  previewElement() {
    if (!this.isPlay) return;
    this.stop();
    this.counter > 0 && (this.counter -= 1);
    this.display();
  }
  displayElement() {
    const translateQuestion = document.querySelector("#translate_question");
    const translateAnswer = document.querySelector("#translate_answer");
    translateQuestion.textContent = this.trainingList[this.counter][0];
    translateAnswer.textContent = this.trainingList[this.counter][1];
    return new Promise((resolve) => {
      this.timerId = setTimeout(() => resolve(), this.ms * 1000);
    });
  }
  displayResult() {
    const translateQuestion = document.querySelector("#translate_question");
    const translateAnswer = document.querySelector("#translate_answer");
    if (!this.motherList.length && !this.trainingList.length) {
      translateQuestion.textContent = "Congratulations! You are win!";
      return;
    }

    this.progress =
      this.amount - this.motherList.length - this.trainingList.length;
    const text = `
                Well done!
                You deleted ${this.progress} ${
      this.progress === 1 ? "card" : "cards"
    }!
    `;

    translateQuestion.textContent = this.progress ? text : "Keep going!";
    translateAnswer.textContent = null;
  }
  async display() {
    if (!this.isPlay) return;
    this.isPlay = true;
    while (this.counter < this.trainingList.length) {
      await this.displayElement();
      this.counter += 1;
    }
    this.displayResult();
    this.isPlay = false;
  }
  async play() {
    try {
      this.stop();
      this.motherList.length && this.trainingList.length < 11 && this.add();
      this.trainingList.length > 1 && this.shuffleTrainingList();
      translateDelay.value = this.ms;
      this.getDelay();
      this.updateProgress();
      this.counter = 0;
      await this.display();
    } catch (err) {
      console.log(err);
    }
  }
}

class dragdropModel {
  constructor(array = []) {
    this.list = JSON.parse(JSON.stringify(array)) || [];
    this.counter = 0;
    this.target = null;
    this.isMove = false;
  }

  play() {
    if (this.counter >= this.list.length) return true;

    const dragdrop_question = document.querySelector("#dragdrop_question");
    const dragdrop_answer = document.querySelector("#dragdrop_answer");
    dragdropAnswer.textContent = null;

    // разбиваем вопрос на рус. и англ. части
    let russianText = this.list[this.counter][0];
    let englishText = this.list[this.counter][1];
    englishText = englishText.replace(/[^a-zA-Z]$/g, "");
    let words = englishText.split(" ");
    shuffle(words);

    // display russian translate and english buttons
    dragdrop_question.innerHTML = `
            <div>${russianText}</div>
        `;
    for (let word of words) {
      if (word.search(/[a-zA-Z0-9]/g) > -1)
        dragdrop_answer.insertAdjacentHTML(
          "beforeend",
          `<button class="dragdrop__word">${word}</button>`
        );
    }
  }

  drag(e) {
    this.target = e.target;
  }
  drop() {
    this.target = null;
  }
  move(event, target) {
    if (!target) return;
    if (this.isMove) return;
    this.isMove = true;
    target.style.position = "absolute";
    target.style.left = `${
      event.clientX - dragdropAnswer.getBoundingClientRect().left
    }px`;
    target.style.top = `${
      event.clientY - dragdropAnswer.getBoundingClientRect().top
    }px`;
    setTimeout(() => {
      this.isMove = false;
    }, 50);
  }
  check() {
    if (this.counter >= this.list.length) return true;
    let buttons = [...document.querySelectorAll(".dragdrop__word")];
    const userOrder = {};
    buttons.forEach(e => userOrder[parseInt(e.getBoundingClientRect().x)] = e.textContent);
    const string = Object.values(userOrder).join(" ");
    if (this.list[this.counter][1].toLowerCase(0) === string) {
      this.counter += 1;
      return true;
    } else {
      return false;
    }
  }
}

const writingGame = {
  writing() {
    let howManyQuestionsIsNow__writingGame = 0;
    writingBtn.addEventListener("click", function (e) {
      e.preventDeafult();
      writingGame();
    });
    function writingGame() {
      // если эта игра будет вызвана во время игры "переводить карточки", показ будет остановлен
      controllers.translateGame.stop();

      // список вопросов
      const textAreaValue = textArea.value.split("\n") || "";
      if (!originList.list.length) originList.create(textAreaValue);

      // если закончились вопросы, Well done
      if (howManyQuestionsIsNow__writingGame === originList.list.length) {
        translateQuestion.innerHTML = "Well done!";
        translateAnswer.innerHTML = null;
        howManyQuestionsIsNow__writingGame = 0;
        return;
      }

      // разбиваем вопрос на рус. и англ. части
      let i = howManyQuestionsIsNow__writingGame++;
      let russianText = originList.list[i][0];
      let englishText = originList.list[i][1];

      // ask a question
      translateQuestion.textContent = russianText;
      let input_writing = document.createElement("input");
      input_writing.classList.add("wr__pause-btn");
      input_writing.addEventListener("keyup", listenEnter);
      let div = document.createElement("div");
      div.classList.add("parent");
      div.append(input_writing);
      translateQuestion.append(div);
      input_writing.focus();

      // check result
      function listenEnter(e) {
        if (e.key === "Enter") checkWords();
      }
      function checkWords() {
        if (input_writing.value.toLowerCase() === englishText.toLowerCase()) {
          writingGame();
        }
      }

      // next button function
      translateAnswer.innerHTML = `
        <button class="shuffleGame__checkResult-btn nextButton">will be repeat</button>
        <span>${englishText}</span>
    `;
      const nextButton = document.querySelector(".nextButton");
      nextButton.addEventListener("click", function () {
        originList.list.push(originList.list[i]);
        writingGame();
      });
    }
  },
};

export { originList, TranslateModel, dragdropModel, writingGame };
