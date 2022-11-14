
const QUESTIONS = document.querySelector(".questions"); // one of the questions
const questions_answer = document.querySelector(".questions_answer"); // his answer
let originListOfWords = [];
let arr_for_asking = [];
let english__timer; // таймер

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    };
}

document.querySelector("html").addEventListener("keyup", changePause);
let isChangingPause = false;
async function changePause(event) {
    if (isChangingPause) return;
    const pause = document.querySelector(".wr__pause-btn");
    switch (event.key) {
        case "ArrowUp": pause.value = await fetchPause(true); break;
        case "ArrowDown": pause.value = await fetchPause(false); break;
    }
    isChangingPause = false;
}
function fetchPause(direction) {
    isChangingPause = true;    
    let pauseValue = +pause.value || 2;
    direction ? pauseValue += 0.1 : pauseValue -= 0.1;
    pauseValue = parseInt(pauseValue * 10) / 10;
    addPausePopup(pauseValue);
    return new Promise(
        resolve => {
            setTimeout(()=>{
                resolve(pauseValue)
            },2000)
        }
    )
}
function addPausePopup(text) {
    const div = document.createElement("div");
    div.textContent = text + " s";
    div.classList = "pausePopup";
    document.querySelector(".wr__pause").appendChild(div);
    setTimeout(()=> div.remove(), 2000);
}


