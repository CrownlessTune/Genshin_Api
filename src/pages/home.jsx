import React from 'react';
import LayoutPublic from '../layout/PublicLayout';

function Home() {
  const mainStyle = {
    padding: '40px', 
    minHeight: '600px', 
    textAlign: 'center',
  };

  return (
    <LayoutPublic mainStyle={mainStyle}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>Genshin Api</h1> 
      <h2 style={{ fontSize: '32px', marginBottom: '15px' }}>Welcome to Genshin Api</h2> 
      <p style={{ fontSize: '18px', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto' }}>
        Genshin Api is a website where you can visit all the information you need about your favourite characters or enemies you want to defeat.
        <br />
        Furthermore, you can create your own profile, design it your way, and create your own posts and comment on others' ones.
      </p>
    </LayoutPublic>
  );
}

export default Home;
