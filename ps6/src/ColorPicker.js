import './ColorPicker.css';
import Slider from './Slider';
import React from "react";

const MIN = 0;
const MAX = 255;

function App(props) {
  const { showSlider, showCheatMode, showColorPreview } = props
  const [red, setRed]     = React.useState(getRandomIntegerBetween(MIN, MAX));
  const [green, setGreen] = React.useState(getRandomIntegerBetween(MIN, MAX));
  const [blue, setBlue]   = React.useState(getRandomIntegerBetween(MIN, MAX));
  return (
    <div className="App">
      <form>
        <input type="checkbox" id="cheat-mode" onChange={showCheatMode}></input>
        <label>Cheating mode</label>
      </form>
      {showColorPreview && 
        <div id="color-preview" style={{backgroundColor: `rgb(${red}, ${green}, ${blue})`}} />
      }
      {showSlider &&
        <div id="color-picker">
            <div className="row">
            <span className="component-color-preview" style={{backgroundColor: `rgb(255, 0, 0, ${red/MAX})`  }}>Red:</span>
            <Slider id="red-input" min={MIN} max={MAX} startingValue={red} onChange={r => setRed(r)} />
            </div>
            <div className="row">
            <span className="component-color-preview" style={{backgroundColor: `rgb(0, 255, 0, ${green/MAX})`}}>Green:</span>
            <Slider id="green-input" min={MIN} max={MAX} startingValue={green} onChange={g => setGreen(g)} />
            </div>
            <div className="row">
            <span className="component-color-preview" style={{backgroundColor: `rgb(0, 0, 255, ${blue/MAX})` }}>Blue:</span>
            <Slider id="blue-input" min={MIN} max={MAX} startingValue={blue} onChange={b => setBlue(b)} />
            </div>
        </div>
      }
    </div>
  );
}

export default App;

function getRandomIntegerBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}