// создать исходный массив вопросов
function createListOfQuestion() {
    let textareaArray = document.querySelector(".wr__area").value.split("\n"); // текст стал массивом

    // удалить пустые строки
    for (let i = 0; i<textareaArray.length; i++) {
        if(!textareaArray[i]) textareaArray.splice(i,1);
    }

    // если англ и рус фразы разбиты на абзацы - преобразовать два абзаца в один (англ+рус)
    for (let i = 1; i<textareaArray.length; i++) {
        if(textareaArray[i].search(/[а-яА-Я]/g) == 0 && textareaArray[i-1].search(/[а-яА-Я]/g) == -1) {
            textareaArray[i-1] = textareaArray[i-1].concat(textareaArray[i]);
            textareaArray.splice(i,1);
        }
        else if(textareaArray[i].search(/[a-zA-Z]/g) == 0 && textareaArray[i-1].search(/[a-zA-Z]/g) == -1) {
            textareaArray[i-1] = textareaArray[i-1].concat(textareaArray[i]);
            textareaArray.splice(i,1);
        }

    }

    // преобразовываем каждую строку в массив [рус, англ]
    let newList = [];
    textareaArray.map(
        e => {
            const {russianExpression, engExpression} = getRussianAndEnglishExpressions(e);
            e = [russianExpression, engExpression];
            newList.push(e);
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
    // находим, где русская фраза - и показываем ее
    // а остаток - вниз, в подсказку
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
    engExpression = engExpression.replace(/\s+$/g, "");
    engExpression = engExpression.replace(/[—\.,]/g, "");
    engExpression = engExpression.replace(/(\s-\s)/g, "");
    russianExpression = russianExpression.replace(/[(),\.\d]/g, "");
    return {russianExpression, engExpression};
}


// ============================  Sidebar - кнопки с номерами ===========

// очистить originListOfWords и скрыть выбранную кнопку
const sidebar__info__numberOfList = document.querySelector(".sidebar__info__numberOfList");
function chooseThisList(elem) {
    originListOfWords = [];
    howManyQuestionsIsNow__repeatGame = 0;
    howManyQuestionsIsNow__shuffleGame = 0;
    howManyQuestionsIsNow__writingGame = 0;
    document.querySelector(".questions").classList.remove("green");
    elem.style.display = "none";
    document.querySelector(".txtArea").outerHTML = '<textarea id="myTextarea" class="txtArea wr__area" placeholder="вопросы" rows="5"></textarea>';
    sidebar__info__numberOfList.innerHTML = `this is the list # ${elem.textContent}`;
}

// заполнить textArea
function showQuestions(url) {
    fetch(url)
    .then(response => response.text())
    .then(data => document.querySelector(".txtArea").innerHTML = data)
}

// ============================ кнопка "Очистить" ===============================
const wr__btn_clear = document.querySelector(".wr__btn-clear");
wr__btn_clear.addEventListener("click", clearContext);
function clearContext() {
    originListOfWords = [];
    howManyQuestionsIsNow__repeatGame = 0;
    howManyQuestionsIsNow__shuffleGame = 0;
    howManyQuestionsIsNow__writingGame = 0;
    document.querySelector(".txtArea").value = "";
    document.querySelector(".txtArea").innerHTML = "";
}



// ============================ кнопка "переводить карточки" ===============================

let howManyQuestionsIsNow__repeatGame = 0;
let repeatGame__timer;
const MAX_NUMBERS_OF_WORDS = 11;
document.querySelector(".wr__btn-remember").addEventListener("click", translateGame);
function translateGame() {
    // если показ вопросов будет начат во время предыдщей итерации, предыдущая будет остановлена
    clearInterval(repeatGame__timer);

    // create questions list
    if (originListOfWords.length === 0) {
        QUESTIONS.classList.remove("green");
        originListOfWords = createListOfQuestion();
    }

    // take first N questions
    (howManyQuestionsIsNow__repeatGame === MAX_NUMBERS_OF_WORDS) ? QUESTIONS.classList.add("green") : howManyQuestionsIsNow__repeatGame++;
    arr_for_asking = originListOfWords.slice(0, howManyQuestionsIsNow__repeatGame);
    shuffle(arr_for_asking);
    
    // show first N questions
    let i = 0;
    repeatGame__show();
    const pause = parseFloat(document.querySelector(".wr__pause-btn").value) || 2;
    repeatGame__timer = setInterval(repeatGame__show, pause * 1000);
    function repeatGame__show() {
        if (i == arr_for_asking.length) {
            QUESTIONS.textContent = "well done!";
            questions_answer.textContent = null;
            clearInterval(repeatGame__timer);
        }
        else {
            QUESTIONS.textContent = arr_for_asking[i][0];
            questions_answer.textContent = arr_for_asking[i][1];
        }
        i++;
    }
}
const trashBtn = document.querySelector('.fa-trash-can');
trashBtn.addEventListener("click", deleteQuestion);
function deleteQuestion() {
    QUESTIONS.classList.remove("green");
    let i = 0;
    originListOfWords.forEach(
        (e, index) => {
            if (e[0] === QUESTIONS.textContent) i = index;
        }
    )
    originListOfWords.splice(i, 1);
    howManyQuestionsIsNow__repeatGame--;
    document.querySelector(".wr__btn-remember").focus();
}



// ============================ кнопка "Перемешать слова" ===========

let howManyQuestionsIsNow__shuffleGame = 0;
document.querySelector(".wr__btn-shuffle-words").addEventListener("click", shuffleGameButton);
function shuffleGameButton() {
    // если эта игра будет вызвана во время игры "переводить карточки", показ будет остановлен
    clearInterval(repeatGame__timer);

    // список вопросов
    if (originListOfWords.length == 0) originListOfWords = createListOfQuestion();

    // если закончились вопросы - Well done
    if (howManyQuestionsIsNow__shuffleGame === originListOfWords.length) {
        QUESTIONS.innerHTML = "Well done!";
        questions_answer.innerHTML = null;
        howManyQuestionsIsNow__shuffleGame = 0;
        return;
    }

    // разбиваем вопрос на рус. и англ. части
    let i = howManyQuestionsIsNow__shuffleGame++;
    let russianText = originListOfWords[i][0];
    let englishText = originListOfWords[i][1];
    englishText = englishText.replace(/[^a-zA-Z]$/g, "");

    // рисуем на экране перевод и англиские слова
    QUESTIONS.innerHTML = russianText;
    
    // рисуем на экране англиские слова
    let div = document.createElement("div");
    div.classList.add("parent");
    QUESTIONS.append(div);
    let englishTextArray = englishText.split(" ");
    shuffle(englishTextArray);
    for (let i = 0; i<englishTextArray.length; i++) {
        if (englishTextArray[i].search(/[a-zA-Z0-9]/g) > -1) div.innerHTML += `<button class="shuffleGame__moveIt-btn">${englishTextArray[i]}</button>`;
    }

    // move buttons
    let target;
    document.querySelector(".parent").addEventListener("mousemove", shuffleGame__moveTarget);
    function shuffleGame__moveTarget(event) {
        if (target) {
            if ([...target.classList] == "shuffleGame__moveIt-btn") {
                target.style.position = "absolute";
                target.style.left = `${event.clientX - event.target.getBoundingClientRect().x}px`;
                target.style.top = `${event.clientY - event.target.getBoundingClientRect().y}px`;
            }
        }
    }
    document.querySelector(".parent").addEventListener("mousedown", shuffleGame__findAndDropTarget);
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
    questions_answer.innerHTML = '<button class="shuffleGame__checkResult-btn"></button>';
    const shuffleGame__checkResult_btn = document.querySelector(".shuffleGame__checkResult-btn");
    shuffleGame__checkResult_btn.classList = "shuffleGame__checkResult-btn";
    shuffleGame__checkResult_btn.textContent = "check it";
    shuffleGame__checkResult_btn.addEventListener("click", checkWords);
    function checkWords() {
        let buttons = document.querySelectorAll(".shuffleGame__moveIt-btn");
        let buttonsArray = [];
        for(let i = 0;i<buttons.length; i++) {
            let aa = [a,b]=[parseInt(buttons[i].getBoundingClientRect().x),buttons[i].textContent];
            buttonsArray.push(aa);
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
document.querySelector(".wr__btn-writing").addEventListener("click", writingGame);
function writingGame() {
    // если эта игра будет вызвана во время игры "переводить карточки", показ будет остановлен
    clearInterval(repeatGame__timer);

    // список вопросов
    if (!originListOfWords.length) originListOfWords = createListOfQuestion();

    // если закончились вопросы, Well done
    if (howManyQuestionsIsNow__writingGame === originListOfWords.length) {
        QUESTIONS.innerHTML = "Well done!";
        questions_answer.innerHTML = null;
        howManyQuestionsIsNow__writingGame = 0;
        return;
    }

    // разбиваем вопрос на рус. и англ. части
    let i = howManyQuestionsIsNow__writingGame++;
    let russianText = originListOfWords[i][0];
    let englishText = originListOfWords[i][1];

    // ask a question
    QUESTIONS.innerHTML = englishText;    
    let input_writing = document.createElement("input");
    input_writing.classList.add("wr__pause-btn");
    input_writing.addEventListener("keyup", listenEnter);
    let div = document.createElement("div");
    div.classList.add("parent");
    div.append(input_writing);
    QUESTIONS.append(div);
    input_writing.focus();

    // check result
    function listenEnter(e) {
        if (e.key === "Enter") checkWords();
    }
    function checkWords() {
        if (input_writing.value.toLowerCase() == englishText.toLowerCase()) {
            writingGame();
        }
    }

    // next button function
    questions_answer.innerHTML = `
    <button class="shuffleGame__checkResult-btn nextButton">next</button>
    <span>${russianText}</span>
    `;
    const nextButton = document.querySelector(".nextButton");
    nextButton.addEventListener("click", function() {writingGame()});
}