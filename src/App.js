import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import GameIntro from './Components/GameIntro';
import NewGuess from './Components/NewGuess';
import PreviousGuess from './Components/PreviousGuesses';
import { useState } from 'react';
import { playerList } from './Components/playerList';
import { useEffect } from 'react';


function App() {

  const [correct, setCorrect] = useState('');
  const [answerObject, setAnswerObject] = useState([]);
  const [ft, setFt] = useState(0);
  const [inc, setInc] = useState(0);
  const [win, setWin] = useState(false);


  useEffect(() => {
    const name = playerList[Math.floor(Math.random() * playerList.length)];
    fetch('http://127.0.0.1:5000/newData', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({name})
  }).then(response => {
    response.json().then(answerData => {
      setAnswerObject(answerData)
    })
  })
  }, []) // on render, find random player and get their data


  const [playerData, setPlayerData] = useState([])

  return (
    <div className="App">
      {/* <h1>{answerObject.name}</h1>
      <h1>{answerObject.height}</h1>
      <h1>{answerObject.inches}</h1> */}
      <Header />
      <GameIntro />
      <NewGuess playerData={playerData} setPlayerData={setPlayerData} correctData={answerObject} win={win} setWin={setWin}/>
      <PreviousGuess playerData={playerData} correctData={answerObject}/>
    </div>
  );
}

export default App;
