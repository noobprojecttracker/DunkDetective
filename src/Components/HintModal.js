import React from "react"
import { Modal } from "@mui/base"
import { createUnarySpacing } from "@mui/system";
import { useState } from "react";

export default function HintModal({showHint, correctData, setShowHint, hintGenre}){

    const [isOpen, setIsOpen] = useState(showHint)

    let theHint;

    if (hintGenre === 'team'){
        theHint = 'Your mystery player plays for the ' + correctData.team;
    }
    else if (hintGenre === 'letter'){
        theHint = 'Your mystery player\'s first name starts with ' + correctData.name[0];
    }
    else if (hintGenre === 'ppg'){
        theHint = 'Your mystery player scores ' + correctData.ppg + ' points per game';
    }

    return (
        <Modal open={showHint}>
            <div className="modal-container">
                <button className="close-modal" onClick={(() => {setShowHint(false)})}>X</button>
                <h1 className="modal-header">
                    Your Hint...
                </h1>
                <hr width="70%"></hr>
                <img src="https://assets.stickpng.com/images/58428defa6515b1e0ad75ab4.png" className="win-image"></img>
                <h2 className="modal-body">
                    {theHint}
                </h2>
            </div>
        </Modal>
    )
}