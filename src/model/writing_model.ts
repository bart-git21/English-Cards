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

  start(): void {
    this.play();
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
  }
  play(): void {
    if (this.counter >= this.list.length) {
      this.display("Click to Start");
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
  clear() {
    this.list = [];
    this.counter = 0;
  }
}

export { WModel };
