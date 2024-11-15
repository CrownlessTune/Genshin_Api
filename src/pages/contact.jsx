import React from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    <div>
      <header>
        <Link to="/">Home</Link> 
      </header>
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h1>Contact</h1> 
      </div>
    </div>
  );
};

export default Contact;
