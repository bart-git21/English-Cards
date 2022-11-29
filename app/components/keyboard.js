import {
    pauseInput,
} from "./../global.js";

import {
    fetchPause
} from "./pause.js";

import {
    translate_prevPhrase,
    translate_nextPhrase
} from "./../script.js";


async function keyboardListener(event) {
    switch (event.key) {
        case "ArrowUp": pauseInput.value = await fetchPause(true); break;
        case "ArrowDown": pauseInput.value = await fetchPause(false); break;
        case "ArrowLeft": translate_prevPhrase(); break;
        case "ArrowRight": translate_nextPhrase(); break;
    }
}


export { keyboardListener };