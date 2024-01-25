import React from "react";
import { useState } from "react";
import { playerList } from "./playerList";

export default function NewGuess({playerData, setPlayerData}){

    function createDropDown(){
        const listClone = [];
        const currentGuess = name;
        playerList.forEach((currName, index) => {
            if (currName.includes(name)){
                listClone.push(currName);
            }
        })
        console.log(listClone)
        setValidGuesses(listClone);
    }

    function handleClick(someText){
        const newName = someText;
        setName(newName);
        setClicked(true);
        setValidGuesses([])
    }

    function submitGuess(){
        // only continue if the submitted player name is
        // in the array of valid player names
        // first find player id
        if (playerList.includes(name)){
            setGuessesLeft(guessesLeft-1);
            let splitName = name.split(" ");
            fetch(`https://www.balldontlie.io/api/v1/players/?search=${splitName[1]}&per_page=100`).then(
                (res) => res.json().then((json) => {
                    const results = json;
                    const data = results.data;
                    let test;
                    data.map((theName, index) => {
                        if (theName.first_name === splitName[0] && theName.last_name === splitName[1]){
                            console.log('Matching player found');
                            const playerID = theName.id;
                            // fetch to different URL to get PPG
                            fetch(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${playerID}&season=2023`).then((res) => res.json().then(
                                (json) => {
                                    const resultsTwo = json;
                                    const dataTwo = resultsTwo.data;
                                    test = (dataTwo[0].pts);
                                    console.log(test);
                                }
                            )).then((something) => {
                                console.log('now test' + test);
                                const newPlayerData = [...playerData];
                                const newPlayerObject = {name: splitName[0] + ' ' + splitName[1], age: 21, team: theName.team.full_name, pos: theName.position, height: theName.height_feet + '\'' + theName.height_inches, ppg: test};
                                newPlayerData.push(newPlayerObject)
                                setPlayerData(newPlayerData)
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
        }
        setName('');
        setClicked(false);
    }

    const [name, setName] = useState('');
    const [validGuesses, setValidGuesses] = useState([]);
    const [guessesLeft, setGuessesLeft] = useState(8);
    const [clicked, setClicked] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [ppg, setPPG] = useState(0);

    return (
        <>
        <div className="input-container">
        <div className="input">
            <input type="text" value={clicked === true ? `${name}` : `${guessesLeft} Guesses Remaining...`} 
            className="guess-text"
            onFocus={() => {
                setClicked(true)
                setShowDropdown(true);
            }}
            onChange={((e) => {
                setName(e.target.value);
                createDropDown()
            })}
            ></input>
            <button className="guess-button"
            onClick={submitGuess}
            >Guess</button>

            {showDropdown && <div className="dropdown">
            {validGuesses.map((someName, index) => {
            return (
                <h1 className="dropdown-item" id="x"
                onClick={
                    (() => {
                        handleClick(someName);
                    })
                }
                >{someName}</h1>
            )
        })}       
            </div>}

        </div>

        </div>
        </>
    )
}