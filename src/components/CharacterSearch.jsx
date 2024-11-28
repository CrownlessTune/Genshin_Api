import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CharacterSearch = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    vision: '', // Actualizado a "vision"
    weapon: '',
    rarity: '',
  });

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get('https://genshin.jmp.blue/characters/all?lang=en');
        setCharacters(response.data); // Supone que `response.data` contiene un array de personajes
        setFilteredCharacters(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const filterCharacters = () => {
      const { vision, weapon, rarity } = filters;
      const filtered = characters.filter((character) => {
        return (
          (!vision || character.vision?.toLowerCase() === vision.toLowerCase()) &&
          (!weapon || character.weapon?.toLowerCase() === weapon.toLowerCase()) &&
          (!rarity || character.rarity === parseInt(rarity))
        );
      });
      setFilteredCharacters(filtered);
    };

    filterCharacters();
  }, [filters, characters]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Character Search</h1>
      <div>
        <label>
          Vision:
          <select name="vision" onChange={handleFilterChange} value={filters.vision}>
            <option value="">All</option>
            <option value="Pyro">Pyro</option>
            <option value="Hydro">Hydro</option>
            <option value="Cryo">Cryo</option>
            <option value="Electro">Electro</option>
            <option value="Anemo">Anemo</option>
            <option value="Geo">Geo</option>
            <option value="Dendro">Dendro</option>
          </select>
        </label>
        <label>
          Weapon:
          <select name="weapon" onChange={handleFilterChange} value={filters.weapon}>
            <option value="">All</option>
            <option value="Sword">Sword</option>
            <option value="Claymore">Claymore</option>
            <option value="Polearm">Polearm</option>
            <option value="Bow">Bow</option>
            <option value="Catalyst">Catalyst</option>
          </select>
        </label>
        <label>
          Rarity:
          <select name="rarity" onChange={handleFilterChange} value={filters.rarity}>
            <option value="">All</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </label>
      </div>
      <ul>
        {filteredCharacters.map((character) => (
          <li key={character.id}>
            <h3>{character.name}</h3>
            <img
              src={`https://genshin.jmp.blue/characters/${character.id}/card`}
              alt={character.name}
              width={100}
            />
            <p>Vision: {character.vision}</p>
            <p>Weapon: {character.weapon}</p>
            <p>Rarity: {character.rarity} Stars</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterSearch;
