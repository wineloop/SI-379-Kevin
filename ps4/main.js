/**
 
A function to randomly shuffle the items in an array and return a copy of the shuffled array.
Based on: https://stackoverflow.com/a/12646864
@param {Array} array An array of any type
@returns A shuffled copy of the array
*/

function shuffleArray(array) {
    const shuffledArray = array.slice(); // Copy the array

    // Shuffle the copy of the array using https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
    for (let i = shuffledArray.length - 1; i > 0; i--) { // For each index,
        const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements i and j
    }
    return shuffledArray; // Return the shuffled copy
}
let attempted = 0;
let score = 0;

const promiseObject = fetch('https://the-trivia-api.com/v2/questions');

const jsonPromise = promiseObject.then((value) => {
    return value.json()
});

jsonPromise.then((value) => {
    showQuestions(value)
});

function onClickEvent(correct, selected, answerListId) {
    attempted += 1;
    const answerList = document.getElementsByClassName(`button-${answerListId}`);
    for(let i = 0; i < answerList.length; i++){
        answerList[i].setAttribute("disabled", true);
        if(correct === selected && answerList[i].innerText === correct){
            answerList[i].style.backgroundColor = "green";
        }
        if(correct !== selected && answerList[i].innerText === correct){
            answerList[i].style.backgroundColor = "green";
        }
        if(correct !== selected && answerList[i].innerText === selected){
            answerList[i].style.backgroundColor = "red";
        }
    }
    if(correct === selected){
        score += 1;
    }
    const scoreboard = document.getElementById(`score`);
    scoreboard.innerText = `Score: ${score} of ${attempted}`;
}

function showQuestions(questions) {
    const questionsDiv = document.querySelector("#questions");
    for(let i = 0; i < questions.length; i++){
        const questionP = document.createElement("p");
        const answerList = document.createElement("ul");
        questionP.innerText = questions[i].question.text;
        let answers = questions[i].incorrectAnswers;
        answers.push(questions[i].correctAnswer);
        answers = shuffleArray(answers);
        for(let j = 0; j < answers.length; j++){
            const ans = document.createElement("li");
            const ansButton = document.createElement("button");
            ansButton.classList.add(`button-${i}`)
            ansButton.innerText = answers[j];
            ansButton.addEventListener('click', () => {
                onClickEvent(questions[i].correctAnswer, answers[j], i);
            });
            ans.append(ansButton);
            answerList.append(ans);
        }
        questionsDiv.append(questionP);
        questionsDiv.append(answerList);
    }
}