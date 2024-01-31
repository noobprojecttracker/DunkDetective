import React, { useEffect, useState } from "react";

// This component needs to loop over an 
// array of guessed players
// and generate a row for each of them with the data

export default function PreviousGuess({playerData, correctData}){
    
    let totalHeight;
    console.log(playerData)
    
    return (
        <div className="table-container">
            <table className="guess-table">
                <thead>
                    <tr className="headers">
                        <th id="">Player Name</th>
                        <th id="">Age</th>
                        <th id="">Team</th>
                        <th id="">Conference</th>
                        {/* <th id="even">Position</th> */}
                        <th id="">Height</th>
                        <th id="">PPG</th>
                    </tr>
                </thead>
                <tbody>
                    {playerData.map((elem, index) => {
                        // Logic for determining class names (IDs)
                        let ageID, heightID;
                        let ageArrow;
                        let heightArrow;
                        let ppgArrow;
                        // Logic for ageID
                        if (elem.age === correctData.age) {
                            ageID = 'correct-guess';
                            ageArrow = '';
                        } else if ((elem.age >= correctData.age - 2) && (elem.age <= correctData.age + 2)) {
                            ageID = 'close-guess';
                        } else {
                            ageID = 'none';
                        }
                        if (elem.age > correctData.age){
                            ageArrow = '↓';
                        }
                        else if (elem.age < correctData.age){
                            ageArrow = '↑';
                        }

                        // Logic for heightID
                        if (elem.totalInches === correctData.totalInches) {
                            heightID = 'correct-guess';
                            heightArrow = ''
                        } else if ((elem.totalInches >= correctData.totalInches - 2) && (elem.totalInches <= correctData.totalInches + 2)) {
                            heightID = 'close-guess';
                        } else {
                            heightID = 'none';
                        }
                        if (elem.totalInches > correctData.totalInches){
                            heightArrow = '↓';
                        }
                        else if (elem.totalInches < correctData.totalInches){
                            heightArrow = '↑';
                        }

                        if (elem.ppg > correctData.ppg){
                            ppgArrow = '↓';
                        }
                        else if (elem.ppg < correctData.ppg){
                            ppgArrow = '↑';
                        }
    
                        return (
                            <tr key={index}>
                                <td id={elem.name === correctData.name ? 'correct-guess' : 'none'}>{elem.name}</td>
                                <td id={ageID}>{elem.age}{ageArrow}</td>
                                <td id={elem.team === correctData.team ? 'correct-guess' : 'none'}>{elem.team}</td>
                                <td id={elem.conference === correctData.conference ? 'correct-guess' : 'none'}>{elem.conference}</td>
                                <td id={heightID}>{elem.height}{heightArrow}</td>
                                <td id={elem.ppg === correctData.ppg ? 'correct-guess' : 'none'}>{elem.ppg}{ppgArrow}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}