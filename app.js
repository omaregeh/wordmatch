let words = [
    { english: "cat", french: "chat" },
    { english: "dog", french: "chien" },
    { english: "bird", french: "oiseau" },
    { english: "horse", french: "cheval" },
    { english: "fish", french: "poisson" },
    { english: "mouse", french: "souris" },
    { english: "to eat", french: "manger" },
    { english: "to drink", french: "boire" },
    { english: "to sleep", french: "dormir" },
    { english: "to run", french: "courir" },
    // More words can be added here
];

let matchedPairs = 0;
let timer = 60;
let timerInterval;
let canAddTime = { ten: true, twenty: true };

// Store the selected words to match
let selectedEnglish = null;
let selectedFrench = null;

// Shuffle the word pairs at the start
window.onload = () => {
    startGame();
    startTimer();
};

function startGame() {
    const frenchColumn = document.getElementById('french-words');
    const englishColumn = document.getElementById('english-words');

    const shuffledWords = shuffle([...words]);  // Shuffle words

    // Display four pairs initially
    for (let i = 0; i < 4; i++) {
        createWordElement(shuffledWords[i], frenchColumn, 'french');
        createWordElement(shuffledWords[i], englishColumn, 'english');
    }
}

function createWordElement(word, container, language) {
    const div = document.createElement('div');
    div.classList.add('grid-item');
    div.innerText = language === 'french' ? word.french : word.english;
    div.dataset.language = language;
    div.dataset.word = language === 'french' ? word.french : word.english;
    div.dataset.match = language === 'french' ? word.english : word.french;

    div.addEventListener('click', () => selectWord(div));
    container.appendChild(div);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function selectWord(div) {
    if (div.dataset.language === 'english') {
        selectedEnglish = div;
    } else {
        selectedFrench = div;
    }

    if (selectedEnglish && selectedFrench) {
        if (selectedEnglish.dataset.word === selectedFrench.dataset.match) {
            // Matched
            selectedEnglish.classList.add('matched');
            selectedFrench.classList.add('matched');
            selectedEnglish = null;
            selectedFrench = null;
            matchedPairs++;

            // Replace the matched words with new ones from the list
            replaceMatchedWords();
        } else {
            // Reset if no match
            selectedEnglish = null;
            selectedFrench = null;
        }
    }
}

function replaceMatchedWords() {
    const frenchColumn = document.getElementById('french-words');
    const englishColumn = document.getElementById('english-words');

    const shuffledWords = shuffle([...words]);

    // Replace the words in different spots
    const newFrench = shuffledWords.pop();
    const newEnglish = shuffledWords.pop();

    // Find the first hidden item in each column and replace it
    const hiddenFrench = frenchColumn.querySelector('.matched');
    const hiddenEnglish = englishColumn.querySelector('.matched');

    if (hiddenFrench && hiddenEnglish) {
        hiddenFrench.classList.remove('matched');
        hiddenFrench.innerText = newFrench.french;
        hiddenFrench.dataset.word = newFrench.french;
        hiddenFrench.dataset.match = newFrench.english;

        hiddenEnglish.classList.remove('matched');
        hiddenEnglish.innerText = newEnglish.english;
        hiddenEnglish.dataset.word = newEnglish.english;
        hiddenEnglish.dataset.match = newEnglish.french;
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        timer--;
        document.getElementById('timer').innerText = timer;
        if (timer === 0) {
            clearInterval(timerInterval);
            alert("Time's up!");
        }
    }, 1000);
}

function addTime(seconds) {
    if (seconds === 10 && canAddTime.ten) {
        timer += 10;
        canAddTime.ten = false;
    } else if (seconds === 20 && canAddTime.twenty) {
        timer += 20;
        canAddTime.twenty = false;
    }
    document.getElementById('timer').innerText = timer;
}
