import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../sass/components/_EnemiesSearch.scss';

const EnemiesSearch = () => {
  const [enemies, setEnemies] = useState([]);
  const [filteredEnemies, setFilteredEnemies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    type: '', // Normal, Elite, Boss
    region: '', // Region-specific enemies
  });

  // URLs alternativas para las imágenes
  const imageFallbacks = ['portrait', 'icon'];

  const getImageUrl = (entityType, entityId, imageType) =>
    `https://genshin.jmp.blue/${entityType}/${entityId}/${imageType}`;

  const handleImageError = (e, entityType, entityId, currentAttempt = 0) => {
    if (currentAttempt < imageFallbacks.length - 1) {
      const nextType = imageFallbacks[currentAttempt + 1];
      const nextUrl = getImageUrl(entityType, entityId, nextType);
      e.target.src = nextUrl; // Cambia la URL al siguiente fallback
      console.log(`Retrying with fallback: ${nextUrl}`);
    } else {
      e.target.src = 'https://via.placeholder.com/150'; // Imagen por defecto
      console.log(`All fallbacks failed. Using placeholder for ${entityId}`);
    }
  };

  useEffect(() => {
    const fetchEnemies = async () => {
      try {
        console.log('Fetching enemies data...');
        const bossesResponse = await axios.get('https://genshin.jmp.blue/boss/all?lang=en');
        const enemiesResponse = await axios.get('https://genshin.jmp.blue/enemies/all?lang=en');
        const combinedEnemies = [...bossesResponse.data, ...enemiesResponse.data];

        console.log('Combined enemies data:', combinedEnemies);
        setEnemies(combinedEnemies);
        setFilteredEnemies(combinedEnemies);
      } catch (err) {
        console.error('Error fetching enemies:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEnemies();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const filterEnemies = () => {
      const { type, region } = filters;
      const filtered = enemies.filter((enemy) => {
        return (
          (!type || enemy.type?.toLowerCase() === type.toLowerCase()) &&
          (!region || enemy.region?.toLowerCase() === region.toLowerCase())
        );
      });
      console.log('Filtered enemies:', filtered);
      setFilteredEnemies(filtered);
    };

    filterEnemies();
  }, [filters, enemies]);

  const truncateDescription = (description, maxLength = 150) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    }
    return description;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="enemies-search-container">
      <h1>Enemies Search</h1>
      <div className="filters">
        <label>
          Type:
          <select name="type" onChange={handleFilterChange} value={filters.type}>
            <option value="">All</option>
            <option value="Normal">Normal</option>
            <option value="Elite">Elite</option>
            <option value="Boss">Boss</option>
          </select>
        </label>
        <label>
          Region:
          <select name="region" onChange={handleFilterChange} value={filters.region}>
            <option value="">Global</option>
            <option value="Monstadt">Monstadt</option>
            <option value="Liyue">Liyue</option>
            <option value="Inazuma">Inazuma</option>
            <option value="Sumeru">Sumeru</option>
            <option value="Fontaine">Fontaine</option>
          </select>
        </label>
      </div>
      <div className="enemies-grid">
        {filteredEnemies.length === 0 && <div>No enemies found.</div>}
        {filteredEnemies.map((enemy) => (
          <div className="enemy-card" key={enemy.id}>
            <h3>{enemy.name}</h3>
            <img
              src={getImageUrl('enemies', enemy.id, 'portrait')}
              alt={enemy.name}
              className="enemy-image"
              onError={(e) => handleImageError(e, 'enemies', enemy.id, 0)}
            />
            <p>Type: {enemy.type || 'Unknown'}</p>
            <p>Region: {enemy.region || 'Unknown'}</p>
            <p>Description: {truncateDescription(enemy.description || 'No description available')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnemiesSearch;
