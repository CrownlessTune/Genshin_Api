import React, { Suspense } from 'react';
import PublicLayout from '../layout/PublicLayout'; 


const CharacterSearch = React.lazy(() => import('../components/CharacterSearch'));

const Characters = () => {
  return (
    <PublicLayout>
      <Suspense fallback={<div>Loading character search...</div>}>
        <CharacterSearch />
      </Suspense>
    </PublicLayout>
  );
};

export default Characters;
