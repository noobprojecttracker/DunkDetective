import React from "react";
import { useState } from "react";
import { playerList } from "./playerList";
import Popup from 'reactjs-popup';
import WinModal from "./WinModal";
import HintModal from "./HintModal";
import LoseModal from "./LoseModal";

// things to reset (consider lifting states)
// guess count, playerData array, winning player (correctData),
// the hint, win variable, loss variable


export default function NewGuess({playerData, setPlayerData, correctData, win, setWin}){

    console.log('Winning name is ' + correctData.name)

    function createDropDown(){
        const listClone = [];
        const currentGuess = name;
        playerList.forEach((currName, index) => {
            const lowerName = currName.toLowerCase();
            const lowerGuess = name.toLowerCase();
            if (lowerName.includes(lowerGuess)){
                listClone.push(currName);
            }
        })
        setValidGuesses(listClone);
    }

    function handleClick(someText){
        const newName = someText;
        setName(newName);
        setClicked(true);
        setValidGuesses([])
    }

    function submitGuess(){
        // first check if the guess is correct
        if (name === correctData.name){
            setWin(true)
        }
        if ((playerList.includes(name) && !(name === correctData.name))){
        fetch('http://127.0.0.1:5000/newData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name})
        }).then(response => {
            response.json().then(finalPlayerData => {
                const newPlayerData = [...playerData];
                newPlayerData.push(finalPlayerData)
                setPlayerData(newPlayerData)
                
            })
        })
        setName('')
        setGuessesLeft(guessesLeft-1)
        setClicked(false)
        // once guess is made, if it was their last guess and it was
        // not correct, show lose modal
        if ((guessesLeft === 1)){
            setLoss(true);
        }
    }
    }

    const [name, setName] = useState('');
    const [validGuesses, setValidGuesses] = useState([]);
    const [guessesLeft, setGuessesLeft] = useState(8);
    const [clicked, setClicked] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [loss, setLoss] = useState(() => {
        return (guessesLeft === 0) && !(win)
    })

    return (
        <>
        {/* create a popup for when they win */}
        {
            win && <WinModal win={win} correctData={correctData}/>
        }
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
             {/* Hint modal button logic */}
            <button className="hint-button"
            onClick={(() => {setShowHint(true)})}
            >Use Hint</button>

            {loss && <LoseModal loss={loss} correctData={correctData}/>}
            {showHint && <HintModal hintGenre={hintGenre} showHint={showHint} setShowHint={setShowHint} correctData={correctData}/>}
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

const hintTypes = ['team', 'letter', 'ppg']
const hintGenre = hintTypes[Math.floor(Math.random() * hintTypes.length)];
