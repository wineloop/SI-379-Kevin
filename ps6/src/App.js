import './App.css';
import ColorPicker from './ColorPicker';
import React from "react";

function App() {
  const MIN = 0;
  const MAX = 255;
  const [isGuessButton, setIsGuessButton] = React.useState(true);
  const [red, setRed] = React.useState('');
  const [blue, setBlue] = React.useState('');
  const [green, setGreen] = React.useState('');
  const [actualRed, setActualRed] = React.useState(getRandomIntegerBetween(MIN, MAX));
  const [actualGreen, setActualGreen] = React.useState(getRandomIntegerBetween(MIN, MAX));
  const [actualBlue, setActualBlue] = React.useState(getRandomIntegerBetween(MIN, MAX));
  const [showColorPreview, setShowColorPreview] = React.useState(false);
  const [showSlider, setShowSlider] = React.useState(true);

  function getRandomIntegerBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function showCheatMode(){
    if (document.getElementById("cheat-mode").checked) {
      setShowColorPreview(true)
    }
    else {
        setShowColorPreview(false)
    }
  }

  function handleClick(){
    if(isGuessButton === true){
      setRed(document.getElementById("red-input").value);
      setBlue(document.getElementById("blue-input").value);
      setGreen(document.getElementById("green-input").value);
      setShowColorPreview(true)
      setIsGuessButton(false);
      setShowSlider(false)
      setShowColorPreview(true)
    }
    else{
      setIsGuessButton(true);
      setActualRed(getRandomIntegerBetween(MIN, MAX))
      setActualGreen(getRandomIntegerBetween(MIN, MAX))
      setActualBlue(getRandomIntegerBetween(MIN, MAX))
      setShowColorPreview(false)
      setShowSlider(true)
      showCheatMode()
    }
  }
  return (
    <div className="App">
      <h1>Guess the color of the rectangle</h1>
      <div id="color-preview" style={{backgroundColor: `rgb(${actualRed}, ${actualGreen}, ${actualBlue})`}} />
      <ColorPicker showSlider={showSlider} showCheatMode={showCheatMode} showColorPreview={showColorPreview}/>
      <p>
        {isGuessButton === false ? `Your guess: rgb(${red}, ${green}, ${blue}). Actual: rgb(${actualRed}, ${actualGreen}, ${actualBlue})`: ''}
      </p>
      <button type="button" onClick={handleClick}>{isGuessButton === true ? "Guess" : "Next"}</button>
    </div>
  );
}

export default App;
