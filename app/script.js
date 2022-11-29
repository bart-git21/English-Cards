import {
    shuffle,
    rememberGameBtn,
    shuffleGameBtn,
    trashBtn,
    html,
    pauseInput,
    pauseContainer,
    questionContainer,
    answerContainer,
    infoContainer,
    textArea,
    writingGameBtn,
} from "./global.js";


let originListOfWords = [];
let arr_for_asking = [];
let isChangingPause = false;
let deletedCardsCounter = 0;

html.addEventListener("keyup", changePause);
function addPausePopup(text) {
    const div = document.createElement("div");
    div.textContent = `${text} s`;
    div.classList = "pausePopup";
    pauseContainer.appendChild(div);
    setTimeout(()=> div.remove(), 2000);
}
function fetchPause(isPauseUp) {
    isChangingPause = true;    
    let pauseValue = +pauseInput.value || 2;
    pauseValue = isPauseUp ? ( Math.ceil(pauseValue * 10 + 1)/10 ) : ( Math.floor(pauseValue * 10 - 1)/10 );
    addPausePopup(pauseValue);
    return new Promise(
        resolve => {
            setTimeout(()=>{
                resolve(pauseValue)
            },2000)
        }
    )
}
async function changePause(event) {
    if (isChangingPause) return;
    switch (event.key) {
        case "ArrowUp": pauseInput.value = await fetchPause(true); break;
        case "ArrowDown": pauseInput.value = await fetchPause(false); break;
        case "ArrowLeft": translate_prevPhrase(); break;
        case "ArrowRight": translate_nextPhrase(); break;
    }
    isChangingPause = false;
}


// создать исходный массив вопросов
function createQuestionsList() {
    let phrasesList = textArea.value.split("\n");
    phrasesList.forEach((e,index)=> e==="" && phrasesList.splice(index,1)); // удалить пустые строки

    // если каждая из англ и рус фраз записаны в отдельном абзаце - преобразовать два абзаца в один (англ+рус)
    for (let i = 1; i<phrasesList.length; i++) {
        if(phrasesList[i].search(/[а-яА-Я]/g) == 0 && phrasesList[i-1].search(/[а-яА-Я]/g) == -1) {
            phrasesList[i-1] = phrasesList[i-1].concat(phrasesList[i]);
            phrasesList.splice(i,1);
        }
        else if(phrasesList[i].search(/[a-zA-Z]/g) == 0 && phrasesList[i-1].search(/[a-zA-Z]/g) == -1) {
            phrasesList[i-1] = phrasesList[i-1].concat(phrasesList[i]);
            phrasesList.splice(i,1);
        }
    }

    // преобразовываем каждую строку в массив [рус, англ]
    let newList = phrasesList.map(
        e => {
            const {russianExpression, engExpression} = getRussianAndEnglishExpressions(e);
            return [russianExpression, engExpression];
        }
    )
    
    shuffle(newList);
    return newList;
}
function getRussianAndEnglishExpressions(string) {
    let russianExpression = "";
    let engExpression = "";
    let rusExpressionIndex = string.search(/[а-яА-Я]/g);
    let engExpressionIndex = string.search(/[a-zA-Z]/g);
    if (rusExpressionIndex > engExpressionIndex) {
        russianExpression = string.slice(rusExpressionIndex);
        engExpression = string.slice(0,rusExpressionIndex);
    }
    else {
        russianExpression = string.slice(0,engExpressionIndex);
        engExpression = string.slice(engExpressionIndex);
    }
    // чистим фразы от мусора (лишние пробелы, запятые, точки и проч.)
    engExpression = engExpression.replace(/\s{2,}/g, "");
    engExpression = engExpression.replace(/[—\.,]/g, "");
    engExpression = engExpression.replace(/\s-/g, "");
    engExpression = engExpression.replace(/\s*$/g,"");
    engExpression = engExpression.trimEnd();
    russianExpression = russianExpression.replace(/[\.\d]/g, "");
    return {russianExpression, engExpression};
}


// ============================  Sidebar - кнопки с номерами ===========

