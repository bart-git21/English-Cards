import { shuffle } from "../global.js";
function getRussianAndEnglishExpressions(string) {
    let russianExpression = "";
    let engExpression = "";
    let rusExpressionIndex = string.search(/[а-яА-Я]/g);
    let engExpressionIndex = string.search(/[a-zA-Z]/g);
    if (rusExpressionIndex > engExpressionIndex) {
        russianExpression = string.slice(rusExpressionIndex);
        engExpression = string.slice(0, rusExpressionIndex);
    }
    else {
        russianExpression = string.slice(0, engExpressionIndex);
        engExpression = string.slice(engExpressionIndex);
    }
    // чистим фразы от мусора (лишние пробелы, запятые, точки и проч.)
    engExpression = engExpression.replace(/^[\d+\s+]/g, "");
    engExpression = engExpression.replace(/\s*$/g, "");
    engExpression = engExpression.trimEnd();
    russianExpression = russianExpression.replace(/[\.\d]/g, "");
    return { russianExpression, engExpression };
}
const originList = {
    textarea: document.querySelector("#textarea"),
    translateQuestion: document.querySelector("#translate_question"),
    textAreaValue: "",
    sentences: [],
    list: [],
    getStringValue() {
        this.textAreaValue = this.textarea?.value || "";
    },
    create() {
        this.getStringValue();
        if (!this.textAreaValue) {
            this.translateQuestion.innerHTML = "Enter the expressions!";
            this.list = [];
            return;
        }
        this.textAreaValue = this.textAreaValue.replace(/[-—\.\*+\d+]/g, "");
        this.textAreaValue = this.textAreaValue.replace(/ {2,}/g, " ");
        this.sentences = this.textAreaValue.split("\n") || [];
        this.sentences = this.sentences.filter(Boolean);
        let newList = this.sentences.filter(Boolean); // удалить пустые строки
        // если каждая из англ и рус фраз записаны в отдельном абзаце - преобразовать два абзаца в один (англ+рус)
        for (let i = 1; i < newList.length; i++) {
            if (newList[i].trim().search(/[а-яА-Я]/g) === 0 &&
                newList[i - 1].trim().search(/[а-яА-Я]/g) === -1) {
                newList[i - 1] = newList[i - 1].concat(newList[i]);
                newList.splice(i, 1);
            }
            else if (newList[i].trim().search(/[a-zA-Z]/g) === 0 &&
                newList[i - 1].trim().search(/[a-zA-Z]/g) === -1) {
                newList[i - 1] = newList[i - 1].concat(newList[i]);
                newList.splice(i, 1);
            }
        }
        // преобразовываем каждую строку в массив [рус, англ]
        this.list = newList.map((e) => {
            const { russianExpression, engExpression } = getRussianAndEnglishExpressions(e);
            return [russianExpression, engExpression];
        });
    },
    shuffled() {
        shuffle(this.list);
    },
    clear() {
        this.list = [];
    },
};
// class translateModel {
//   translateQuestion: HTMLElement;
//   translateAnswer: HTMLElement;
//   motherList: string[][];
//   trainingList: string[][];
//   counter: number;
//   timerId: number;
//   ms: number;
//   amount: number;
//   progress: number;
//   isPlay: boolean;
//   constructor(array = [] as string[][]) {
//     this.translateQuestion = document.querySelector(
//       "#translate_question"
//     ) as HTMLElement;
//     this.translateAnswer = document.querySelector(
//       "#translate_answer"
//     ) as HTMLElement;
//     this.motherList = JSON.parse(JSON.stringify(array)) || [];
//     this.trainingList = [];
//     this.counter = 0;
//     this.timerId = 0;
//     this.ms = 5;
//     this.amount = this.motherList.length;
//     this.progress = 0;
//     this.isPlay = false;
//   }
//   add() {
//     if (this.motherList.length) {
//       const element: string[] = this.motherList.pop() as string[];
//       this.trainingList.push(element);
//     }
//   }
//   shuffleTrainingList() {
//     shuffle(this.trainingList);
//   }
//   getDelay() {
//     return this.ms;
//   }
//   updateDelay(ms: number) {
//     this.ms = ms;
//   }
//   stop() {
//     clearTimeout(this.timerId);
//     this.isPlay = false;
//   }
//   updateProgress() {
// const translateProgressbar = document.querySelector(
//   "#translate_progress_bar"
// ) as HTMLInputElement;
// if (!this.motherList.length && !this.trainingList.length) {
//   this.progress = 0;
//   translateProgressbar.style.width = "0%";
//   translateProgressbar.textContent = "";
//   return;
// }
// this.progress =
//   this.amount - this.motherList.length - this.trainingList.length;
// translateProgressbar.style.width = `${
//   (this.progress / this.amount) * 100
// }%`;
// translateProgressbar.textContent =
//   this.progress === 1
//     ? `1 sentence is learned`
//     : `${this.progress} sentences are learned`;
//   }
//   excludeElement() {
// if (!this.isPlay) return;
// this.stop();
// this.trainingList.splice(this.counter, 1);
// this.updateProgress();
// this.playGame();
//   }
//   nextElement() {
//     // this.stop();
//     if (this.counter < this.trainingList.length) {
//       this.counter++;
//       this.playGame();
//     } else {
//       this.updateList();
//     }
//   }
//   previewElement() {
//     if (!this.isPlay) return;
//     this.stop();
//     this.counter > 0 && (this.counter -= 1);
//     this.playGame();
//   }
//   displayElement() {
// this.translateQuestion.textContent = this.trainingList[this.counter][0];
// this.translateAnswer.textContent = this.trainingList[this.counter][1];
// return new Promise<void>((resolve) => {
//     console.log("from promise this.ms = ", this.ms);
//   this.timerId = setTimeout(() => resolve(), this.ms * 1000);
// });
//   }
//   displayResult() {
//     if (!this.motherList.length && !this.trainingList.length) {
//       this.translateQuestion.textContent = "Congratulations! You are win!";
//       return;
//     }
//     this.progress =
//       this.amount - this.motherList.length - this.trainingList.length;
//     const text = `
//                     Well done!
//                     You deleted ${this.progress} ${
//       this.progress === 1 ? "card" : "cards"
//     }!
//         `;
//     this.translateQuestion.textContent = this.progress ? text : "Keep going!";
//     this.translateAnswer.textContent = null;
//   }
//   async playGame() {
// try {
//   this.isPlay = true;
//   while (this.counter < this.trainingList.length) {
// await this.displayElement();
// this.counter += 1;
//   }
//   this.displayResult();
//   this.isPlay = false;
// } catch (err) {
//   console.log(err);
// }
//   }
//   async updateList() {
// try {
//   this.stop();
//   this.motherList.length && this.trainingList.length < 11 && this.add();
//   this.trainingList.length > 1 && this.shuffleTrainingList();
//   this.updateProgress();
//   this.counter = 0;
// } catch (err) {
//   console.log(err);
// }
//   }
// }
class dragdropModel {
    dragdropAnswer;
    dragdropQuestion;
    list;
    counter;
    target;
    isMove;
    constructor(array = []) {
        this.dragdropAnswer = document.querySelector("#dragdrop_answer");
        this.dragdropQuestion = document.querySelector("#dragdrop_question");
        this.list = JSON.parse(JSON.stringify(array)) || [];
        this.counter = 0;
        this.target = null;
        this.isMove = false;
    }
    play() {
        if (this.counter >= this.list.length)
            return true;
        this.dragdropAnswer.textContent = null;
        this.dragdropQuestion.textContent = this.list[this.counter][0];
        let englishText = this.list[this.counter][1];
        englishText = englishText.replace(/[^a-zA-Z]$/g, "");
        let words = englishText.split(" ");
        shuffle(words);
        for (let word of words) {
            if (word.search(/[a-zA-Z0-9]/g) > -1)
                this.dragdropAnswer.insertAdjacentHTML("beforeend", `<button class="dragdrop__word">${word}</button>`);
        }
    }
    drag(e) {
        this.target = e.target;
    }
    drop() {
        this.target = null;
    }
    move(event, target = this.target) {
        if (!target)
            return;
        if (this.isMove)
            return;
        this.isMove = true;
        target.style.position = "absolute";
        if (this.dragdropAnswer) {
            target.style.left = `${event.clientX - this.dragdropAnswer.getBoundingClientRect().left}px`;
            target.style.top = `${event.clientY - this.dragdropAnswer.getBoundingClientRect().top}px`;
        }
        setTimeout(() => {
            this.isMove = false;
        }, 50);
    }
    check() {
        if (this.counter >= this.list.length)
            return true;
        const nodeList = document.querySelectorAll(".dragdrop__word");
        let buttons = [...nodeList];
        const userOrder = {};
        buttons.forEach((e) => {
            const xCoord = e.getBoundingClientRect().x;
            const key = Math.floor(xCoord);
            userOrder[key] = e.textContent ?? "";
        });
        const string = Object.values(userOrder).join(" ");
        if (this.list[this.counter][1].toLowerCase() === string) {
            this.counter += 1;
            return true;
        }
        else {
            return false;
        }
    }
    next() {
        this.counter++;
        this.play();
    }
    prev() {
        this.counter--;
        this.play();
    }
}
class writingModel {
    writingQuestion;
    writingAnswer;
    writingList;
    counter;
    text;
    userText;
    constructor(array = []) {
        this.writingQuestion = document.querySelector("#writing_question");
        this.writingAnswer = document.querySelector("#writing_answer");
        this.writingList = JSON.parse(JSON.stringify(array)) || [];
        this.counter = 0;
        this.text = "";
        this.userText = "";
    }
    play() {
        this.writingAnswer.value = "";
        this.writingAnswer.focus();
        if (this.counter >= this.writingList.length) {
            this.writingQuestion.textContent = "You are finish!";
            this.counter = 0;
            return;
        }
        this.writingQuestion.textContent = this.writingList[this.counter][0];
        this.text = this.writingList[this.counter][1].toLowerCase();
    }
    fail() {
        this.writingQuestion.textContent = "Enter the sentences first!";
    }
    setUserText() {
        this.userText = this.writingAnswer.value.toLowerCase();
    }
    check() {
        console.log(this.text);
        this.writingAnswer.value = "";
        return this.userText.localeCompare(this.text) === 0;
        // if (this.userText === this.text) {
        //   return true;
        // } else {
        //   return false;
        // }
    }
    next() {
        this.counter++;
        this.play();
    }
    prev() {
        this.counter > 0 && this.counter--;
        this.play();
    }
}
// export { originList, translateModel, dragdropModel, writingModel };
export { originList, dragdropModel, writingModel };
//# sourceMappingURL=expressionsModel.js.map