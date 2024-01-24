import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import GameIntro from './Components/GameIntro';
import NewGuess from './Components/NewGuess';
import PreviousGuess from './Components/PreviousGuesses';
import { useState } from 'react';

function App() {

  const [playerData, setPlayerData] = useState([
    {name: "Luka Doncic", age: 26, team: "Mavericks", pos: 'F', height: '6 foot 8', ppg: 30.2},
  ])

  return (
    <div className="App">
      <Header />
      <GameIntro />
      <NewGuess playerData={playerData} setPlayerData={setPlayerData}/>
      <PreviousGuess playerData={playerData}/>
    </div>
  );
}

export default App;
