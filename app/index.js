import {visibleBactToTopButton, 
    backToTop
} from "./backtotop.js";
import {newDesk} from "./sidebarButtons.js";
import {addClickListener} from "./script.js";



document.addEventListener("scroll", visibleBactToTopButton);
backToTop();
async function start() {
    await new Promise(
        res => {
            setTimeout(()=>{res(newDesk.createButtons())}, 100);
        }
    );
    addClickListener();
}
start();