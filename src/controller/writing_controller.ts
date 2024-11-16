import { originList } from "../model/expressionsModel.js";
import { WModel } from "../model/writing_model.js";
import { WView } from "../view/writing_view.js";

class WController {
  model: WModel;
  view: WView;
  constructor(model: WModel, view: WView) {
    this.model = model;
    this.view = view;

    this.view.bindToInput(this.model.setUserText.bind(this.model));
    this.view.bindToCheck(this.model.check.bind(this.model));
    this.view.bindToStart(this.handleStart);
    this.view.bindToNext(this.model.next.bind(this.model));
    this.model.subscribeToDsiplay(this.view.displayQuestion.bind(this.view));
  }
  handleStart = (): void => {
    this.model.list = originList.getShallowList();
    this.model.start(this.view.failStart.bind(this.view));
  };

  handleAddKeyListener = (): void => {
    this.view.subscribeToKeyup(this.model.prev, this.model.next);
  };
  handleRemoveKeyListener = (): void => {
    this.view.removeKeyListener();
  };
}

function writingGame() {
  return new WController(new WModel(originList.getShallowList()), new WView());
}
const appWriting = writingGame();

export { appWriting };
