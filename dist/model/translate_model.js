import { shuffle } from "../global.js";
class TModel {
    motherList;
    trainingList;
    counter;
    timerId;
    ms;
    amount;
    progress;
    isPlay;
    isChangingDelay;
    displaySentence;
    displayResult;
    updateProgress;
    constructor(array = []) {
        this.motherList = JSON.parse(JSON.stringify(array)) || [];
        this.trainingList = [];
        this.counter = 0;
        this.timerId = 0;
        this.ms = 5;
        this.amount = this.motherList.length;
        this.progress = 0;
        this.isPlay = false;
        this.isChangingDelay = false;
        this.displaySentence = function () { };
        this.displayResult = function () { };
        this.updateProgress = function () { };
    }
    prev() {
        if (!this.isPlay || !this.trainingList.length)
            return;
        this.stop();
        this.counter > 0 && (this.counter -= 1);
        this.play();
    }
    next() {
        this.stop();
        if (this.counter < this.trainingList.length) {
            this.counter++;
            this.play();
        }
        else {
            this.nextLevel();
        }
    }
    delete() {
        if (!this.isPlay || !this.trainingList.length)
            return;
        this.stop();
        this.trainingList.splice(this.counter, 1);
        this.updateProgress();
        this.play();
    }
    updateDelay(value = 0) {
        if (this.isChangingDelay)
            return false;
        this.isChangingDelay = true;
        this.ms = value;
        setTimeout(() => {
            this.isChangingDelay = false;
        }, 2000);
        return true;
    }
    clear() {
        this.motherList = this.trainingList = [];
    }
    async start(delayCallback) {
        try {
            this.updateDelay(delayCallback());
            await this.nextLevel();
        }
        catch (err) {
            if (err instanceof Error)
                console.error(err.message);
        }
    }
    async nextLevel() {
        try {
            this.stop();
            if (this.motherList.length && this.trainingList.length < 11) {
                this.trainingList.push(this.motherList.pop());
            }
            this.trainingList.length > 1 && shuffle(this.trainingList);
            this.counter = 0;
            await this.play();
        }
        catch (err) {
            if (err instanceof Error)
                console.error(err.message);
        }
    }
    stop() {
        clearTimeout(this.timerId);
        this.isPlay = false;
    }
    async play() {
        try {
            if (!this.motherList.length && !this.trainingList.length) {
                this.displayResult(-1);
                return;
            }
            this.isPlay = true;
            while (this.counter < this.trainingList.length) {
                this.displaySentence(this.trainingList[this.counter][0], this.trainingList[this.counter][1]);
                await new Promise((resolve) => {
                    this.timerId = setTimeout(() => {
                        this.counter += 1;
                        resolve();
                    }, this.ms * 1000);
                });
            }
            this.progress =
                this.amount - this.motherList.length - this.trainingList.length;
            this.displayResult(this.progress);
            this.isPlay = false;
        }
        catch (err) {
            console.log(err);
        }
    }
    subscribeToDisplaySentence(callback) {
        this.displaySentence = callback;
    }
    subscribeToDisplayResult(callback) {
        this.displayResult = callback;
    }
    subscribeToDisplayProgress(callback) {
        this.updateProgress = () => {
            if (!this.motherList.length && !this.trainingList.length) {
                this.progress = 0;
                callback(this.progress, this.amount);
                return;
            }
            this.progress =
                this.amount - this.motherList.length - this.trainingList.length;
            callback(this.progress, this.amount);
        };
    }
}
export { TModel };
//# sourceMappingURL=translate_model.js.map