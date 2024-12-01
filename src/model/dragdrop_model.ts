import { shuffle } from "../global.js";

class DModel {
  list: string[][];
  counter: number;
  text: string;
  play: () => void;
  ondisplay: (arg: string) => void;

  constructor(array: string[][] = []) {
    this.list = array;
    this.counter = 0;
    this.text = "";
    this.play = () => {};
    this.ondisplay = () => {};
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
  check(userString: string, callback: (arg: string) => void) {
    if (this.text === userString) {
      this.counter += 1;
      this.play();
    } else {
      callback(`No, try again!`);
    }
  }
  clear() {
    this.list = [];
    this.counter = 0;
  }
  subscribeToMessage(callback: (arg: string) => void) {
    this.ondisplay = callback;
  }
  subscribeToInsert(callback: (arg: string) => void) {
    this.play = () => {
      if (!this.list.length) {
        this.ondisplay("The list is empty!");
        return;
      }
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
        if (word.search(/[a-zA-Z0-9]/g) > -1) callback(word);
      }
    };
  }
}

export { DModel };
