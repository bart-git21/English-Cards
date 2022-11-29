import {visibleBactToTopButton, 
    backToTop
} from "./backtotop.js";
import {newDesk} from "./sidebarButtons.js";



document.addEventListener("scroll", visibleBactToTopButton);
backToTop();
function start() {
    newDesk.createButtons();
}
start();