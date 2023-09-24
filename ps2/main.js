const WORD_LENGTH = 5; // How long each guess should be
const inputEl = document.querySelector('#guess-inp'); // The input DOM element

// Will store the correct answer once fetched
let correctAnswer = '';

// Before we have a set answer, disable the input field and show a loading message
inputEl.setAttribute('disabled', true);
showInfoMessage('Loading...');

// Get a random answer from the list
getRandomAnswer((answer) => {
    correctAnswer = answer;              // Once we have it, store it, ...
    inputEl.removeAttribute('disabled'); // enable the input field, ...
    clearInfoMessage();                  // clear the loading message, and...
    inputEl.focus();                     // and focus the input field
    // NOTE : If you use Live Preview, the focus line ☝️ can get annoying because
    //       it will keep focusing the input field every time you edit the file.
    //       You can comment it out.
});


function displayGuessFeedback(guess) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('guess');
    
    const parent = document.querySelector('#guesses');
    parent.append(newDiv);

    for(let i = 0; i < guess.length; i++) {
        const letter = guess[i].toUpperCase();
        const correctLetter = correctAnswer[i].toUpperCase();
        
        const newSpan = document.createElement('span');
        newSpan.innerText = letter;
        newSpan.classList.add('letter');


        if(letter === correctLetter) {
            newSpan.classList.add('correct');
        } else if(correctAnswer.toUpperCase().includes(letter)) {
            newSpan.classList.add('present');
        } else {
            newSpan.classList.add('absent'); 
        }
        
        newDiv.append(newSpan);
    }
}

inputEl.addEventListener('keydown', (ev) => {
    if(ev.key === 'Enter') {
        const value = inputEl.value;
        console.log(value);
        if (value.length != WORD_LENGTH) {
            showInfoMessage('Your guess must be ' + WORD_LENGTH + ' letters long.')
        }
        if (value === correctAnswer) {
            showInfoMessage('Your win! The answer was ' + correctAnswer)
            inputEl.setAttribute('disabled', true)
        }
        if (value != correctAnswer) {
            inputEl.value = "";
            if (isValidWord(value)) {
                displayGuessFeedback(value);
            }
            else {
                showInfoMessage(value + " is not a valid word.")
            }
            
        }
    }
    else {
        clearInfoMessage(); 
    }
});
//     1.d. If the guess is not the correct answer, then:...
//          1.d.i. Clear the input element's value
//          1.d.ii. Check if the guess is a valid word (using the isValidWord function)
//              1.d.ii.A If the guess is a valid word, display feedback for the guess (using the displayGuessFeedback function from Step 1)
//              1.d.ii.B If the guess is not a valid word, show an error message: "{guess} is not a valid word." (where {guess} is the value of the guess)
// 2. When the user presses key other than 'Enter', clear the info message (using the clearInfoMessage function)