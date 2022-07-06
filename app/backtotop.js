document.querySelector(".backToTop__btn").addEventListener("click", backToTop);

document.onscroll = function visibleBactToTopButton() {
    if (document.documentElement.scrollTop > 20) document.querySelector(".backToTop__btn").style.display = "inline";
    else document.querySelector(".backToTop__btn").style.display = "none";
}

function backToTop() {
    let backToTopTimer = setInterval(function() {
        if (document.documentElement.scrollTop) document.documentElement.scrollTop *= 0.97;
        else clearInterval(backToTopTimer);
    }, 5);
    
}