// Variables I'll need
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed = 0;

// Hide overlay when clicked
const start = document.querySelector('.btn_reset');
const overlay = document.getElementById('overlay');

start.addEventListener('click', () => {
    overlay.style.display = 'none';
});

// Array of phrases 
const phrases = [
    'trees have feelings too',
    'you are not worthy of excalibur',
    'christmas is peak capitalism',
    'power is an illusion',
    'mangos are the key to world domination',
    'memories can be altered'
]

// Get a random phrase from the array
function getRandomPhraseAsArray(array) {
    // Get random index number from the length of array
    function randomIndex() {
        return Math.floor(Math.random() * array.length);
    }

    // Create array from randomly selected array
    const randomPhrase = array[randomIndex()];
    const phraseAsArray = randomPhrase.split('');
    return phraseAsArray;
} 

// Add phrase to the display
function addPhraseToDisplay(array) {
    const ul = document.querySelector('ul');
    const randomPhrase = getRandomPhraseAsArray(array);

    // Loop trough array, create a list item for each letter and append to ul
    for (i = 0; i < randomPhrase.length; i++) {
        const newListItem = document.createElement('li');
        newListItem.textContent = randomPhrase[i];
        ul.appendChild(newListItem);

        // Apply a different class to space or letter
        if (randomPhrase[i].textContent === ' ') {
            newListItem.className = "space";
        } else {
            newListItem.className = "letter";
        }
    }
}
addPhraseToDisplay(phrases); 

// Check if a letter is in the phrase
function checkLetter(clickedButton) {
    const letters = document.getElementsByClassName('letter');
    let matchingLetters = null;

    for (i = 0; i < letters.length; i++) {
        if (clickedButton === letters[i].textContent) {
            letters[i].className = 'letter show';
            matchingLetters = clickedButton;
        } 
    }
} 

// Add event listener to buttons
qwerty.addEventListener('click', (event) => {
    // Reads text content of clicked button
    const clickedButton = event.target.textContent; 
    
    if (event.target.tagName === 'BUTTON' && event.target.className !== 'chosen') {
        event.target.className = 'chosen';
        checkLetter(clickedButton);
    } else {
        missed++;
    }
});

