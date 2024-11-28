import React, { Suspense } from 'react';
import PublicLayout from '../layout/PublicLayout'; // Importa el layout público

// Usamos React.lazy() para cargar CharacterSearch de manera diferida
const CharacterSearch = React.lazy(() => import('../components/CharacterSearch'));

const Characters = () => {
  return (
    <PublicLayout>
      {/* Suspense maneja el estado de carga mientras se carga CharacterSearch */}
      <Suspense fallback={<div>Loading character search...</div>}>
        <CharacterSearch />
      </Suspense>
    </PublicLayout>
  );
};

export default Characters;
