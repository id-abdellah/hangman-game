import { wordList, letters } from "./wordsList.js";

/*
    wind and lose modal
*/

const win = document.querySelector(".win-modal");
const lose = document.querySelector(".lose-modal");
const reset = document.querySelectorAll(".restartTheGame");

/* ----------------- */

let chances = 0;
let chosenIndex = Math.floor(Math.random() * (wordList.length + 1));
let chosenOne = {
    word: wordList[chosenIndex].word,
    hint: wordList[chosenIndex].hint
};

const keyboard = document.querySelector(".keyboard");
for (let i = 0; i < letters.length; i++) {
    let currentLetter = letters[i];
    keyboard.innerHTML += `
        <span class="key-letter" data-letter="${currentLetter.toLowerCase()}">
            ${currentLetter}
        </span>
    `;
}

const hangmanPeacies = document.querySelectorAll(".man");
const inp = document.querySelector(".inp");
const hint = document.querySelector(".hint");


for (let i = 0; i < chosenOne.word.length; i++) {
    let word = chosenOne.word;
    inp.innerHTML += `
        <span style='width: calc(100% / ${word.length}); color: transparent;'>${word[i]}</span>
    `;
}

hint.innerHTML = chosenOne.hint;


const keyLetters = document.querySelectorAll(".key-letter");
keyLetters.forEach(key => {
    key.addEventListener("click", (e) => {
        if (chances == 6) return;
        key.style.backgroundColor = "#cccccc";
        if (chosenOne.word.includes(key.dataset.letter)) {
            inp.querySelectorAll("span").forEach(span => {
                if (span.innerText.toLowerCase() == key.dataset.letter) {
                    span.style.color = "black";
                }
            })

            if ([...inp.querySelectorAll("span")].every(a => {
                return a.style.color == "black"
            })) {
                win.querySelector(".msg span").textContent = chosenOne.word;
                win.style.display = "block";
            }
        } else {
            document.querySelectorAll(".man")[chances].style.display = "block";
            chances++;
            if (chances == 6) {
                lose.querySelector(".msg span").textContent = chosenOne.word;
                lose.style.display = "block";
            }
        }
    }, { once: true })
})


reset.forEach(btn => {
    btn.onclick = () => {
        location.reload()
    };
})