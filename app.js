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
    'mangos are the key to world domination'
];

// Get a random phrase from the array
function getRandomPhraseAsArray(array) {
    // Get random index number from 0 - 4
    function randomIndex() {
        return Math.floor(Math.random() * 5);
    }

    // Create array from randomly selected array
    const randomPhrase = array[randomIndex()];
    const phraseAsArray = randomPhrase.split('');
    return phraseAsArray;
} 

console.log(getRandomPhraseAsArray(phrases));