import React from "react";
import { useState } from "react";

export default function NewGuess(){

    const playerList = ['Precious Achiuwa', 'Bam Adebayo', 'Grayson Allen', 'Jarrett Allen', 'Kyle Anderson', 'Giannis Antetokounmpo', 'Cole Anthony', 'OG Anunoby', 'Deni Avdija', 'Deandre Ayton', 'Marvin Bagley III', 'LaMelo Ball', 'Paolo Banchero', 'Desmond Bane', 'Harrison Barnes', 'Scottie Barnes', 'RJ Barrett', 'Keita Bates-Diop', 'Bradley Beal', 'Malik Beasley', 'Saddiq Bey', 'Bogdan Bogdanović', 'Bojan Bogdanović', 'Bol Bol', 'Devin Booker', 'Chris Boucher', 'Malaki Branham', 'Mikal Bridges', 'Malcolm Brogdon', 'Dillon Brooks', 'Bruce Brown', 'Jaylen Brown', 'Jalen Brunson', 'Thomas Bryant', 'Alec Burks', 'Jimmy Butler', 'Kentavious Caldwell-Pope', 'Clint Capela', 'Wendell Carter Jr.', 'Julian Champagnie', 'Brandon Clarke', 'Jordan Clarkson', 'Nic Claxton', 'John Collins', 'Zach Collins', 'Mike Conley', 'Cade Cunningham', 'Seth Curry', 'Stephen Curry', 'Anthony Davis', 'DeMar DeRozan', 'Hamidou Diallo', 'Spencer Dinwiddie', 'Donte DiVincenzo', 'Luka Dončić', 'Luguentz Dort', 'Kris Dunn', 'Kevin Durant', 'Jalen Duren', 'Tari Eason', 'Anthony Edwards', 'Joel Embiid', 'Dorian Finney-Smith', "De'Aaron Fox", 'Markelle Fultz', 'Darius Garland', 'Paul George', 'Josh Giddey', 'Shai Gilgeous-Alexander', 'Rudy Gobert', 'Aaron Gordon', 'Eric Gordon', "Devonte' Graham", 'Jerami Grant', 'RaiQuan Gray', 'Jalen Green', 'Josh Green', 'Quentin Grimes', 'Rui Hachimura', 'Tyrese Haliburton', 'Tim Hardaway Jr.', 'James Harden', 'Tobias Harris', 'Josh Hart', 'Killian Hayes', 'Gordon Hayward', 'Tyler Herro', 'Buddy Hield', 'Jrue Holiday', 'Al Horford', 'Talen Horton-Tucker', 'Kevin Huerter', "De'Andre Hunter", 'Bones Hyland', 'Brandon Ingram', 'Kyrie Irving', 'Jaden Ivey', 'Jaren Jackson Jr.', 'Reggie Jackson', 'LeBron James', 'Isaiah Joe', 'Cameron Johnson', 'Keldon Johnson', 'Nikola Jokić', 'Herbert Jones', 'Tre Jones', 'Tyus Jones', 'Luke Kennard', 'Walker Kessler', 'Louis King', 'Corey Kispert', 'Jonathan Kuminga', 'Kyle Kuzma', 'Zach LaVine', 'Kawhi Leonard', 'Caris LeVert', 'Damian Lillard', 'Brook Lopez', 'Kyle Lowry', 'Sandro Mamukelashvili', 'Lauri Markkanen', 'Naji Marshall', 'Caleb Martin', 'Kenyon Martin Jr.', 'Bennedict Mathurin', 'Tyrese Maxey', 'Skylar Mays', 'Mac McClung', 'CJ McCollum', 'Jaden McDaniels', 'Jalen McDaniels', 'Doug McDermott', "De'Anthony Melton", 'Khris Middleton', 'Donovan Mitchell', 'Evan Mobley', 'Malik Monk', 'Ja Morant', 'Marcus Morris', 'Monte Morris', 'Trey Murphy III', 'Dejounte Murray', 'Jamal Murray', 'Keegan Murray', 'Svi Mykhailiuk', 'Andrew Nembhard', 'Aaron Nesmith', 'Jaylen Nowell', 'Jusuf Nurkić', 'Jordan Nwora', 'Onyeka Okongwu', 'Victor Oladipo', 'Kelly Olynyk', 'Eugene Omoruyi', 'Kelly Oubre Jr.', 'Chris Paul', 'Cameron Payne', 'Mason Plumlee', 'Jakob Poeltl', 'Jordan Poole', 'Kevin Porter Jr.', 'Michael Porter Jr.', 'Bobby Portis', 'Kristaps Porziņģis', 'Norman Powell', 'Taurean Prince', 'Immanuel Quickley', 'Julius Randle', 'Austin Reaves', 'Cam Reddish', 'Naz Reid', 'Josh Richardson', 'Terry Rozier', "D'Angelo Russell", 'Domantas Sabonis', 'Luka Šamanić', 'Dennis Schröder', 'Alperen Şengün', 'Collin Sexton', 'Shaedon Sharpe', 'Pascal Siakam', 'Anfernee Simons', 'Marcus Smart', 'Jabari Smith Jr.', 'Jalen Smith', 'Jeremy Sochan', 'Isaiah Stewart', 'Max Strus', 'Jalen Suggs', "Jae'Sean Tate", 'Jayson Tatum', 'Cam Thomas', 'Klay Thompson', 'Karl-Anthony Towns', 'Gary Trent Jr.', 'Myles Turner', 'Jonas Valančiūnas', 'Fred VanVleet', 'Devin Vassell', 'Gabe Vincent', 'Nikola Vučević', 'Franz Wagner', 'Moritz Wagner', 'Lonnie Walker IV', 'John Wall', 'T.J. Warren', 'P.J. Washington', 'Russell Westbrook', 'Coby White', 'Derrick White', 'Andrew Wiggins', 'Jalen Williams', 'Jeenathan Williams', 'Patrick Williams', 'Zion Williamson', 'James Wiseman', 'Christian Wood', 'Trae Young', 'Ivica Zubac']

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
        console.log(someText)
        setClicked(true);
        setName(newName);
    }

    const [name, setName] = useState('')
    const [validGuesses, setValidGuesses] = useState([]);
    const [guessesLeft, setGuessesLeft] = useState(8);
    const [clicked, setClicked] = useState(false);

    return (
        <>
        <div className="input-container">
        <div className="input">
            <input type="text" placeholder={clicked === true ? `${name}` : `${guessesLeft} Guesses Remaining...`} 
            className="guess-text"
            onChange={((e) => {
                setName(e.target.value);
                createDropDown()
            })}
            ></input>
            <button className="guess-button">Guess</button>

            <div className="dropdown">
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
            </div>

        </div>

        </div>
        </>
    )
}