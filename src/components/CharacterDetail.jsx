import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CharacterDetail = ({ characterName }) => {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        const response = await axios.get(
          `https://genshin-app-api.herokuapp.com/api/characters/info/${characterName}?infoDataSize=all`
        );
        setCharacter(response.data); // Set the full character details
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterDetails();
  }, [characterName]); // Fetch data when characterName changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{character.name}</h1>
      <img src={character.cardImageURL} alt={character.name} width={200} />
      <p><strong>Title:</strong> {character.title}</p>
      <p><strong>Element:</strong> {character.element}</p>
      <p><strong>Weapon Type:</strong> {character.weaponType}</p>
      <p><strong>Birthday:</strong> {character.birthday}</p>
      <p><strong>Description:</strong> {character.description}</p>
      <h3>Ascension Materials</h3>
      <ul>
        {character.ascensionMaterials?.map((material, index) => (
          <li key={index}>{material}</li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterDetail;
