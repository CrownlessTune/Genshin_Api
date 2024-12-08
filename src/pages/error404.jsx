import React from 'react';
import { Link } from 'react-router-dom';
import LayoutPublic from '../layout/PublicLayout';
import PaimonConfuse from '../assets/img/Lumine_404.png';
import '../sass/pages/_Error.scss';

const Error404 = () => {
  return (
    <LayoutPublic>
      <div className="error-404">
        <h1>404</h1>
        <h2>Paimon says that this page is not found</h2>
        <img src={PaimonConfuse} alt="Paimon Confused" />
        <p>Traveler! Did we get lost again?</p>
        <Link to="/" className="back-home">Go Back Home</Link>
      </div>
    </LayoutPublic>
  );
};

export default Error404;
