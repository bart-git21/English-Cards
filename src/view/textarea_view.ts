import { appTranslate } from "../controller/translate_controller.js";
import { appDragdrop } from "../controller/dragdrop_controller.js";
import { appWriting } from "../controller/writing_controller.js";

class TextareaView {
  textArea: HTMLTextAreaElement;

  constructor() {
    this.textArea = document.querySelector("#textarea") as HTMLTextAreaElement;
  }
  onInput() {
    this.textArea.addEventListener("input", () => {
      appTranslate.handleChangedList();
      appDragdrop.handleChangedList();
      appWriting.handleChangedList();
    });
  }
  onClick() {
    this.textArea.addEventListener("click", () => {
      appTranslate.stop();
      appDragdrop.handleRemoveKeyListener();
      appWriting.handleRemoveKeyListener();
    });
  }
}

const appTextarea = new TextareaView();
export { appTextarea };
