import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../sass/components/_CharacterSearch.scss';

const CharacterSearch = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ vision: '', weapon: '', rarity: '', nation: '' });
  const [imageUrls, setImageUrls] = useState({});
  const charactersGridRef = useRef(null);

  useEffect(() => {
    const savedFilters = JSON.parse(localStorage.getItem('filters'));
    if (savedFilters) {
      setFilters(savedFilters);
    }
  }, []);

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
      const { vision, weapon, rarity, nation } = filters;
      const filtered = characters.filter((character) => {
        return (
          (!vision || character.vision?.toLowerCase() === vision.toLowerCase()) &&
          (!weapon || character.weapon?.toLowerCase() === weapon.toLowerCase()) &&
          (!rarity || character.rarity === parseInt(rarity)) &&
          (!nation || character.nation?.toLowerCase() === nation.toLowerCase())
        );
      });
      setFilteredCharacters(filtered);
    };

    filterCharacters();
  }, [filters, characters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    localStorage.setItem('filters', JSON.stringify(newFilters));
  };

  const getCharacterImage = (character) => {
    const cachedImageUrl = localStorage.getItem(`character_${character.id}`);
    if (cachedImageUrl) {
      setImageUrls((prevState) => ({ ...prevState, [character.id]: cachedImageUrl }));
      return;
    }

    const idImageUrl = `https://genshin.jmp.blue/characters/${character.id}/card`;
    const nameImageUrl = `https://genshin.jmp.blue/characters/${character.name.toLowerCase().replace(/\s+/g, '-')}/card`;

    const img = new Image();
    img.onload = () => {
      localStorage.setItem(`character_${character.id}`, idImageUrl);
      setImageUrls((prevState) => ({ ...prevState, [character.id]: idImageUrl }));
    };
    img.onerror = () => {
      localStorage.setItem(`character_${character.id}`, nameImageUrl);
      setImageUrls((prevState) => ({ ...prevState, [character.id]: nameImageUrl }));
    };
    img.src = idImageUrl;
  };

  useEffect(() => {
    characters.forEach((character) => {
      getCharacterImage(character);
    });
  }, [characters]);

  useEffect(() => {
    const handleScroll = () => {
      const container = charactersGridRef.current;
      if (container.scrollTop + container.clientHeight >= container.scrollHeight - 50) {
        console.log('Reached the end of the scroll');
      }
    };

    const gridElement = charactersGridRef.current;
    if (gridElement) {
      gridElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (gridElement) {
        gridElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className="character-search-container">
      <header>
        <h1>Characters</h1>
      </header>
      <section className="filters" aria-label="Filter options">
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
        <label>
          Nation:
          <select name="nation" onChange={handleFilterChange} value={filters.nation}>
            <option value="">All</option>
            <option value="Mondstadt">Mondstadt</option>
            <option value="Liyue">Liyue</option>
            <option value="Inazuma">Inazuma</option>
            <option value="Sumeru">Sumeru</option>
            <option value="Fontaine">Fontaine</option>
            <option value="Natlan">Natlan</option>
            <option value="Snezhnaya">Snezhnaya</option>
            <option value="Khaenri'ah">Khaenri'ah</option>
          </select>
        </label>
      </section>
      <section
        className="characters-grid"
        ref={charactersGridRef}
        style={{
          maxHeight: '400px',
          overflowY: 'auto',
        }}
        aria-label="Character results"
      >
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {filteredCharacters.map((character) => (
            <li className="character-card" key={character.id}>
              <article>
                <h2>{character.name}</h2>
                <img
                  src={imageUrls[character.id]}
                  alt={`Image of ${character.name}`}
                  className="character-image"
                />
                <p>Vision: {character.vision}</p>
                <p>Weapon: {character.weapon}</p>
                <p>Rarity: {character.rarity} Stars</p>
                <p>Region: {character.nation}</p>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default CharacterSearch;
