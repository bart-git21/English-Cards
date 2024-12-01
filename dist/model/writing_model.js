class WModel {
    list;
    counter;
    text;
    userText;
    display;
    constructor(array = []) {
        this.list = JSON.parse(JSON.stringify(array)) || [];
        this.counter = 0;
        this.text = "";
        this.userText = "";
        this.display = () => { };
    }
    start() {
        this.play();
    }
    prev() {
        this.counter > 0 && this.counter--;
        this.play();
    }
    next() {
        this.counter++;
        this.play();
    }
    check() {
        console.log(this.text);
        this.userText === this.text && this.next();
    }
    play() {
        if (this.counter >= this.list.length) {
            this.display("Click to Start");
            this.counter = 0;
            return;
        }
        this.text = this.list[this.counter][1].toLowerCase();
        this.display(this.list[this.counter][0]);
    }
    subscribeToDsiplay(callback) {
        this.display = callback;
    }
    setUserText(string) {
        this.userText = string;
    }
    clear() {
        this.list = [];
        this.counter = 0;
    }
}
export { WModel };
//# sourceMappingURL=writing_model.js.map