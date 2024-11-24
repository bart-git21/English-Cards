function shuffle(arr: string[] | string[][]) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

const backToTopBtn: HTMLButtonElement | null =
  document.querySelector(".scroll-to-top__btn");
const tabs: NodeListOf<HTMLElement> = document.querySelectorAll(".nav-link");
const translationTab: HTMLButtonElement | null =
  document.querySelector("#translation-tab");
const dragdropTab: HTMLButtonElement | null =
  document.querySelector("#dragdrop-tab");
const writingTab: HTMLButtonElement | null =
  document.querySelector("#writing-tab");

export { shuffle, backToTopBtn, tabs, translationTab, dragdropTab, writingTab };
