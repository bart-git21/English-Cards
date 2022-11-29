import {
    backToTopBtn,
    html,
    shuffleBtn,
    whereButtonsShouldBeCreated,
} from "./global.js";
import {
    visibleBactToTopButton,
    backToTop
} from "./components/backtotop.js";
import {enterTextareaAndSidebar} from "./script.js";
import { newDesk } from "./sidebarButtons.js";
import { keyboardListener } from "./components/keyboard.js";


newDesk.createButtons();
html.addEventListener("keyup", keyboardListener);
whereButtonsShouldBeCreated.addEventListener("click", enterTextareaAndSidebar);
shuffleBtn.addEventListener("click", () => { newDesk.shuffleButtons() });
document.addEventListener("scroll", visibleBactToTopButton);
backToTopBtn.addEventListener("click", backToTop);
backToTop();