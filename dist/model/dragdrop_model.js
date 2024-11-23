import { shuffle } from "../global.js";
class DModel {
    list;
    counter;
    text;
    play;
    ondisplay;
    constructor(array = []) {
        this.list = array;
        this.counter = 0;
        this.text = "";
        this.play = () => { };
        this.ondisplay = () => { };
    }
    start() {
        this.play();
    }
    prev() {
        if (!this.list.length) {
            this.ondisplay("Start the game first!");
            return;
        }
        this.counter--;
        this.play();
    }
    next() {
        if (!this.list.length) {
            this.ondisplay("Start the game first!");
        }
        this.counter++;
        this.play();
    }
    check(userString, callback) {
        if (this.text === userString) {
            this.counter += 1;
            this.play();
        }
        else {
            callback(`No, try again!`);
        }
    }
    subscribeToMessage(callback) {
        this.ondisplay = callback;
    }
    subscribeToInsert(callback) {
        this.play = () => {
            if (this.counter >= this.list.length) {
                this.ondisplay("Finish!");
                return;
            }
            this.ondisplay(this.list[this.counter][0]);
            this.text = this.list[this.counter][1]
                .toLowerCase()
                .replace(/[^a-zA-Z]$/g, "");
            let words = this.text.split(" ");
            shuffle(words);
            for (let word of words) {
                if (word.search(/[a-zA-Z0-9]/g) > -1)
                    callback(word);
            }
        };
    }
}
export { DModel };
//# sourceMappingURL=dragdrop_model.js.map