// import {
//     pauseInput,
//     pauseContainer,
// } from "./../global.js";

// let isChangingPause = false;
// function addPausePopup(text) {
//     const div = document.createElement("div");
//     div.textContent = `${text} s`;
//     div.classList = "pausePopup";
//     pauseContainer.appendChild(div);
//     setTimeout(() => div.remove(), 2000);
// }
// function fetchPause(isHigher) {
//     if (isChangingPause) return;
//     isChangingPause = true;
//     let pauseValue = +pauseInput.value || 2;
//     pauseValue = isHigher ? (Math.ceil(pauseValue * 10 + 1) / 10) : (Math.floor(pauseValue * 10 - 1) / 10);
//     // addPausePopup(pauseValue);
//     return new Promise(
//         resolve => {
//             setTimeout(() => {
//                 resolve(pauseValue);
//                 isChangingPause = false;
//             }, 2000)
//         }
//     )
// }

// export {
//     fetchPause
// };