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
export { originList };
//# sourceMappingURL=origin_model.js.map