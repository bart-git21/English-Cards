
const whereButtonsShouldBeCreated = document.querySelector(".english__buttons");
const themesArray = [
    "words",
    "two words",
    "it phrases",
    "cv",
    "phrases",
    "the Cat",
]

class wordsSet {
    constructor(array) {
        this.themes = array;
    }

    // ***************** create buttons ******************************
    createButtons = () => {
        for (let themeName of this.themes) {
            whereButtonsShouldBeCreated.innerHTML += `
            <button class="btn-small" onclick="chooseThisList(this); showQuestions('./public/${themeName}.txt');">${themeName}</button>
            `
        }
    }

    // ***************** shuffle buttons *****************************

    shuffleButtons() {
        const myBtns = [...document.querySelectorAll(".btn-small")];

        for (let i = myBtns.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
          [myBtns[i], myBtns[j]] = [myBtns[j], myBtns[i]];
        };

        whereButtonsShouldBeCreated.innerHTML = null;
        for(let button of myBtns) {
            whereButtonsShouldBeCreated.innerHTML += button.outerHTML;
        }
    }
}

let newDesk = new wordsSet(themesArray);
newDesk.createButtons();