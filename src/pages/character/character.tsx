import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from "react-router-dom";
import axios from 'axios';
import './character.css'

type Props = {
    id: string
}

type Character = {
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    location: string,
    image: string,
    created: string
}

const Character = () => {
    const { id } = useParams<Props>();
    const [characterData, setCharacterData] = useState<Character>()
    const [loading, setloading] = useState(true)

    useEffect(() => {

        let mounted = true

        axios.get('https://rickandmortyapi.com/api/character/' + id)
            .then((res) => {

                if (mounted) {
                    const results = res
                    setCharacterData(results.data)
                    setloading(false)
                }
            })

        return function cleanup() {
            mounted = false
        }
    }, [])

    if (id <= "671") {
        return (

            <div>
                {!loading && (
                    characterData ? (
                        <div className="characterInfo">
                            <h1>{characterData.name}</h1>
                            <img src={characterData.image} alt="" /><br />
                        Status: {characterData.status}<br />
                        Species: {characterData.species}<br />
                        Subspecies type: {!characterData.type ? 'No data' : characterData?.type}<br />
                        Sex: {characterData.gender}<br />
                        Created at: {characterData.created}<br />
                        </div>
                    ) : (
                            <p>No data</p>
                        ))
                }
            </div>
        )
    } else {
        return <Redirect to="/not_found" />
    }
}

export default Character