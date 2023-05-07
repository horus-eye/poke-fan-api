import React, { useEffect, useState } from 'react';
import getPokemonData from './getPokemon';
import PokemonTable from './PokemonTable';

const App = () => {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const data = await getPokemonData();
      setPokemonData(data);
    };

    fetchPokemonData();
  }, []);

  return (
    <div className='container '>
      <h1 className='titulo'>Pokédex</h1>
      <PokemonTable pokemonData={pokemonData} />
    </div>
  );
}

export default App;
