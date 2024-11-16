class WModel {
  list: string[][];
  counter: number;
  text: string;
  userText: string;
  display: (arg: string) => void;

  constructor(array: string[][] = []) {
    this.list = JSON.parse(JSON.stringify(array)) || [];
    this.counter = 0;
    this.text = "";
    this.userText = "";
    this.display = () => {};
  }

  start(handler: () => void): void {
    this.list.length ? this.play() : handler();
  }
  prev(): void {
    this.counter > 0 && this.counter--;
    this.play();
  }
  next(): void {
    this.counter++;
    this.play();
  }
  check(): void {
    console.log(this.text);
    this.userText === this.text && this.next();
    // return this.userText.localeCompare(this.text) === 0;
  }
  play(): void {
    if (this.counter >= this.list.length) {
      this.display("You are finish!");
      this.counter = 0;
      return;
    }
    this.text = this.list[this.counter][1].toLowerCase();
    this.display(this.list[this.counter][0]);
  }
  subscribeToDsiplay(callback: (arg: string) => void) {
    this.display = callback;
  }
  setUserText(string: string): void {
    this.userText = string;
  }
}

export { WModel };
