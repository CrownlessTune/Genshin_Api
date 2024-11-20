import React, { useState } from 'react';
import Swal from 'sweetalert2';

const ContactForm = ({ submitContact }) => {
  const initialState = {
    name: '',
    email: '',
    reason: '',
    message: '',
    rating: 3,
  };

  const [formData, setFormData] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, reason, message, rating } = formData;

    if (!name.trim()) {
      Swal.fire({
        title: 'Error',
        text: 'Name is required.',
        icon: 'error',
      });
      e.target[0].focus();
      return;
    }

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      Swal.fire({
        title: 'Error',
        text: 'A valid email is required.',
        icon: 'error',
      });
      e.target[1].focus();
      return;
    }

    if (!reason.trim()) {
      Swal.fire({
        title: 'Error',
        text: 'Please select a reason to contact.',
        icon: 'error',
      });
      e.target[2].focus();
      return;
    }

    if (!message.trim()) {
      Swal.fire({
        title: 'Error',
        text: 'The opinion field is required.',
        icon: 'error',
      });
      e.target[3].focus();
      return;
    }

    Swal.fire({
      title: 'Success',
      text: 'Form submitted successfully.',
      icon: 'success',
    });

    submitContact({ name, email, reason, message, rating });
    setFormData(initialState);
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseInt(value) : value,
    });
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '15px',
    maxWidth: '400px',
    margin: '0 auto',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          name="name"
          type="text"
          style={inputStyle}
          placeholder="Enter your name"
          onChange={handleChange}
          value={formData.name}
        />
        <input
          name="email"
          type="email"
          style={inputStyle}
          placeholder="Enter your email"
          onChange={handleChange}
          value={formData.email}
        />
        <select
          name="reason"
          style={inputStyle}
          onChange={handleChange}
          value={formData.reason}
        >
          <option value="">Select a reason</option>
          <option value="support">Technical Support</option>
          <option value="feedback">Feedback</option>
          <option value="other">Other</option>
        </select>
        {formData.reason && (
          <textarea
            name="message"
            style={inputStyle}
            placeholder="Write your opinion"
            onChange={handleChange}
            value={formData.message}
          />
        )}
        <div>
          <label>Rate the Page (1-5):</label>
          <input
            name="rating"
            type="number"
            min="1"
            max="5"
            style={inputStyle}
            onChange={handleChange}
            value={formData.rating}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
