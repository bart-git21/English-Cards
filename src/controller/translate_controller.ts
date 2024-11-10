import { originList } from "../model/expressionsModel.js";
import { TView } from "../view/translate_view.js";
import { TModel } from "../model/translate_model.js";

class TController {
  model: TModel;
  view: TView;
  constructor(model: TModel, view: TView) {
    this.model = model;
    this.view = view;

    this.model.subscribeToDisplaySentence((q: string, a: string) =>
      this.view.sentence(q, a)
    );
    this.model.subscribeToDisplayResult((number: number) =>
      this.view.result(number)
    );
    this.model.subscribeToDisplayProgress(
      this.view.updateProgress.bind(this.view)
    );

    this.handleKeyListener();
    this.view.onBlurTextarea();
    this.view.onClickTextarea();
    this.view.bindToDelay(this.model.updateDelay.bind(this.model));
    this.view.bindToStart(this.handleStart);
    this.view.bindToNextLevel(this.model.nextLevel.bind(this.model));
    this.view.bindToStop(this.model.stop.bind(this.model));
  }

  handleStart = async (): Promise<void> => {
    this.model.motherList = getOrigin();
    this.model.trainingList = [];
    await this.model.start(
      this.view.failOriginList.bind(this.view),
      this.view.getDelay.bind(this.view)
    );
  };
  handleKeyListener() {
    this.view.subscribeToKeyup(
      this.model.updateDelay.bind(this.model),
      this.model.prev.bind(this.model),
      this.model.next.bind(this.model),
      this.model.delete.bind(this.model),
      this.handleStart
    );
  }
  stop() {
    this.view.stop();
    this.model.stop();
  }
}

function translateGame() {
  return new TController(new TModel(getOrigin()), new TView());
}
function getOrigin() {
  originList.create();
  originList.shuffled();
  return originList.list;
}
const appTranslate = translateGame();

export { appTranslate };
