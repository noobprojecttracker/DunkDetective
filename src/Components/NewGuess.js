import React from "react";
import { useState } from "react";
import { playerList } from "./playerList";
import Popup from 'reactjs-popup';
import WinModal from "./WinModal";




export default function NewGuess({playerData, setPlayerData, correctData, win, setWin}){

    console.log('win name is ' + correctData.name)

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
        // first check if the guess is correct
        if (name === correctData.name){
            setWin(true)
        }
        fetch('http://127.0.0.1:5000/newData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name})
        }).then(response => {
            response.json().then(finalPlayerData => {
                console.log(finalPlayerData)
                const newPlayerData = [...playerData];
                newPlayerData.push(finalPlayerData)
                setPlayerData(newPlayerData)
            })
        })
        setName('')
        setGuessesLeft(guessesLeft-1)
        setClicked(false)
    }

    const [name, setName] = useState('');
    const [validGuesses, setValidGuesses] = useState([]);
    const [guessesLeft, setGuessesLeft] = useState(8);
    const [clicked, setClicked] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

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