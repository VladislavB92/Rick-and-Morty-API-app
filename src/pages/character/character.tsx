import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
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
    let history = useHistory()

    useEffect(() => {

        let mounted = true

        axios.get('https://rickandmortyapi.com/api/character/' + id)
            .then((res) => {

                if (mounted) {
                    const results = res
                    setCharacterData(results.data)
                    setloading(false)
                }
            }).catch(({ response }) => {
                if (response.status === 404) {
                    history.push('/not_found')
                }
            })


        return function cleanup() {
            mounted = false
        }
    }, [])

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
}

export default Character