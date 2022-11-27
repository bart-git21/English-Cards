function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    };
}

// buttons
const rememberGameBtn = document.querySelector(".wr__btn-remember");
const shuffleGameBtn = document.querySelector(".wr__btn-shuffle-words");
const writingGameBtn = document.querySelector(".wr__btn-writing");
const shuffleBtn = document.querySelector(".english__shuffle");
const trashBtn = document.querySelector('.fa-trash-can');

// inputs 
const pauseInput = document.querySelector(".wr__pause-btn");
const textArea = document.querySelector(".txtArea");

// areas, containers and etc
const html = document.querySelector("html");
const pauseContainer = document.querySelector(".wr__pause");
const questionContainer = document.querySelector(".questions");
const answerContainer = document.querySelector(".questions_answer");
const infoContainer = document.querySelector(".sidebar__info__numberOfList");
const whereButtonsShouldBeCreated = document.querySelector(".english__buttons");


export {
    shuffle,
    rememberGameBtn,
    shuffleGameBtn,
    shuffleBtn,
    trashBtn,
    html,
    pauseInput,
    pauseContainer,
    questionContainer,
    answerContainer,
    infoContainer,
    textArea,
    writingGameBtn,
    whereButtonsShouldBeCreated,
};