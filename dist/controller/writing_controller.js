import { originList } from "../model/origin_model.js";
import { WModel } from "../model/writing_model.js";
import { WView } from "../view/writing_view.js";
class WController {
    model;
    view;
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.bindToInput(this.model.setUserText.bind(this.model));
        this.view.bindToCheck(this.model.check.bind(this.model));
        this.view.bindToStart(this.handleStart);
        this.view.bindToNext(this.model.next.bind(this.model));
        this.model.subscribeToDsiplay(this.view.message.bind(this.view));
    }
    handleStart = () => {
        this.model.list = originList.getShallowList();
        if (!this.model.list.length) {
            this.view.message("The list is empty!");
            return;
        }
        this.model.start();
    };
    handleAddKeyListener = () => {
        this.view.subscribeToKeyup(this.model.prev, this.model.next);
    };
    handleRemoveKeyListener = () => {
        this.view.removeKeyListener();
    };
    handleChangedList() {
        this.model.clear();
        this.view.message("The sentences are changed. Click to start!");
    }
}
function writingGame() {
    return new WController(new WModel(originList.getShallowList()), new WView());
}
const appWriting = writingGame();
export { appWriting };
//# sourceMappingURL=writing_controller.js.map