
const whereButtonsShouldBeCreated = document.querySelector(".english__buttons");

class deskWithButtons {
    constructor(howManyButtonsAreThere) {
        this.howManyButtonsAreThere = howManyButtonsAreThere;
    }

    // ***************** create buttons ******************************
   
    createButtons = () => {
        for (let i = 1; i<=this.howManyButtonsAreThere; i++) {
            whereButtonsShouldBeCreated.innerHTML += `
            <button class="btn-small" onclick="chooseThisList(this); showQuestions('./public/list${i}.txt');">${i}</button>
            `
        }
    }

    // ***************** shuffle buttons *****************************

    shuffleButtons() {
        const btns = document.querySelectorAll(".btn-small");
        let myBtns = [...btns];

        for (let i = myBtns.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
          [myBtns[i], myBtns[j]] = [myBtns[j], myBtns[i]];
        };

        whereButtonsShouldBeCreated.innerHTML = null;
        for (let i = 0; i<myBtns.length; i++) {
            whereButtonsShouldBeCreated.innerHTML += myBtns[i].outerHTML;
        }
    }
}

let newDesk = new deskWithButtons(18);
newDesk.createButtons();