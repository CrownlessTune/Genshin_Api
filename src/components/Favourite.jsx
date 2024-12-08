import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { collection, getDocs, setDoc, doc, deleteDoc } from 'firebase/firestore';
import PaimonConfuse from '../assets/img/Paimon_Confuse.png'; // Imagen personalizada
import { auth, db } from '../config/firebase';
import '../sass/components/_Favourite.scss';

const Favourite = () => {
  const [bossesData, setBossesData] = useState([]);
  const [artifactsData, setArtifactsData] = useState([]);
  const [charactersData, setCharactersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [favorites, setFavorites] = useState([]); // Estado para los favoritos
  const [imageUrls, setImageUrls] = useState({});
  const [showModal, setShowModal] = useState(false); // Estado para controlar la ventana modal
  const fallbackImage = PaimonConfuse;

  // Obtener el UID del usuario logueado
  const userId = auth.currentUser ? auth.currentUser.uid : null;

  // Fetch data de la API
  const fetchData = async () => {
    try {
      setLoading(true);
      console.log('Fetching data...');
      const [bossesRes, artifactsRes, charactersRes] = await Promise.all([
        axios.get('https://genshin.jmp.blue/boss/weekly-boss/all?lang=en'),
        axios.get('https://genshin.jmp.blue/artifacts/all?lang=en'),
        axios.get('https://genshin.jmp.blue/characters/all?lang=en'),
      ]);
      
      console.log('Fetched bosses:', bossesRes.data);
      console.log('Fetched artifacts:', artifactsRes.data);
      console.log('Fetched characters:', charactersRes.data);

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
      console.error('Error fetching data:', err);
      setError(`Error fetching data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Obtener la URL de la imagen
  const getImageUrl = (item) => {
    if (imageUrls[item.id]) {
      console.log(`Image URL for ${item.id} already loaded.`);
      return imageUrls[item.id];
    }

    const imageUrl = item.portrait || fallbackImage;
    console.log(`Loading image for ${item.id} from ${imageUrl}`);

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

  // Obtener los favoritos desde Firestore
  const fetchFavorites = async () => {
    if (!userId) return; // Asegúrate de que el usuario está logueado

    try {
      console.log('Fetching favorites from Firestore...');
      const querySnapshot = await getDocs(collection(db, 'favorites', userId, 'items')); // Usamos la colección personalizada por usuario
      const favoritesData = [];
      querySnapshot.forEach((doc) => {
        const fav = doc.data();
        favoritesData.push({
          id: doc.id, // Asegúrate de obtener el ID del documento
          ...fav, // Otros datos como name, portrait, etc.
        });
      });
      console.log('Favorites fetched:', favoritesData);
      setFavorites(favoritesData);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setError('Error fetching favorites');
    }
  };

  // Guardar un favorito en Firestore
  const saveFavorite = async (item) => {
    if (!userId) return; // Asegúrate de que el usuario está logueado

    try {
      console.log(`Saving favorite: ${item.id}`);
      await setDoc(doc(db, 'favorites', userId, 'items', item.id), item); // Usamos ID del ítem dentro de la colección del usuario
      setFavorites((prevFavorites) => [...prevFavorites, item]);
    } catch (error) {
      console.error('Error saving favorite:', error);
      setError('Error saving favorite');
    }
  };

  // Eliminar un favorito de Firestore
  const removeFavorite = async (item) => {
    if (!userId) return; // Asegúrate de que el usuario está logueado

    try {
      console.log(`Removing favorite: ${item.id}`);
      await deleteDoc(doc(db, 'favorites', userId, 'items', item.id)); // Usamos ID del ítem dentro de la colección del usuario
      setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== item.id));
    } catch (error) {
      console.error('Error removing favorite:', error);
      setError('Error removing favorite');
    }
  };

  useEffect(() => {
    if (userId) {
      fetchData();
      fetchFavorites(); // Obtener los favoritos del usuario al cargar el componente
    }
  }, [userId]);

  // Lógica de paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = [...bossesData, ...artifactsData, ...charactersData].slice(indexOfFirstItem, indexOfLastItem);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage * itemsPerPage >= [...bossesData, ...artifactsData, ...charactersData].length;

  const addToFavorites = (item) => {
    console.log(`Adding/removing from favorites: ${item.id}`);
    const isFavorite = favorites.some((fav) => fav.id === item.id);

    if (isFavorite) {
      removeFavorite(item);
    } else {
      saveFavorite(item);
    }
  };

  // Mostrar la ventana modal con la paginación y los favoritos
  const handleEditFavorites = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="api-pagination">
      <div className="favorites-list">
        <h2>Favorites</h2>
        {favorites.map((fav) => (
          <div key={fav.id} className="favorite-card">
            <img src={getImageUrl(fav)} alt={fav.name || 'Unnamed'} className="favorite-image" />
            <p>{fav.name}</p>
          </div>
        ))}
      </div>

      {/* Botón para editar favoritos */}
      <button onClick={handleEditFavorites} className="edit-favorites-btn">Edit Favorites</button>

      {/* Mostrar ventana modal con ítems y paginación */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Items</h2>
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
                  <button onClick={() => addToFavorites(item)} className="add-to-fav-btn">
                    Add to Fav
                  </button>
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

            <button onClick={closeModal} className="close-modal-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favourite;
