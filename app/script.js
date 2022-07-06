
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


// создать исходный массив вопросов
function createListOfQuestion() {
    originListOfWords = document.querySelector(".wr__area").value.split("\n"); // текст стал массивом

    // удалить пустые строки
    for (let i = 0; i<originListOfWords.length; i++) {
        if(!originListOfWords[i]) originListOfWords.splice(i,1);
    }

    // если англ и рус фразы разбиты на абзацы - преобразовать два абзаца в один (англ+рус)
    for (let i = 1; i<originListOfWords.length; i++) {
        if(originListOfWords[i].search(/[а-яА-Я]/g) == 0 && originListOfWords[i-1].search(/[а-яА-Я]/g) == -1) {
            originListOfWords[i-1] = originListOfWords[i-1].concat(originListOfWords[i]);
            originListOfWords.splice(i,1);
        }
        else if(originListOfWords[i].search(/[a-zA-Z]/g) == 0 && originListOfWords[i-1].search(/[a-zA-Z]/g) == -1) {
            originListOfWords[i-1] = originListOfWords[i-1].concat(originListOfWords[i]);
            originListOfWords.splice(i,1);
        }

    }
    
    shuffle(originListOfWords);
}


// ============================  Sidebar - кнопки с номерами ===========

// очистить originListOfWords и скрыть выбранную кнопку
const sidebar__info__numberOfList = document.querySelector(".sidebar__info__numberOfList");
function chooseThisList(elem) {
    originListOfWords = [];
    howManyQuestionsIsNow__repeatGame = 0;
    howManyQuestionsIsNow__shuffleGame = 0;
    document.querySelector(".questions").classList.remove("green");
    elem.style.display = "none";
    document.querySelector(".txtArea").outerHTML = '<textarea id="myTextarea" class="txtArea wr__area" placeholder="вопросы" rows="5"></textarea>';
    sidebar__info__numberOfList.innerHTML = `this is the list # ${elem.textContent}`;
}

// заполнить textArea
function showQuestions(url) {
    fetch(url)
    .then(response => {
        return response.text();
    })
    .then(data => {
        document.querySelector(".txtArea").innerHTML = data;
    })
}

// ============================ кнопка "Очстить" ===============================
const wr__btn_clear = document.querySelector(".wr__btn-clear");
wr__btn_clear.addEventListener("click", clearContext);
function clearContext() {
    originListOfWords = [];
    howManyQuestionsIsNow__repeatGame = 0;
    howManyQuestionsIsNow__shuffleGame = 0;
    document.querySelector(".txtArea").value = "";
    document.querySelector(".txtArea").innerHTML = "";
}

// ============================ кнопка "Повторять" ===============================

let howManyQuestionsIsNow__repeatGame = 0;
let repeatGame__timer;
document.querySelector(".wr__btn-remember").addEventListener("click", rememberButton);
function rememberButton() {
    // если показ вопросов будет начат во время предыдщей итерации, предыдущая будет остановлена
    clearInterval(repeatGame__timer);

    // create questions list
    if (originListOfWords.length === 0) createListOfQuestion();

    // take first N questions
    (howManyQuestionsIsNow__repeatGame === originListOfWords.length) ? document.querySelector(".questions").classList.add("green") : howManyQuestionsIsNow__repeatGame++;
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
            // находим, где русская фраза - и показываем ее
            // а остаток - вниз, в подсказку
            if (arr_for_asking[i].search(/[а-яА-Я]/g) > arr_for_asking[i].search(/[a-zA-Z]/g)) {
                QUESTIONS.textContent = arr_for_asking[i].slice(arr_for_asking[i].search(/[а-яА-Я]/g));
                questions_answer.textContent = arr_for_asking[i].slice(0,arr_for_asking[i].search(/[а-яА-Я]/g));
            }
            else {
                questions_answer.textContent = arr_for_asking[i].slice(arr_for_asking[i].search(/[a-zA-Z]/g));
                QUESTIONS.textContent = arr_for_asking[i].slice(0,arr_for_asking[i].search(/[a-zA-Z]/g));
            }
        }
        i++;
    }
}



// ============================ кнопка "Перемешать слова" ===========

let howManyQuestionsIsNow__shuffleGame = 0;
document.querySelector(".wr__btn-shuffle-words").addEventListener("click", shuffleGameButton);
function shuffleGameButton() {
    // если игра "Перемешать слова" будет вызвана во время показа вопросов из кнопки "повторить", показ будет остановлен
    clearInterval(repeatGame__timer);

    // список вопросов
    if (originListOfWords.length == 0) createListOfQuestion();

    // если закончились вопросы - Well done
    if (howManyQuestionsIsNow__shuffleGame === originListOfWords.length) {
        QUESTIONS.innerHTML = "Well done!";
        questions_answer.innerHTML = null;
        howManyQuestionsIsNow__shuffleGame = 0;
        return;
    }

    // разбиваем вопрос на рус. и англ. части
    let i = howManyQuestionsIsNow__shuffleGame++;
    let russianText = "";
    let englishText = "";
    if (originListOfWords[i].search(/[а-яА-Я]/g) > originListOfWords[i].search(/[a-zA-Z]/g)) {
        russianText = originListOfWords[i].slice(originListOfWords[i].search(/[а-яА-Я]/g));
        englishText = originListOfWords[i].slice(0,originListOfWords[i].search(/[а-яА-Я]/g));
    }
    else {
        englishText = originListOfWords[i].slice(originListOfWords[i].search(/[a-zA-Z]/g));
        russianText = originListOfWords[i].slice(0,originListOfWords[i].search(/[a-zA-Z]/g));
    }

    // рисуем на экране перевод и англиские слова
    QUESTIONS.innerHTML = russianText;
    
    // рисуем на экране англиские слова
    let div = document.createElement("div");
    div.classList.add("parent");
    QUESTIONS.append(div);
    englishText = englishText.split(" "); // текст стал массивом
    let englishTextWithoutTrash = [];
    for (let i = 0; i<englishText.length; i++) {
        if (englishText[i].search(/[a-zA-Z0-9]/g) > -1) englishTextWithoutTrash.push(englishText[i]);
    }
    englishText = [...englishTextWithoutTrash];
    shuffle(englishText);
    for (let i = 0; i<englishText.length; i++) {
        if (englishText[i].search(/[a-zA-Z0-9]/g) > -1) div.innerHTML += `<button class="shuffleGame__moveIt-btn">${englishText[i]}</button>`;
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
        let string = [];
        for (let i =0; i<buttonsArray.length; i++) {
            string.push(buttonsArray[i][1]);
        }
        
        shuffleGame__checkResult_btn.removeEventListener("click", checkWords);

        if (englishTextWithoutTrash.join(" ") == string.join(" ")) {
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