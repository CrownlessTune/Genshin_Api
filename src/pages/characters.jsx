import React, { useState } from 'react';
import CharacterList from '../components/characterlist';
import CharacterDetail from '../components/CharacterDetail';

const Characters = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  return (
    <div>
      {!selectedCharacter ? (
        <CharacterList />
      ) : (
        <CharacterDetail characterName={selectedCharacter} />
      )}
    </div>
  );
};

export default Characters;
