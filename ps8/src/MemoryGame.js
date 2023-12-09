import React, { useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBrain, faStar } from "@fortawesome/free-solid-svg-icons"

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export default function MemoryGame() {
    const [score, updateScore] = React.useState(0)
    const [level, updateLevel] = React.useState(1)
    const [gameStarted, updateGameStarted] = React.useState(false)
    const [showNumber, setShowNumber] = React.useState(true)
    const [showAnswerBox, setShowAnswerBox] = React.useState(false)
    const [isCorrect, setIsCorrect] = React.useState(true)
    const [highscore, updateHighscore] = React.useState(0)
    const [gameOver, updateGameOver] = React.useState(false)
    const [gameWon, updateGameWon] = React.useState(false)
    const mode = {
        1: [1, 100, 6000],
        2: [100, 1000, 5000],
        3: [1000, 10000, 4000],
        4: [10000, 100000, 3000],
        5: [100000, 1000000, 3000],
        6: [1000000, 10000000, 3000],
        7: [1000000, 10000000, 2000],
        8: [1000000, 10000000, 1000],
        9: [10000000, 10000000, 3000],
        10: [10000000, 10000000, 2000],
    }
    const [number, setNumber] = React.useState(0)
    useEffect(() => {
        if(localStorage.getItem("highscore") === null){
            localStorage.setItem("highscore", String(score))
        }
        else{
            updateHighscore(Number(localStorage.getItem("highscore")))
        }
    }, [])

    function getNums() {
        setNumber(randInt(mode[level][0], mode[level][1]))
    }

    useEffect(() => {
        getNums()
        setShowNumber(true);
        setShowAnswerBox(false);
        const toRef = setTimeout(() => {
            setShowNumber(false);
            clearTimeout(toRef);
            setShowAnswerBox(true);
          }, mode[level][2]);
    }, [gameStarted, level])

    const inputRef = React.useRef()

    const handleClick = () => {
        const inputElem = inputRef.current.value
        console.log(inputElem)
        if(Number(inputElem) === number) {
            updateScore(score+10)
            updateLevel(level+1)
            if(level === 11){
                updateGameWon(true)
                updateScore(0)
                updateLevel(1)
                updateGameStarted(false)
            }
        }
        else {
            setIsCorrect(false)
            if(score > highscore){
                updateHighscore(score)
                localStorage.setItem("highscore", String(score))
            }
            updateScore(0)
            updateLevel(1)
            updateGameOver(true)
        }
    }


    return (
        <div>
            <div>
                <h1><FontAwesomeIcon icon={faBrain} />Memory Game<FontAwesomeIcon icon={faBrain} /></h1>
                <h2>Instructions:</h2>
                <p>a number will appear for a certain amount of time before disappearing and you need to remember that number and input it into the textbox</p>
                <h3><FontAwesomeIcon icon={faStar} />High Score: {highscore}<FontAwesomeIcon icon={faStar} /></h3>
                <h3>Current Score: {score}</h3>
            </div>
            <div>
                {gameStarted && isCorrect ? (
                    <div>
                        <h3>Level: {level}</h3>
                        {showNumber && (
                            <p>{number}</p>
                        )}
                        {showAnswerBox && (
                            <div>
                            <input type="text" ref={inputRef} placeholder="enter the number"></input>
                            <button onClick={handleClick}>submit</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        {gameOver && (
                            <p>Nice try!</p>
                        )}
                        {gameWon && (
                            <p>Congrats! You won!</p>
                        )}
                        <button onClick={() => {updateGameStarted(true); setIsCorrect(true)}}>Click to Start!</button>
                    </div>
                )}

            </div>
        </div>
    )
}