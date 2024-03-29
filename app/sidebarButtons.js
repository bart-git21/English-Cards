import {shuffle,
        whereButtonsShouldBeCreated,
} from "./global.js";

const themesArray = [
    "words",
    "two words",
    "it phrases",
    "cv",
    "phrases",
    "the Cat",
]

class buttonsSet {
    constructor(array) {
        this.themes = array;
    }

    // ***************** create buttons ******************************
    createButtons = () => {
        whereButtonsShouldBeCreated.innerHTML = null;
        for (let name of this.themes) {
            const btn = document.createElement("button");
            btn.classList = "btn-small";
            btn.textContent = name;
            whereButtonsShouldBeCreated.appendChild(btn);
        }
    }

    // ***************** shuffle buttons *****************************
    shuffleButtons() {
        shuffle(themesArray);
        this.createButtons();
    }
}
const newDesk = new buttonsSet(themesArray);

export {
    newDesk,
};