// start position
function moveToStart() {
    originListOfWords = [];
    questionContainer.classList.remove("green");
    translate_howManyQuestionsIsNow = 0;
    howManyQuestionsIsNow__shuffleGame = 0;
    howManyQuestionsIsNow__writingGame = 0;
}
function inputSidebar(text) {
    originListOfWords = createQuestionsList();
    infoContainer.innerHTML = null;
    const listNameDiv = document.createElement("div");
    listNameDiv.textContent = `this is the list of "${text}"`;
    const listLengthDiv = document.createElement("div");
    listLengthDiv.textContent = `${originListOfWords.length} elements are in the list`;
    infoContainer.appendChild(listNameDiv);
    infoContainer.appendChild(listLengthDiv);
}
// пользователь заполнил textArea
textArea.addEventListener("input", function() {
    moveToStart();
    inputSidebar("user");
});
// заполнить textArea с помощью кнопки
async function inputTextarea(text) {
    const response = await fetch(`./public/${text}.txt`);
    const data = await response.text();
    return new Promise(
        res => {
            setTimeout(()=>{res(textArea.value = data)}, 100)
        }
    )
}
async function enterTextareaAndSidebar(e) {
    moveToStart();
    await inputTextarea(e.target.textContent);
    inputSidebar(e.target.textContent);
}



// ============================ кнопка "переводить карточки" ===============================

let translate_howManyQuestionsIsNow = 0;
let translate_getCounter = null;
let translate_timer;
const MAX_NUMBERS_OF_WORDS = 11;
function translate_showFirstNQuestions(counter) {
    if (counter === arr_for_asking.length) {
        questionContainer.textContent = `
            Well done!
            You deleted ${deletedCardsCounter} cards!
        `;
        answerContainer.textContent = null;
        translate_getCounter = null;
    }
    else {
        questionContainer.textContent = arr_for_asking[counter][0];
        answerContainer.textContent = arr_for_asking[counter][1];
        translate_getCounter = ++counter;
        const pause = parseFloat(pauseInput.value) || 2;
        translate_timer = setTimeout(()=>{translate_showFirstNQuestions(counter)}, pause * 1000);
    }
}
function translate_prevPhrase() {
    if ((translate_getCounter -= 2) >= 0) {
        clearTimeout(translate_timer);
        translate_showFirstNQuestions(translate_getCounter);
    }
}
function translate_nextPhrase() {
    clearTimeout(translate_timer);
    if (translate_getCounter === null) return;
    translate_showFirstNQuestions(translate_getCounter);
}
function translate_start() {
    // если показ вопросов будет начат во время предыдущей итерации, итерация будет остановлена
    clearTimeout(translate_timer);

    // create questions list
    if (originListOfWords.length === 0) {
        questionContainer.classList.remove("green");
        originListOfWords = createQuestionsList();
    }

    // take first N questions
    (translate_howManyQuestionsIsNow === MAX_NUMBERS_OF_WORDS || translate_howManyQuestionsIsNow === originListOfWords.length) ? questionContainer.classList.add("green") : translate_howManyQuestionsIsNow++;
    arr_for_asking = originListOfWords.slice(0, translate_howManyQuestionsIsNow);
    shuffle(arr_for_asking);
    translate_showFirstNQuestions(0);
}
function deleteQuestion() {
    deletedCardsCounter += 1;
    questionContainer.classList.remove("green");
    let i = 0;
    originListOfWords.forEach(
        (e, index) => (e[0] === questionContainer.textContent) && (i = index)
    )
    originListOfWords.splice(i, 1);
    translate_howManyQuestionsIsNow--;
    rememberGameBtn.focus();
}
rememberGameBtn.addEventListener("click", translate_start);
trashBtn.addEventListener("click", deleteQuestion);



// ============================ кнопка "Перемешать слова" ===========

