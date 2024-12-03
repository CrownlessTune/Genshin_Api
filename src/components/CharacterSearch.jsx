import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../sass/components/_CharacterSearch.scss'; 

const CharacterSearch = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    vision: '',
    weapon: '',
    rarity: '',
  });

  const [imageUrls, setImageUrls] = useState({});  // Estado para almacenar URLs de imágenes

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get('https://genshin.jmp.blue/characters/all?lang=en');
        setCharacters(response.data);
        setFilteredCharacters(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Función para intentar cargar la imagen por id o por nombre
  const getCharacterImage = (character) => {
    const idImageUrl = `https://genshin.jmp.blue/characters/${character.id}/card`;
    const nameImageUrl = `https://genshin.jmp.blue/characters/${character.name.toLowerCase().replace(/\s+/g, '-')}/card`;

    // Primero intentamos cargar la imagen por id
    const img = new Image();
    img.onload = () => {
      setImageUrls(prevState => ({
        ...prevState,
        [character.id]: idImageUrl,  // Si carga, asignamos la imagen por ID
      }));
    };
    img.onerror = () => {
      // Si no carga la imagen por id, asignamos la imagen por nombre
      setImageUrls(prevState => ({
        ...prevState,
        [character.id]: nameImageUrl,
      }));
    };
    img.src = idImageUrl;
  };

  // Ejecutar la carga de imágenes para cada personaje cuando se renderiza
  useEffect(() => {
    characters.forEach((character) => {
      getCharacterImage(character);
    });
  }, [characters]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="character-search-container">
      <h1>Character Search</h1>
      <div className="filters">
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
      <div className="characters-grid">
        {filteredCharacters.map((character) => (
          <div className="character-card" key={character.id}>
            <h3>{character.name}</h3>
            <img
              src={imageUrls[character.id]}  // Usamos el estado para la imagen
              alt={character.name}
              className="character-image"
            />
            <p>Vision: {character.vision}</p>
            <p>Weapon: {character.weapon}</p>
            <p>Rarity: {character.rarity} Stars</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterSearch;
