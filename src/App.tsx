import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { Character } from './components/character'
import './App.css'
import 'flexboxgrid'

const App = () => {

  const [characters, setCharacters] = useState([])

  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/character')
      .then((response) => {
        setCharacters(response.data.results)
      })
  }, [])

  return (
    <div className="App">
      <section>
        <div className="container container-fluid">
          <div className="row">

            {characters.map(({ id, name, image, status }) => {
              return (

                <div key={id} className="col-xs-4">

                  <Character
                    name={name}
                    image={image}
                    status={status}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default App