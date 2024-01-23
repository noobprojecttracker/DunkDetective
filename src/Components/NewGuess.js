import React from "react";

export default function NewGuess(){
    return (
        <div className="input">
            <input type="text" placeholder="Enter Player Name" className="guess-text"></input>
            <button className="guess-button">Guess</button>
        </div>
    )
}