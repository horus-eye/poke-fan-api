import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PokeTable(props) {
    const [pokemonData, setPokemonData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pokemonInfo, setPokemonInfo] = useState(null);

    function handleRowClick(pokemon) {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`)
            .then((response) => {
                setPokemonInfo(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function handleCardClick() {
        setPokemonInfo(null);
    }

    useEffect(() => {
        async function fetchData() {
            const result = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
            const pokemon = result.data.results.map(async (p) => {
                const pokemonResult = await axios.get(p.url);
                return {
                    id: pokemonResult.data.id,
                    name: pokemonResult.data.name,
                    image: pokemonResult.data.sprites.front_default,
                    weight: pokemonResult.data.weight,
                    height: pokemonResult.data.height,
                    types: pokemonResult.data.types,
                    abilities: pokemonResult.data.abilities,
                    base_experience: pokemonResult.data.base_experience,
                    stats: pokemonResult.data.stats,
                };
            });
            const pokemonData = await Promise.all(pokemon);
            setPokemonData(pokemonData);
            setLoading(false);
        }
        fetchData();
    }, []);

    return (
        <div className='container contenido'>
            {loading && <div className="loading-animation">Cargando...</div>}
            {!loading && (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pokemonData.map((pokemon) => (
                            <tr key={pokemon.id} onClick={() => handleRowClick(pokemon)}>
                                <td>{pokemon.id}</td>
                                <td>{pokemon.name}</td>
                                <td>
                                    <img src={pokemon.image} alt={pokemon.name} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {pokemonInfo && (
                <div className="pokemon-card" onClick={handleCardClick}>
                    <img src={pokemonInfo.sprites.front_default} alt='pokemon img' />
                    <h3>{pokemonInfo.name}</h3>
                    <p>ID: {pokemonInfo.id}</p>
                    <p>Altura: {pokemonInfo.height}</p>
                    <p>Peso: {pokemonInfo.weight}</p>
                    <p>Tipo: {pokemonInfo.types.map((type) => type.type.name).join(', ')}</p>
                    <p>Habilidades: {pokemonInfo.abilities.map((ability) => ability.ability.name).join(', ')}</p>
                    <p>Experiencia base: {pokemonInfo.base_experience}</p>
                    <p>Estadísticas:</p>
                    <ul>
                        {pokemonInfo.stats.map((stat) => (
                            <li key={stat.stat.name}>
                                {stat.stat.name}: {stat.base_stat}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default PokeTable;