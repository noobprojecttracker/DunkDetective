import { Modal, Box, useScrollTrigger } from "@mui/material";
import { useState } from "react";

export default function WinModal({win, correctData, setReset}){

    const [isOpen, setIsOpen] = useState(true)

    return (
        <Modal open={isOpen}>
            <div className="modal-container">
                <button className="close-modal" onClick={() => {
                    setIsOpen(false)
                    setReset(true)
                }}>X</button>
                <h1 className="modal-header">
                    Correct Guess!
                </h1>
                <hr width="70%"></hr>
                <img src="https://assets.stickpng.com/images/58428defa6515b1e0ad75ab4.png" className="win-image"></img>
                <h2 className="modal-body">
                    You guessed {correctData.name}! Congratulations
                </h2>
            </div>
        </Modal>
    )
}