import React from 'react';
import ContactForm from '../components/ContactForm';
import PublicLayout from '../layout/PublicLayout';

const Contact = () => {
  const handleContactSubmit = (formData) => {
    console.log('Formulario enviado:', formData);

  };

  return (
    <PublicLayout>
      <h1>Contact</h1>
      <ContactForm submitContact={handleContactSubmit} />



    </PublicLayout>

  );
};

export default Contact;
