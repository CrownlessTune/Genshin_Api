import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PaimonConfuse from '../assets/img/Paimon_Confuse.png'; // Importar imagen personalizada
import '../sass/components/_ApiPagination.scss';

const ApiPagination = () => {
  const [bossesData, setBossesData] = useState([]);
  const [artifactsData, setArtifactsData] = useState([]);
  const [charactersData, setCharactersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [imageUrls, setImageUrls] = useState({});
  const fallbackImage = PaimonConfuse;

  const fetchData = async () => {
    try {
      setLoading(true);
      const [bossesRes, artifactsRes, charactersRes] = await Promise.all([
        axios.get('https://genshin.jmp.blue/boss/weekly-boss/all?lang=en'),
        axios.get('https://genshin.jmp.blue/artifacts/all?lang=en'),
        axios.get('https://genshin.jmp.blue/characters/all?lang=en'),
      ]);

      setBossesData(
        bossesRes.data.map((boss) => ({
          id: boss.name,
          name: boss.name,
          portrait: `https://genshin.jmp.blue/boss/weekly-boss/${boss.name.replace(/ /g, '-').toLowerCase()}/portrait`,
        }))
      );

      setArtifactsData(
        artifactsRes.data.map((artifact) => ({
          id: artifact.id,
          name: artifact.name,
          portrait: `https://genshin.jmp.blue/artifacts/${artifact.id}/circlet-of-logos`,
        }))
      );

      setCharactersData(
        charactersRes.data.map((character) => ({
          id: character.id,
          name: character.name,
          portrait: `https://genshin.jmp.blue/characters/${character.id}/card`,
        }))
      );
    } catch (err) {
      setError(`Error fetching data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (item) => {
    if (imageUrls[item.id]) return imageUrls[item.id];

    const imageUrl = item.portrait || fallbackImage;

    const img = new Image();
    img.onload = () => {
      setImageUrls((prevState) => ({ ...prevState, [item.id]: imageUrl }));
      localStorage.setItem(item.id, imageUrl);
    };
    img.onerror = () => {
      setImageUrls((prevState) => ({ ...prevState, [item.id]: fallbackImage }));
      localStorage.setItem(item.id, fallbackImage);
    };
    img.src = imageUrl;

    return imageUrl;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = [...bossesData, ...artifactsData, ...charactersData].slice(indexOfFirstItem, indexOfLastItem);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage * itemsPerPage >= [...bossesData, ...artifactsData, ...charactersData].length;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="api-pagination">
      <h1>Bosses, Artifacts & Characters</h1>

      <div className="item-list">
        {currentItems.length === 0 && <div>No items to display.</div>}
        {currentItems.map((item) => (
          <div className="card" key={item.id}>
            <img
              src={getImageUrl(item)}
              alt={item.name || 'Unnamed'}
              className="card-image"
            />
            <h3 className="card-title">{item.name}</h3>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => setCurrentPage((prev) => prev - 1)} disabled={isFirstPage}>
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil([...bossesData, ...artifactsData, ...charactersData].length / itemsPerPage)}
        </span>
        <button onClick={() => setCurrentPage((prev) => prev + 1)} disabled={isLastPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ApiPagination;