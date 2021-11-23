// Variables I'll need
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const lifes = document.getElementsByClassName('tries');
const lostLifes = document.getElementsByClassName('lost');
let missed = 0;
let resetGame = 0;

// Hide overlay when clicked
const start = document.querySelector('.btn_reset');
const overlay = document.getElementById('overlay');
const title = document.querySelector('.title');

start.addEventListener('click', () => {
    if (resetGame === 1) {
        reset();
    } else {
        overlay.style.display = 'none';
    }
});

// Array of phrases 
const phrases = [
    'trees have feelings too',
    'nobody is worthy of excalibur',
    'christmas is peak capitalism',
    'power is an illusion',
    'mangos are great friends',
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
        if (randomPhrase[i].includes(' ')) {
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
    let matchingLetter = null;

    for (i = 0; i < letters.length; i++) {
        if (clickedButton === letters[i].textContent) {
            letters[i].className = 'letter show';
            matchingLetter = clickedButton;
        } 
    }
    return matchingLetter;
} 

// Add event listener to buttons
qwerty.addEventListener('click', (event) => {
    // Reads text content of clicked button
    const clickedButton = event.target.textContent; 
    
    // If the target is a button and does not have chosen as class, run function
    if (event.target.tagName === 'BUTTON' && event.target.className !== 'chosen') {
        event.target.className = 'chosen';
        const letterChecker = checkLetter(clickedButton);
        
        // If function returns null, remove heart and increment missed
        if (letterChecker === null) {
            missed++;
            lifes[0].firstElementChild.setAttribute('src', 'images/lostHeart.png');
            lifes[0].className = 'lost';
            lost();
        } else { 
            won();
        }  
    }
});

// Shows winning screen and gives value for a reset
function won() {
    let phraseLetters = document.getElementsByClassName('letter');
    let showed = document.getElementsByClassName('show');
    
    if (phraseLetters.length === showed.length) {
        overlay.className = 'win';
        overlay.style.display = 'flex';
        title.textContent = "Congratulations, You've won!!"
        start.textContent = 'Replay';
        resetGame = 1;
    }
}

// Shows losing screen and gives value for a reset
function lost() {
    if (missed === 5) {
        overlay.className = 'lose';
        overlay.style.display = 'flex';
        title.textContent = "Aww, better luck next time!!"
        start.textContent = 'Replay';
        resetGame = 1;
    }
}

// Functions resets all fields
function reset() {
    missed = 0;
    resetGame = 0; 
    
    // Resets lifes by changing back the image and class
    function resetHearts() {
        for (i = 0; i < lostLifes.length; i + 0) {
            lostLifes[i].firstElementChild.setAttribute('src', 'images/liveHeart.png');
            lostLifes[i].className = 'tries';
        }  
    }
    // Removes phrase
    function resetPhrase() {
        phrase.firstElementChild.innerHTML = "";
    }

    // Removes the chosen class from all buttons
    function resetKeyboard() {
        const buttons = document.querySelectorAll('button');
        for (i = 0; i < buttons.length; i++) {
            buttons[i].className = "";
        }
    }
    
    resetPhrase();
    resetHearts();
    resetKeyboard();
    addPhraseToDisplay(phrases);
    overlay.style.display = 'none';
}
