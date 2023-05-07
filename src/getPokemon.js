import axios from 'axios';

const getPokemonData = async () => {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
    const pokemonList = response.data.results;
    const pokemonDataList = [];

    for (const pokemon of pokemonList) {
        const pokemonResponse = await axios.get(pokemon.url);
        pokemonDataList.push({
            id: pokemonResponse.data.id,
            nombre: pokemonResponse.data.name,
            foto: pokemonResponse.data.sprites.front_default
        });
    }

    return pokemonDataList.sort((a, b) => a.name.localeCompare(b.name)); // Ordenar por nombre
}

export default getPokemonData;