let howManyQuestionsIsNow__shuffleGame = 0;
shuffleGameBtn.addEventListener("click", shuffleGameButton);
function shuffleGameButton() {
    // если эта игра будет вызвана во время игры "переводить карточки", показ будет остановлен
    clearTimeout(translate_timer);

    // список вопросов
    if (originListOfWords.length == 0) originListOfWords = createQuestionsList();

    // если закончились вопросы - Well done
    if (howManyQuestionsIsNow__shuffleGame === originListOfWords.length) {
        questionContainer.innerHTML = "Well done!";
        answerContainer.innerHTML = null;
        howManyQuestionsIsNow__shuffleGame = 0;
        return;
    }

    // разбиваем вопрос на рус. и англ. части
    let i = howManyQuestionsIsNow__shuffleGame++;
    let russianText = originListOfWords[i][0];
    let englishText = originListOfWords[i][1];
    englishText = englishText.replace(/[^a-zA-Z]$/g, "");

    // выводим на экран русский перевод и англиские слова
    questionContainer.innerHTML = russianText;
    let div = document.createElement("div");
    div.classList.add("parent");
    questionContainer.append(div);
    let englishTextArray = englishText.split(" ");
    shuffle(englishTextArray);
    for (let i = 0; i<englishTextArray.length; i++) {
        if (englishTextArray[i].search(/[a-zA-Z0-9]/g) > -1) div.innerHTML += `<button class="shuffleGame__moveIt-btn">${englishTextArray[i]}</button>`;
    }

    // move buttons
    let target;
    const parent = document.querySelector(".parent");
    parent.addEventListener("mousemove", shuffleGame__moveTarget);
    function shuffleGame__moveTarget(event) {
        if (target) {
            if ([...target.classList] == "shuffleGame__moveIt-btn") {
                target.style.position = "absolute";
                target.style.left = `${event.clientX - event.target.getBoundingClientRect().x}px`;
                target.style.top = `${event.clientY - event.target.getBoundingClientRect().y}px`;
            }
        }
    }
    parent.addEventListener("mousedown", shuffleGame__findAndDropTarget);
    function shuffleGame__findAndDropTarget(e) {
        if ([...e.target.classList].find(e=>e==="shuffleGame__moveIt-btn")) {
            target = e.target;
        }
        else {
            target.style.position = "absolute";
            target.style.left = `${e.clientX - e.target.getBoundingClientRect().x - parseInt(window.getComputedStyle(target).marginLeft)}px`;
            target.style.top = `${e.clientY - e.target.getBoundingClientRect().y - parseInt(window.getComputedStyle(target).marginTop)}px`;
            target = null;
        }
    }

    // check result
    if (document.querySelector(".shuffleGame__checkResult-btn")) document.querySelector(".shuffleGame__checkResult-btn").removeEventListener("click", shuffleGameButton);
    answerContainer.innerHTML = '<button class="shuffleGame__checkResult-btn"></button>';
    const shuffleGame__checkResult_btn = document.querySelector(".shuffleGame__checkResult-btn");
    shuffleGame__checkResult_btn.classList = "shuffleGame__checkResult-btn";
    shuffleGame__checkResult_btn.textContent = "check it";
    shuffleGame__checkResult_btn.addEventListener("click", checkWords);
    function checkWords() {
        let buttons = document.querySelectorAll(".shuffleGame__moveIt-btn");
        let buttonsArray = [];
        for(let i = 0;i<buttons.length; i++) {
            let [ xCoord, BtnText ] = [parseInt( buttons[i].getBoundingClientRect().x ), buttons[i].textContent];
            buttonsArray.push([ xCoord, BtnText ]);
        }
        buttonsArray.sort((a,b)=>{return a[0]-b[0]});
        let checkingString = [];
        for (let i =0; i<buttonsArray.length; i++) {
            checkingString.push(buttonsArray[i][1]);
        }
        
        shuffleGame__checkResult_btn.removeEventListener("click", checkWords);

        if (englishText === checkingString.join(" ")) {
            shuffleGame__checkResult_btn.textContent = "it'correct! next question?";
            shuffleGame__checkResult_btn.classList.toggle("shuffleGame__correct-btn");
            shuffleGame__checkResult_btn.addEventListener("click", shuffleGameButton);
        }
        else {
            shuffleGame__checkResult_btn.addEventListener("click", checkWords);
            shuffleGame__checkResult_btn.classList.add("shuffleGame__wrong-btn");
            shuffleGame__checkResult_btn.textContent = "no, it's wrong! try again!";
        }
    }
}



// ============================ кнопка "написание" ===========

let howManyQuestionsIsNow__writingGame = 0;
writingGameBtn.addEventListener("click", writingGame);
function writingGame() {
    // если эта игра будет вызвана во время игры "переводить карточки", показ будет остановлен
    clearTimeout(translate_timer);

    // список вопросов
    if (!originListOfWords.length) originListOfWords = createQuestionsList();

    // если закончились вопросы, Well done
    if (howManyQuestionsIsNow__writingGame === originListOfWords.length) {
        questionContainer.innerHTML = "Well done!";
        answerContainer.innerHTML = null;
        howManyQuestionsIsNow__writingGame = 0;
        return;
    }

    // разбиваем вопрос на рус. и англ. части
    let i = howManyQuestionsIsNow__writingGame++;
    let russianText = originListOfWords[i][0];
    let englishText = originListOfWords[i][1];

    // ask a question
    questionContainer.textContent = englishText;    
    let input_writing = document.createElement("input");
    input_writing.classList.add("wr__pause-btn");
    input_writing.addEventListener("keyup", listenEnter);
    let div = document.createElement("div");
    div.classList.add("parent");
    div.append(input_writing);
    questionContainer.append(div);
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
    answerContainer.innerHTML = `
        <button class="shuffleGame__checkResult-btn nextButton">next</button>
        <span>${russianText}</span>
    `;
    const nextButton = document.querySelector(".nextButton");
    nextButton.addEventListener("click", function() {writingGame()});
}

export {enterTextareaAndSidebar};