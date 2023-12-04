import './App.css';
import React, { useEffect } from 'react';

function TaskList({workInterval, breakInterval}) {
  const [startStop, setStartStop] = React.useState("start")
  const [tasks, setTasks] = React.useState([]);
  const [timeLeft, setTimeLeft] = React.useState(10)
  const [showTimer, setShowTimer] = React.useState(false)
  const [currIdx, setCurrIdx] = React.useState(-1)
  const [showBreakMessage, setShowBreakMessage] = React.useState(false)
  const [completedSessionsByIdx, setCompletedSessionsByIdx] = React.useState({})
  const intervalRef = React.useRef()

  const workIntervalSeconds = workInterval * 60
  const breakIntervalSeconds = breakInterval * 60
  console.log(completedSessionsByIdx)
  const taskElems = tasks.map((task, idx) => <li key={idx}>
    {showTimer && idx === currIdx && (
      <div>
      {!showBreakMessage && (
        <span className='task'>{task}</span>
      )}
      {showBreakMessage && (
        <span className='task'>take a break!</span>
      )}
      <span className='task'>:&nbsp;{Math.floor(timeLeft/3600)}:{Math.floor(timeLeft/60)}:{timeLeft - (Math.floor(timeLeft/60) * 60)}</span>
      <button onClick={() => handleStart(idx)}>{startStop}</button>
      <button onClick={() => handleRemove(idx)}>remove</button>
      </div>
    )}
    {!showTimer && idx !== currIdx && (
      <div>
      {completedSessionsByIdx[idx]}&nbsp;
      <span className='task'>{task}</span>
      <button onClick={() => handleStart(idx)}>{startStop}</button>
      <button onClick={() => handleRemove(idx)}>remove</button>
      </div>
    )}
  </li>)
  const inputRef = React.useRef()
  
  const handleClick = () => {
    const inputElem = inputRef.current
    const newTasks = tasks.concat(inputElem.value)
    setTasks(newTasks)
    localStorage.setItem("tasks", JSON.stringify(newTasks))
    localStorage.setItem("sessions", JSON.stringify(completedSessionsByIdx))
    inputElem.value = ""
  }

  useEffect(() => {
    localStorage.setItem("sessions", JSON.stringify(completedSessionsByIdx))
  }, [completedSessionsByIdx])

  const handleStart = (idx) => {
    setCurrIdx(idx)
    if(startStop === "start"){
      setShowTimer(true)
      setStartStop("stop")
      setTimeLeft(workIntervalSeconds)
      clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
        setTimeLeft((previousTimeLeft) => {
          if (previousTimeLeft === -1) {
            setShowTimer(false)
            setCurrIdx(-1)
            return 0
          }
          else if (previousTimeLeft === 0) {
            clearInterval(intervalRef.current)
            handleBreak()
            if(completedSessionsByIdx[idx]){
              setCompletedSessionsByIdx({...completedSessionsByIdx, [idx]: completedSessionsByIdx[idx] + 1})
            }
            else {
              setCompletedSessionsByIdx({...completedSessionsByIdx, [idx]: 1})
            }
            return 0
          }
          else {
            return previousTimeLeft - 1
          }
        })
      }, 1000)
    }
    else {
      setStartStop("start")
      setTimeLeft(-1)
    }
  }

  const handleBreak = () => {
    setTimeLeft(breakIntervalSeconds)
    clearInterval(intervalRef.current)
    setShowBreakMessage(true)
    intervalRef.current = setInterval(() => {
      setTimeLeft((previousTimeLeft) => {
        if (previousTimeLeft <= 0) {
          setStartStop("start")
          setShowTimer(false)
          setCurrIdx(-1)
          clearInterval(intervalRef.current)
          setShowBreakMessage(false)
          return 0
        }
        else {
          return previousTimeLeft - 1
        }
      })
    }, 1000)
  }

  const handleRemove = (idx) => {
    const newTasks = tasks.filter((tasks, taskIdx) => taskIdx !== idx)
    setTasks(newTasks)
    localStorage.setItem("tasks", JSON.stringify(newTasks))
  }

  const handleKeyDown = (ev) => {
    if(ev.keyCode === 13) {
      handleClick()
    }
  }

  let locStorTasks = JSON.parse(localStorage.getItem('tasks'));
  let locStorSess = JSON.parse(localStorage.getItem('sessions'))
  
  if (tasks.length === 0 && locStorTasks.length !== 0) {
    setTasks(locStorTasks)
    setCompletedSessionsByIdx(locStorSess)
  }

  return <div>
    <ul>{taskElems}</ul>
    <div>
      <span className='task'></span>
      <input type="text" ref={inputRef} onKeyDown={handleKeyDown} placeholder="task description" />
      <button onClick={handleClick}>+ add task</button>
    </div>
  </div>
}

function App() {
  const [workInterval, setWorkInterval] = React.useState(25)
  const [breakInterval, setBreakInterval] = React.useState(5)

  return (
    <div className="App">
      <h1>what do you want to do?</h1>
      <div><TaskList workInterval={workInterval} breakInterval={breakInterval}></TaskList></div>
      <div>
        <label>work interval (minutes)</label>
        <input type="text" onChange={(e) => {setWorkInterval(e.target.value)}} value={workInterval} />
      </div>
      <div>
        <label>break interval (minutes)</label>
        <input type="text" onChange={(e) => {setBreakInterval(e.target.value)}} value={breakInterval} />
      </div>
    </div>
  );
}

export default App;