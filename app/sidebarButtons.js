import {shuffle,
        shuffleBtn,
} from "./global.js";
import {addClickListener} from "./script.js";

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
        whereButtonsShouldBeCreated.innerHTML = null;
        for (let themeName of this.themes) {
            whereButtonsShouldBeCreated.innerHTML += `
            <button class="btn-small">${themeName}</button>
            `
        }
    }

    // ***************** shuffle buttons *****************************
    shuffleButtons() {
        shuffle(themesArray);
        this.createButtons();
        addClickListener();
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