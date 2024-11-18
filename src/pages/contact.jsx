import React, { useState } from 'react';
import LayoutPublic from '../layout/PublicLayout';

function Contact() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [contactReason, setContactReason] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  // Functions to handle input changes
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleReasonChange = (e) => setContactReason(e.target.value);
  const handleMessageChange = (e) => setMessage(e.target.value);

  // Function to reset the form fields
  const handleReset = () => {
    setEmail('');
    setName('');
    setContactReason('');
    setMessage('');
    setErrors({});
  };

  // Form validation function
  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    // Validate name (shouldn't be empty)
    if (!name) {
      formErrors.name = 'Name is required';
      isValid = false;
    }

    // Validate email (should be in valid format)
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      formErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailPattern.test(email)) {
      formErrors.email = 'Invalid email format';
      isValid = false;
    }

    // Validate contact reason (should be selected)
    if (!contactReason) {
      formErrors.contactReason = 'Please select a reason for contact';
      isValid = false;
    }

    // Validate message (should be filled if contact reason is selected)
    if (contactReason && !message) {
      formErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  // Submit form function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Traveler! I think we completed this quest!');
    }
  };

  const mainStyle = {
    padding: '20px',
    minHeight: '400px',
    textAlign: 'center',
  };

  const formStyle = {
    display: 'inline-block',  // Align form to the left inside the container
    textAlign: 'left',        // Align form elements to the left
    margin: '0 auto',         // Center the form on the screen
    padding: '20px',
  };

  return (
    <LayoutPublic mainStyle={mainStyle}>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        {/* Name field */}
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Your name"
            required
          />
          {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
        </div>

        {/* Email field */}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Your email"
            required
          />
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        </div>

        {/* Contact reason selector */}
        <div>
          <label htmlFor="contactReason">Reason for contact:</label>
          <select
            id="contactReason"
            value={contactReason}
            onChange={handleReasonChange}
            required
          >
            <option value="">Select a reason</option>
            <option value="inquiry">General Inquiry</option>
            <option value="support">Support Request</option>
            <option value="feedback">Feedback</option>
          </select>
          {errors.contactReason && <span style={{ color: 'red' }}>{errors.contactReason}</span>}
        </div>

        {/* Message field, visible only if a contact reason is selected */}
        {contactReason && (
          <div>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              value={message}
              onChange={handleMessageChange}
              placeholder="Your message"
              required
              style={{ width: '100%', height: '100px' }}
            />
            {errors.message && <span style={{ color: 'red' }}>{errors.message}</span>}
          </div>
        )}

        {/* Buttons for submit and reset */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button type="submit" style={{ marginRight: '10px' }}>
            Submit
          </button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </LayoutPublic>
  );
}

export default Contact;
