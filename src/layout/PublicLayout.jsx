import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const PublicLayout = ({ children, mainStyle }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      boxSizing: 'border-box', // Asegura que padding y margen no afecten al tamaño total
      width: '100%', // Asegura que el layout no sea más grande que el 100% de la pantalla
      overflowX: 'hidden', // Previene el desbordamiento horizontal
    }}>
      <NavBar />
      <main
        style={{
          flex: 1,
          padding: '20px',
          textAlign: 'center',
          overflowY: 'auto', // Asegura que el contenido se desplace si es necesario sin afectar el tamaño del contenedor
          maxWidth: '100%', // Asegura que el contenido no exceda el ancho de la página
          width: '100%', // Asegura que el main ocupe todo el ancho disponible
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
