import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApiPagination = () => {
  const categories = [
    'artifacts', 'boss', 'characters', 'consumables', 'domains', 
    'enemies', 'materials', 'weapons'
  ]; // Lista de categorías disponibles
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0); // Para mantener el índice de la categoría actual
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const category = categories[currentCategoryIndex];
        const response = await axios.get(`https://genshin.jmp.blue/${category}/all?lang=en`);
        console.log('API response:', response.data);
        setData(response.data); // Suponiendo que la respuesta es un arreglo de los elementos
      } catch (err) {
        setError(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentCategoryIndex]); // Cambiar los datos cuando el índice de categoría cambie

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Cambiar la categoría
  const nextCategory = () => {
    if (currentCategoryIndex < categories.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
      setCurrentPage(1); // Reiniciar la página cuando cambiamos de categoría
    }
  };

  const previousCategory = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1);
      setCurrentPage(1); // Reiniciar la página cuando cambiamos de categoría
    }
  };

  // Determinar si estamos en la primera o última página
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage * itemsPerPage >= data.length;

  // Funciones para cambiar entre categorías solo cuando estamos en la primera o última página
  const handlePrevious = () => {
    if (isFirstPage) {
      previousCategory();
    } else {
      setCurrentPage(currentPage - 1); // Paginación normal
    }
  };

  const handleNext = () => {
    if (isLastPage) {
      nextCategory();
    } else {
      setCurrentPage(currentPage + 1); // Paginación normal
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>API Pagination</h1>
      
      {/* Mostrar los elementos */}
      <div>
        <ul>
          {currentItems.map((item, index) => (
            <li key={index}>
              {/* Mostrar un nombre genérico por ahora */}
              <h3>{item.name || item.id}</h3>
            </li>
          ))}
        </ul>

        {/* Paginación */}
        <div>
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1 && currentCategoryIndex === 0}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage * itemsPerPage >= data.length && currentCategoryIndex === categories.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiPagination;
