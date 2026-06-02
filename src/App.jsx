import React, { useState } from 'react'
import Header from './components/Header'
import ListaPokemon from './pages/ListaPokemons'
import InfoPokemon from './pages/InfoPokemon'
import { PageContext } from './context/PageContext'

const App = () => {
  const [pokemonSeleccionado, setPokemonSeleccionado] = useState(null)

  return (
    <PageContext.Provider
      value={{
        pokemonSeleccionado,
        setPokemonSeleccionado
      }}
    >
      <Header />

      {
        pokemonSeleccionado
          ? <InfoPokemon />
          : <ListaPokemon />
      }

    </PageContext.Provider>
  )
}

export default App