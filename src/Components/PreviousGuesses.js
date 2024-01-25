import React from "react";

// This component needs to loop over an 
// array of guessed players
// and generate a row for each of them with the data

export default function PreviousGuess({playerData, correctData}){
    
    let totalHeight;

    const first = ['a', 'b', 'c', 'd'];

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
                {playerData.map((elem, index) => {
                    const heightFeet = elem.height[0];
                    const heightInches = elem.height.slice(2);
                    // if the height in feet is an integer
                    if (!isNaN(+heightFeet)){
                        totalHeight = (12*parseInt(heightFeet)) + parseInt(heightInches);
                    }
                    return (
                        <tr key={index}>
                            <td>{elem.name}</td>
                            <td>{elem.age}</td>
                            <td>{elem.team}</td>
                            <td>{elem.pos}</td>
                            <td id={(totalHeight >= ((correctData.height)-2) && totalHeight <= (correctData.height)+2) ? 'close-guess' : ''}>{elem.height}</td>
                            <td>{elem.ppg}</td>
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}