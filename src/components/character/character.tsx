import React, { Children, FC, useState } from 'react'
import { Modal } from '../modal/modal'
import axios from 'axios';
import './character.css'
import { Link } from "react-router-dom";

export type Props = {
    id: number
    name: string
    image: string
    status: string
    location: {
        name: string
        url: string
    }
}

type Planet = {
    name: string,
    dimension: string,
    residents: string[]
}

export const Character: FC<Props> = ({ id, name, image, status, location }) => {
    const [showStatusOverlay, setShowStatusOverlay] = useState(false)
    const [planet, setPlanet] = useState<Planet>()
    const [resident, setResident] = useState<Props>()
    const [planetLoading, setPlanetLoading] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)

    const fetchPlanetData = () => {
        setPlanetLoading(true)

        axios.get(location.url).then((res) => {
            setPlanet(res.data)
            setPlanetLoading(false)
        })
    }

    const openResidentsModal = (residentURL: string) => {

        setModalOpen(true)

        axios.get(residentURL)
            .then((res) => {
                setResident(res.data)
            })
    }

    const closeResidentsModal = () => {

        setModalOpen(false)
    }

    return (
        <div>
            <div className="character__image-wrapper">
                {showStatusOverlay && (
                    <div
                        className="character__overlay"
                        onClick={() => setShowStatusOverlay(false)}
                    >
                        {status}
                    </div>
                )}
                <img
                    src={image}
                    alt=""
                    className="character__image"
                    onClick={() => setShowStatusOverlay(true)}
                />
            </div>
            <p className="margin-bottom--8">
                <strong>{name}</strong>
            </p>
            {!planet ? (
                <p
                    className="character__anchor"
                    title={location.name}
                    onClick={() => fetchPlanetData()}
                >
                    Show location info
                </p>
            ) : (
                    <div>
                        <p>
                            <b>Name:</b> {planet.name}
                            <br />
                            <b>Dimension:</b> {planet.dimension}
                            <br />
                            <b>Population:</b> {planet.residents.length}
                        </p>

                        <button onClick={() => openResidentsModal(planet.residents[0])}>
                            View first resident of {planet.name}
                        </button>

                    </div>
                )}

            {planetLoading &&
                <p>Loading...</p>}

            <div className="margin-bottom--24"></div>
            <Link to={`/character/${id}`}>
                Read More
            </Link>

            {modalOpen && (
                //@ts-ignore
                <Modal >
                    <div onClick={closeResidentsModal}>
                        <h1>The first resident of {resident?.location.name}</h1>
                        <img src={resident?.image} alt="character" />
                        <p>Name: {resident?.name}</p>
                        <p>Status: {resident?.status}</p>
                        <p>Location: {resident?.location.name}</p>
                    </div>
                </Modal>
            )}
        </div>
    )
}