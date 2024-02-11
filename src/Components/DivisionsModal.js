import React from "react";
import { Modal } from "@mui/base"
import { useState } from "react";

export default function DivisionsModal({showDivs}){

    const [isOpen, setIsOpen] = useState(showDivs)

    return (
        <Modal open={isOpen}>
            <div className="divisions-container">
                <table className="div-table">
                    <thead>
                        <tr>
                            <th>Atlantic</th>
                            <th>XYZ</th>
                            <th>AKX</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>example</td>
                            <td>examplew</td>
                            <td>example3</td>
                            <td>awf</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Modal>
    )
}