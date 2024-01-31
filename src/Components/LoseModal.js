import React from "react"
import { useState } from "react"
import { Modal } from "@mui/base"

export default function LoseModal({correctData, loss, setReset}){

    const [isOpen, setIsOpen] = useState(loss)

    return (
        <Modal open={isOpen}>
            <div className="modal-container">
                <button className="close-modal" onClick={() => {
                    setIsOpen(false)
                    setReset(true)
                }}>X</button>
                <h1 className="modal-header">
                    Epic Fail!
                </h1>
                <hr width="70%"></hr>
                <img src="https://assets.stickpng.com/images/58428defa6515b1e0ad75ab4.png" className="win-image"></img>
                <h2 className="modal-body">
                    You failed to guess {correctData.name}! You lost...
                </h2>
            </div>
        </Modal>
    )
}