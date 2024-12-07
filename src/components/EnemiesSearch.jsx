import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../sass/components/_EnemiesSearch.scss';
import PaimonConfuse from '../assets/img/Paimon_Confuse.png'; // Importar imagen de Paimon

const EnemiesSearch = () => {
  const [enemies, setEnemies] = useState([]);
  const [filteredEnemies, setFilteredEnemies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    type: '', // "Elite Enemies", "Common Enemies"
    region: '', // Region-specific enemies
  });
  const enemiesGridRef = useRef(null);

  const getImageUrl = (entityType, entityId) =>
    `https://genshin.jmp.blue/${entityType}/${entityId}/portrait`;

  const handleImageError = (e) => {
    e.target.src = PaimonConfuse; // Mostrar Paimon inmediatamente si falla la carga inicial
    console.log('Image failed to load. Using Paimon as fallback.');
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
        const enemyTypeMatch = !type || (enemy.type?.toLowerCase() === type.toLowerCase());
        const enemyRegionMatch = !region || (enemy.region?.toLowerCase() === region.toLowerCase());
        
        return enemyTypeMatch && enemyRegionMatch;
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

  useEffect(() => {
    const handleScroll = () => {
      const container = enemiesGridRef.current;
      if (container.scrollTop + container.clientHeight >= container.scrollHeight - 50) {
        console.log('Reached the end of the scroll');
        // Aquí puedes cargar más enemigos si es necesario.
      }
    };

    const gridElement = enemiesGridRef.current;
    if (gridElement) {
      gridElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (gridElement) {
        gridElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="enemies-search-container">
      <div className="filters">
        <label>
          Type:
          <select name="type" onChange={handleFilterChange} value={filters.type}>
            <option value="">All</option>
            <option value="Elite Enemies">Elite Enemies</option>
            <option value="Common Enemies">Common Enemies</option>
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
      <div
        className="enemies-grid"
        ref={enemiesGridRef}
        style={{
          maxHeight: '400px',
          overflowY: 'auto',
        }}
      >
        {filteredEnemies.length === 0 && <div>No enemies found.</div>}
        {filteredEnemies.map((enemy) => (
          <div className="enemy-card" key={enemy.id}>
            <h3>{enemy.name}</h3>
            <img
              src={getImageUrl('enemies', enemy.id)}
              alt={enemy.name}
              className="enemy-image"
              onError={handleImageError}
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
