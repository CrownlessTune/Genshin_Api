import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../sass/components/_ApiPagination.scss';

const ApiPagination = () => {
  const [bossesData, setBossesData] = useState([]);
  const [artifactsData, setArtifactsData] = useState([]);
  const [charactersData, setCharactersData] = useState([]);
  const [loadingBosses, setLoadingBosses] = useState(true);
  const [loadingArtifacts, setLoadingArtifacts] = useState(true);
  const [loadingCharacters, setLoadingCharacters] = useState(true);
  const [errorBosses, setErrorBosses] = useState(null);
  const [errorArtifacts, setErrorArtifacts] = useState(null);
  const [errorCharacters, setErrorCharacters] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [imageUrls, setImageUrls] = useState({});

  const fetchBosses = async () => {
    try {
      setLoadingBosses(true);
      const response = await axios.get('https://genshin.jmp.blue/boss/weekly-boss/all?lang=en');
      const bosses = response.data.map(boss => ({
        name: boss.name,
        portrait: `https://genshin.jmp.blue/boss/weekly-boss/${boss.name.replace(/ /g, '-').toLowerCase()}/portrait`,
      }));
      setBossesData(bosses);
    } catch (err) {
      setErrorBosses(`Error fetching bosses: ${err.message}`);
    } finally {
      setLoadingBosses(false);
    }
  };

  const fetchArtifacts = async () => {
    try {
      setLoadingArtifacts(true);
      const response = await axios.get('https://genshin.jmp.blue/artifacts/all?lang=en');
      const artifacts = response.data.map(artifact => ({
        id: artifact.id,
        name: artifact.name,
        portrait: `https://genshin.jmp.blue/artifacts/${artifact.id}/circlet-of-logos`, // Usamos el ID en lugar del nombre
      }));
      setArtifactsData(artifacts);
    } catch (err) {
      setErrorArtifacts(`Error fetching artifacts: ${err.message}`);
    } finally {
      setLoadingArtifacts(false);
    }
  };

  const fetchCharacters = async () => {
    try {
      setLoadingCharacters(true);
      const response = await axios.get('https://genshin.jmp.blue/characters/all?lang=en');
      setCharactersData(response.data);
    } catch (err) {
      setErrorCharacters(`Error fetching characters: ${err.message}`);
    } finally {
      setLoadingCharacters(false);
    }
  };

  const getImageUrlChar = (item) => {
    if (item.portrait) {
      return item.portrait;
    }

    const cachedImageUrl = localStorage.getItem(`character_${item.id}`);
    if (cachedImageUrl) {
      return cachedImageUrl;
    }

    const imageUrl = `https://genshin.jmp.blue/characters/${item.id}/card`;

    const img = new Image();
    img.onload = () => {
      localStorage.setItem(`character_${item.id}`, imageUrl);
      setImageUrls((prevState) => ({
        ...prevState,
        [item.id]: imageUrl,
      }));
    };
    img.onerror = () => {
      const fallbackImageUrl = 'https://genshin.jmp.blue/assets/images/empty-card.png';
      localStorage.setItem(`character_${item.id}`, fallbackImageUrl);
      setImageUrls((prevState) => ({
        ...prevState,
        [item.id]: fallbackImageUrl,
      }));
    };
    img.src = imageUrl;

    return imageUrl;
  };

  const getImageUrlBoss = (item) => {
    if (item.portrait) {
      return item.portrait;
    }

    const cachedImageUrl = localStorage.getItem(`boss_${item.name}`);
    if (cachedImageUrl) {
      return cachedImageUrl;
    }

    const imageUrl = `https://genshin.jmp.blue/boss/weekly-boss/${item.name.replace(/ /g, '-').toLowerCase()}/portrait`;

    const img = new Image();
    img.onload = () => {
      localStorage.setItem(`boss_${item.name}`, imageUrl);
      setImageUrls((prevState) => ({
        ...prevState,
        [item.name]: imageUrl,
      }));
    };
    img.onerror = () => {
      const fallbackImageUrl = 'https://genshin.jmp.blue/assets/images/empty-card.png';
      localStorage.setItem(`boss_${item.name}`, fallbackImageUrl);
      setImageUrls((prevState) => ({
        ...prevState,
        [item.name]: fallbackImageUrl,
      }));
    };
    img.src = imageUrl;

    return imageUrl;
  };

  const getImageUrlArtifact = (item) => {
    if (item.portrait) {
      return item.portrait;
    }
  
    const cachedImageUrl = localStorage.getItem(`artifact_${item.id}`);
    if (cachedImageUrl) {
      return cachedImageUrl;
    }
  
    // Mapeamos nombres especiales a sus IDs correctos
    const artifactIdMapping = {
      'Sacrifieur to the Firmament': 'prayers-to-the-firmament', // Mapeamos el nombre especial a su id correcto
      // Puedes añadir más excepciones aquí si es necesario
    };
  
    const artifactId = artifactIdMapping[item.name] || item.id; // Usamos el ID mapeado o el ID original
  
    const imageUrl = `https://genshin.jmp.blue/artifacts/${artifactId}/circlet-of-logos`;
  
    const img = new Image();
    img.onload = () => {
      localStorage.setItem(`artifact_${item.id}`, imageUrl);
      setImageUrls((prevState) => ({
        ...prevState,
        [item.id]: imageUrl,
      }));
    };
    img.onerror = () => {
      const fallbackImageUrl = 'https://genshin.jmp.blue/assets/images/empty-card.png';
      localStorage.setItem(`artifact_${item.id}`, fallbackImageUrl);
      setImageUrls((prevState) => ({
        ...prevState,
        [item.id]: fallbackImageUrl,
      }));
    };
    img.src = imageUrl;
  
    return imageUrl;
  };
  

  useEffect(() => {
    fetchBosses();
    fetchArtifacts();
    fetchCharacters();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = [...bossesData, ...artifactsData, ...charactersData].slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage * itemsPerPage >= [...bossesData, ...artifactsData, ...charactersData].length;

  const handlePrevious = () => {
    if (isFirstPage) return;
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (isLastPage) return;
    setCurrentPage(currentPage + 1);
  };

  if (loadingBosses || loadingArtifacts || loadingCharacters) return <div>Loading...</div>;
  if (errorBosses) return <div>{errorBosses}</div>;
  if (errorArtifacts) return <div>{errorArtifacts}</div>;
  if (errorCharacters) return <div>{errorCharacters}</div>;

  return (
    <div className="api-pagination">
      <h1>Bosses, Artifacts & Characters</h1>

      <div className="item-list">
        {currentItems.length === 0 && <div>No items to display.</div>}
        {currentItems.map((item, index) => (
          <div className="card" key={index}>
            <img
              src={
                item.portrait ? item.portrait :
                item.name && bossesData.some(boss => boss.name === item.name) ?
                  getImageUrlBoss(item) :
                item.name && artifactsData.some(artifact => artifact.id === item.id) ?
                  getImageUrlArtifact(item) :
                  getImageUrlChar(item)
              }
              alt={item.name || 'Unnamed'}
              className="card-image"
            />
            <h3 className="card-title">{item.name}</h3>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={handlePrevious} disabled={isFirstPage}>
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil([...bossesData, ...artifactsData, ...charactersData].length / itemsPerPage)}
        </span>
        <button onClick={handleNext} disabled={isLastPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ApiPagination;
