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
    isPauseUp ? pauseValue = ( Math.ceil(pauseValue * 10 + 1)/10 ) : pauseValue = ( Math.floor(pauseValue * 10 - 1)/10 );
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
    }
    isChangingPause = false;
}


// создать исходный массив вопросов
function createListOfQuestion() {
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
    russianExpression = russianExpression.replace(/[()\.\d]/g, "");
    return {russianExpression, engExpression};
}


// ============================  Sidebar - кнопки с номерами ===========

// заполнить textArea
function showQuestions(url) {
    fetch(url)
    .then(response => response.text())
    .then(data => textArea.value = data)
}
// очистить originListOfWords и скрыть выбранную кнопку
function chooseThisList(elem) {
    originListOfWords = [];
    howManyQuestionsIsNow__repeatGame = 0;
    howManyQuestionsIsNow__shuffleGame = 0;
    howManyQuestionsIsNow__writingGame = 0;
    questionContainer.classList.remove("green");
    infoContainer.innerHTML = `this is the list # ${elem.textContent}`;
    showQuestions(`./public/${elem.textContent}.txt`);
}
function addClickListener() {
    document.querySelectorAll(".btn-small").forEach(e => {
        e.addEventListener("click", function(){chooseThisList(this)});
    })
}

// ============================ если пользователь изменил textArea, список тоже меняется ===============================
textArea.addEventListener("input", listenAreaChanging);
function listenAreaChanging() {
    originListOfWords = createListOfQuestion();
    howManyQuestionsIsNow__repeatGame = 0;
    howManyQuestionsIsNow__shuffleGame = 0;
    howManyQuestionsIsNow__writingGame = 0;
}



// ============================ кнопка "переводить карточки" ===============================

let howManyQuestionsIsNow__repeatGame = 0;
let repeatGame__timer;
const MAX_NUMBERS_OF_WORDS = 11;
rememberGameBtn.addEventListener("click", translateGame);
function translateGame() {
    // если показ вопросов будет начат во время предыдщей итерации, предыдущая будет остановлена
    clearInterval(repeatGame__timer);

    // create questions list
    if (originListOfWords.length === 0) {
        questionContainer.classList.remove("green");
        originListOfWords = createListOfQuestion();
    }

    // take first N questions
    (howManyQuestionsIsNow__repeatGame === MAX_NUMBERS_OF_WORDS) ? questionContainer.classList.add("green") : howManyQuestionsIsNow__repeatGame++;
    arr_for_asking = originListOfWords.slice(0, howManyQuestionsIsNow__repeatGame);
    shuffle(arr_for_asking);
    
    // show first N questions
    let i = 0;
    repeatGame__show();
    const pause = parseFloat(pauseInput.value) || 2;
    repeatGame__timer = setInterval(repeatGame__show, pause * 1000);
    function repeatGame__show() {
        if (i == arr_for_asking.length) {
            questionContainer.textContent = "well done!";
            answerContainer.textContent = null;
            clearInterval(repeatGame__timer);
        }
        else {
            questionContainer.textContent = arr_for_asking[i][0];
            answerContainer.textContent = arr_for_asking[i][1];
        }
        i++;
    }
}
trashBtn.addEventListener("click", deleteQuestion);
function deleteQuestion() {
    questionContainer.classList.remove("green");
    let i = 0;
    originListOfWords.forEach(
        (e, index) => {
            if (e[0] === questionContainer.textContent) i = index;
        }
    )
    originListOfWords.splice(i, 1);
    howManyQuestionsIsNow__repeatGame--;
    rememberGameBtn.focus();
}



// ============================ кнопка "Перемешать слова" ===========

let howManyQuestionsIsNow__shuffleGame = 0;
shuffleGameBtn.addEventListener("click", shuffleGameButton);
function shuffleGameButton() {
    // если эта игра будет вызвана во время игры "переводить карточки", показ будет остановлен
    clearInterval(repeatGame__timer);

    // список вопросов
    if (originListOfWords.length == 0) originListOfWords = createListOfQuestion();

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
    clearInterval(repeatGame__timer);

    // список вопросов
    if (!originListOfWords.length) originListOfWords = createListOfQuestion();

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

export {addClickListener};