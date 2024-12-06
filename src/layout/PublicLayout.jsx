import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const PublicLayout = ({ children, mainStyle }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      boxSizing: 'border-box', // Esto asegura que padding y margen no afecten al tamaño total
    }}>
      <NavBar />
      <main
        style={{
          flex: 1,
          padding: '20px',
          textAlign: 'center',
          overflowY: 'auto', // Esto asegura que el contenido se desplace si es necesario sin afectar el tamaño del contenedor
          ...mainStyle,
        }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
