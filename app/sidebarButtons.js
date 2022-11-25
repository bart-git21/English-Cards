import {shuffle,
        shuffleBtn,
} from "./global.js";

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
            <button class="btn-small">${themeName}</button>
            `
        }
    }

    // ***************** shuffle buttons *****************************
    shuffleButtons() {
        const myBtns = [...document.querySelectorAll(".btn-small")];
        shuffle(myBtns);
        whereButtonsShouldBeCreated.innerHTML = null;
        for(let button of myBtns) {
            whereButtonsShouldBeCreated.innerHTML += button.outerHTML;
        }
    }
}

let newDesk = new wordsSet(themesArray);
function drawButtons() {
    return new Promise(
        res => {
            setTimeout(()=>{res(newDesk.createButtons())}, 100);
        }
    );
}

shuffleBtn.addEventListener("click", () => {newDesk.shuffleButtons()});

export {drawButtons};