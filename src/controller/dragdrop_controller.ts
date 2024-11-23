import { originList } from "../model/origin_model.js";
import { DModel } from "../model/dragdrop_model.js";
import { DView } from "../view/dragdrop_view.js";

class DController {
  model: DModel;
  view: DView;

  constructor(model: DModel, view: DView) {
    this.model = model;
    this.view = view;

    this.view.subscribeToKeyup(
      this.model.prev.bind(this.model),
      this.model.next.bind(this.model),
      this.model.start.bind(this.model)
    );
    this.view.onBlur();
    this.view.onClick();
    this.view.start(this.handleStart.bind(this));
    this.view.check(this.model.check.bind(this.model));
    // this.view.check(this.handleCheck.bind(this));
    this.view.mousedown();

    this.model.subscribeToMessage(this.view.message.bind(this.view));
    this.model.subscribeToInsert(this.view.insertWord.bind(this.view));
  }

  handleStart() {
    this.model.list = originList.getShallowList();
    this.model.start();
  }
  handleAddKeyListener(): void {
    this.view.addKeyListener();
  }
  handleRemoveKeyListener(): void {
    this.view.removeKeyListener();
  }
}

const appDragdrop = new DController(
  new DModel(originList.getShallowList()),
  new DView()
);

export { appDragdrop };
