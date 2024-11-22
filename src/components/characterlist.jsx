import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(
          'https://genshin-app-api.herokuapp.com/api/characters?infoDataSize=minimal'
        );
        setCharacters(response.data); // Set the character list with basic information
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Genshin Impact Characters</h1>
      <ul>
        {characters.map((character) => (
          <li key={character.name}>
            <h3>{character.name}</h3>
            <img src={character.cardImageURL} alt={character.name} width={100} />
            <p>{character.description}</p>
            <p>Element: {character.element}</p>
            <p>Weapon Type: {character.weaponType}</p>
            <p>Rarity: {character.rarity} Stars</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterList;
