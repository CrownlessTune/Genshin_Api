// src/pages/Home.jsx
import React from 'react';
import LayoutPublic from '../layout/layoutPublic';

function Home() {
  const mainStyle = {
    padding: '20px',
    minHeight: '400px',
    textAlign: 'center',
  };

  return (
    <LayoutPublic mainStyle={mainStyle}>
      <h1>Genshin Api</h1>
      <h2>Welcome to Genshin Api</h2>
      <p>
        Genshin Api is a website where you can visit all the information you need about your favourite characters or enemies you want to defeat.
        <br />
        Furthermore, you can create your own profile, design it your way, and create your own posts and comment on others' ones.
      </p>
    </LayoutPublic>
  );
}

export default Home;
