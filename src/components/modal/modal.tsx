import React, { FC } from 'react'
import './modal.css'

export const Modal: FC = ({ children }) => {

    return (
        <div className="modal">
            <div className="modal-container">
                {children}
            </div>
        </div>
    )
}