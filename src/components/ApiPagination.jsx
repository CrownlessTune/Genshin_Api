import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../sass/components/_ApiPagination.scss';

const ApiPagination = () => {
  const categories = [
    'artifacts',
    'boss',
    'characters',
    'consumables',
    'domains',
    'enemies',
    'materials',
    'weapons',
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const category = categories[currentCategoryIndex];
        const response = await axios.get(`https://genshin.jmp.blue/${category}/all?lang=en`);
        setData(response.data);
        setCurrentPage(1); // Reiniciar a la primera página al cambiar de categoría
      } catch (err) {
        setError(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentCategoryIndex]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextCategory = () => {
    if (currentCategoryIndex < categories.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
    }
  };

  const previousCategory = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1);
    }
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage * itemsPerPage >= data.length;

  const handlePrevious = () => {
    if (isFirstPage) {
      previousCategory();
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (isLastPage) {
      nextCategory();
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const getImageUrl = (item) => {
    // Si tiene hijos, usar la imagen del primer hijo
    if (item.children && item.children.length > 0) {
      return item.children[0].icon || 'https://via.placeholder.com/150';
    }
    // Si no tiene hijos, usar su propia imagen
    return item.icon || 'https://via.placeholder.com/150';
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="api-pagination">
      <h1>{categories[currentCategoryIndex].toUpperCase()}</h1>

      <div className="item-list">
        {currentItems.length === 0 && <div>No items to display.</div>}
        {currentItems.map((item, index) => (
          <div className="card" key={index}>
            <img
              src={getImageUrl(item)}
              alt={item.name || 'Unnamed'}
              className="card-image"
            />
            <h3 className="card-title">{item.name || item.id}</h3>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={handlePrevious}
          disabled={isFirstPage && currentCategoryIndex === 0}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(data.length / itemsPerPage)}
        </span>
        <button
          onClick={handleNext}
          disabled={isLastPage && currentCategoryIndex === categories.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ApiPagination;
