import React from 'react';
import { Link } from 'react-router-dom';
import '../sass/components/_footer.scss'; // Importa el estilo del footer

const Footer = () => {
  return (
    <footer>
      <Link to="/contact">Contact</Link>
    </footer>
  );
};

export default Footer;
