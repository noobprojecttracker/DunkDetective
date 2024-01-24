import React from "react";

// This component needs to loop over an 
// array of guessed players
// and generate a row for each of them with the data

export default function PreviousGuess(){
    

    const first = ['a', 'b', 'c', 'd']

    return (
        <div className="table-container">
            <table className="guess-table">
                <tr className="headers">
                    <th id="odd">Player Name</th>
                    <th id="even">Age</th>
                    <th id="odd">Team</th>
                    <th id="even">Position</th>
                    <th id="odd">Height</th>
                    <th id="even">PPG</th>
                </tr>
                <tr>
                    {/* take images from where poeltl takes images
                    from, use inspect */}
                    <td>Lebron James</td>
                    <td>38</td>
                    <td>Lakers</td>
                    <td>F</td>
                    <td id="close-guess">6'8</td>
                    <td>27.3</td>
                </tr>
                <tr>
                    <td>Brook Lopez</td>
                    <td id="correct-guess">35</td>
                    <td>Bucks</td>
                    <td>C</td>
                    <td>7'1</td>
                    <td>12.1</td>
                </tr>
                {first.map((elem, index) => {
                    return (
                        <tr>
                            <td>{elem}</td>
                            <td>sdjf</td>
                            <td>Bucks</td>
                            <td>G</td>
                            <td>6'1</td>
                            <td>28.1</td>
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}