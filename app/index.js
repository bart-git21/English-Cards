import {visibleBactToTopButton, 
    backToTop
} from "./backtotop.js";
import {addClickListener} from "./script.js";



document.addEventListener("scroll", visibleBactToTopButton);
backToTop();
addClickListener();