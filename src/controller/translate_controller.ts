import { originList } from "../model/origin_model.js";
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
    this.view.onClickTextarea(this.model.stop.bind(this.model));
    this.view.onInputTextarea(this.model.clear.bind(this.model));
    this.view.bindToDelay(this.model.updateDelay.bind(this.model));
    this.view.bindToStart(this.handleStart);
    this.view.bindToNextLevel(this.model.play.bind(this.model));
    this.view.bindToStop(this.model.stop.bind(this.model));
  }

  handleStart = async (): Promise<void> => {
    this.model.motherList = originList.getShallowList();
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
  return new TController(new TModel(originList.getShallowList()), new TView());
}

const appTranslate = translateGame();

export { appTranslate };
