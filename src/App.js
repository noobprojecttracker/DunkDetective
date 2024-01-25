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
  const [object, setObject] = useState([]);

  useEffect(() => {
    const randomObject = playerList[Math.floor(Math.random() * playerList.length)];
    const splitName = randomObject.split(" ")
    setCorrect(randomObject);
    fetch(`https://www.balldontlie.io/api/v1/players/?search=${splitName[1]}&per_page=100`).then(
                (res) => res.json().then((json) => {
                    const results = json;
                    const data = results.data;
                    let test;
                    data.map((theName, index) => {
                        if (theName.first_name === splitName[0] && theName.last_name === splitName[1]){
                            const playerID = theName.id;
                            // fetch to different URL to get PPG
                            fetch(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${playerID}&season=2023`).then((res) => res.json().then(
                                (json) => {
                                    const resultsTwo = json;
                                    const dataTwo = resultsTwo.data;
                                    test = (dataTwo[0].pts);
                                }
                            )).then((something) => {
                                console.log('now test' + test);
                                const newPlayerData = [...playerData];
                                const correctHeight = (parseInt(theName.height_feet)*12) + (parseInt(theName.height_inches))
                                const newPlayerObject = {name: splitName[0] + ' ' + splitName[1], age: 21, team: theName.team.full_name, pos: theName.position, height: correctHeight, ppg: test};
                                console.log(newPlayerObject)
                                setObject(newPlayerObject)
                            })
                            
                            // console.log('now test' + test);
                            // const newPlayerData = [...playerData];
                            // const newPlayerObject = {name: splitName[0] + ' ' + splitName[1], age: 21, team: theName.team.full_name, pos: theName.position, height: theName.height_feet + '\'' + theName.height_inches, ppg: test};
                            // newPlayerData.push(newPlayerObject)
                            // setPlayerData(newPlayerData)
                        }
                    })
                })
            )
  }, [])


  const [playerData, setPlayerData] = useState([
    {name: "Luka Doncic", age: 26, team: "Mavericks", pos: 'F', height: '6 foot 8', ppg: 30.2},
  ])

  return (
    <div className="App">
      <h1>{correct}</h1>
      <h1>{object.height}</h1>
      <Header />
      <GameIntro />
      <NewGuess playerData={playerData} setPlayerData={setPlayerData}/>
      <PreviousGuess playerData={playerData} correctData={object}/>
    </div>
  );
}

export default App;
