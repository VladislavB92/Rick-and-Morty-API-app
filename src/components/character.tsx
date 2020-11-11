import React, { FC, useState } from 'react'
import './character.css'
type Props = {
    name: string
    image: string
    status: string
}
export const Character: FC<Props> = ({ name, image, status }) => {
    const [showStatusOverlay, setShowStatusOverlay] = useState(false)

    return (
        <div>
            <div className="character__image-wrapper">
                {showStatusOverlay && (
                    <div
                        className="character__overlay"
                        onClick={() => setShowStatusOverlay(false)}
                    >
                        Status: {status.toLowerCase()}
                    </div>
                )}
                <img
                    src={image}
                    alt=""
                    className="character__image"
                    onClick={() => setShowStatusOverlay(true)}
                />
            </div>
            <span>{name}</span>
        </div>
    )
}

