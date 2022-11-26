import {shuffle,
        shuffleBtn,
        whereButtonsShouldBeCreated,
} from "./global.js";
import {addClickListener} from "./script.js";

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
const newDesk = new wordsSet(themesArray);
shuffleBtn.addEventListener("click", () => {newDesk.shuffleButtons()});

export {newDesk,
};