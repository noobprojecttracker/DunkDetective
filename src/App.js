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

  const hintTypes = ['team', 'letter', 'ppg']

  const [answerObject, setAnswerObject] = useState([]); // correctData
  const [win, setWin] = useState(false);
  const [guessesLeft, setGuessesLeft] = useState(8);
  const [playerData, setPlayerData] = useState([])
  const [reset, setReset] = useState(false);
  const [loss, setLoss] = useState(() => {
    return (guessesLeft === 0) && !(win)
})
  const [hintGenre, setHintGenre] = useState(() => {
    return hintTypes[Math.floor(Math.random() * hintTypes.length)];
  })
  


  useEffect(() => {
    if (reset){
      setWin(false)
      setLoss(false)
      setGuessesLeft(8)
      const newPlayerData = [];
      setPlayerData(newPlayerData);

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
    }
    setHintGenre(hintTypes[Math.floor(Math.random() * hintTypes.length)])

    setReset(false)

  }, [reset])

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



  return (
    <div className="App">
      <Header />
      <GameIntro />
      <NewGuess playerData={playerData} setPlayerData={setPlayerData} correctData={answerObject} win={win} setWin={setWin} loss={loss} setLoss={setLoss} guessesLeft={guessesLeft} setGuessesLeft={setGuessesLeft} reset={reset} setReset={setReset} hintGenre={hintGenre}/>
      <PreviousGuess playerData={playerData} correctData={answerObject}/>
    </div>
  );
}

export default App;
