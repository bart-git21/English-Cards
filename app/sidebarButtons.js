
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
        for (let i = 0; i < this.themes.length; i++) {
            whereButtonsShouldBeCreated.innerHTML += `
            <button class="btn-small" onclick="chooseThisList(this); showQuestions('./public/${this.themes[i]}.txt');">${this.themes[i]}</button>
            `
        }
    }

    // ***************** shuffle buttons *****************************

    shuffleButtons() {
        const btns = document.querySelectorAll(".btn-small");
        let myBtns = [...btns];

        for (let i = myBtns.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
          [myBtns[i], myBtns[j]] = [myBtns[j], myBtns[i]];
        };

        whereButtonsShouldBeCreated.innerHTML = null;
        for (let i = 0; i<myBtns.length; i++) {
            whereButtonsShouldBeCreated.innerHTML += myBtns[i].outerHTML;
        }
    }
}

let newDesk = new wordsSet(themesArray);
newDesk.createButtons();