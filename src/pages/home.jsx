import React from 'react';
import LayoutPublic from '../layout/PublicLayout';
import ApiPagination from '../components/ApiPagination';
import '../sass/pages/_Home.scss';  // Asegúrate de importar el archivo de estilos SCSS

function Home() {
  return (
    <LayoutPublic>
      <div className="home-page">
        <h1 className="title">Genshin Api</h1>
        <h2 className="subtitle">Welcome to Genshin Api</h2>
        <p className="description">
          Genshin Api is a website where you can visit all the information you need about your favourite characters or enemies you want to defeat.
          <br />
          Furthermore, you can create your own profile, design it your way, and create your own posts and comment on others' ones.
        </p>
        <ApiPagination />
      </div>
    </LayoutPublic>
  );
}

export default Home;
