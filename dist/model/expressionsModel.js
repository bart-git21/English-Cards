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
    getShallowList() {
        this.create();
        this.shuffled();
        return JSON.parse(JSON.stringify(this.list));
    },
};
class dragdropModel {
    dragdropAnswer;
    dragdropQuestion;
    list;
    counter;
    target;
    isMove;
    text;
    constructor(array = []) {
        this.dragdropAnswer = document.querySelector("#dragdrop_answer");
        this.dragdropQuestion = document.querySelector("#dragdrop_question");
        this.list = JSON.parse(JSON.stringify(array)) || [];
        this.counter = 0;
        this.target = null;
        this.isMove = false;
        this.text = "";
    }
    play() {
        if (this.counter >= this.list.length)
            return true;
        this.dragdropAnswer.textContent = null;
        this.dragdropQuestion.textContent = this.list[this.counter][0];
        this.text = this.list[this.counter][1]
            .toLowerCase()
            .replace(/[^a-zA-Z]$/g, "");
        // this.text = this.text
        let words = this.text.split(" ");
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
        const string = Object.values(userOrder).join(" ").toLowerCase();
        if (this.text === string) {
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
export { originList, dragdropModel };
//# sourceMappingURL=origin_model.js.map