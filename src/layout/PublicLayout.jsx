import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../sass/layout/_PublicLayout.scss';

const PublicLayout = ({ children, mainStyle }) => {
  return (
    <section className="public-layout">
      <NavBar className="navbar" />
      <main style={mainStyle}>{children}</main>
      <Footer className="footer" />
    </section>
  );
};

export default PublicLayout;
