import React from 'react';
import Swal from 'sweetalert2';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ContactForm = ({ submitContact }) => {
  const initialValues = {
    name: '',
    email: '',
    reason: '',
    message: '',
    rating: 3,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required.'),
    email: Yup.string().email('Invalid email address.').required('Email is required.'),
    reason: Yup.string().required('Please select a reason to contact.'),
    message: Yup.string().required('The opinion field is required.'),
    rating: Yup.number()
      .min(1, 'Rating must be at least 1.')
      .max(5, 'Rating cannot exceed 5.')
      .required('Rating is required.'),
  });

  const handleSubmit = (values, { resetForm }) => {
    Swal.fire({
      title: 'Success',
      text: 'Form submitted successfully.',
      icon: 'success',
    });

    submitContact(values);
    resetForm();
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
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form style={formStyle}>
            <div>
              <Field
                name="name"
                type="text"
                style={inputStyle}
                placeholder="Enter your name"
              />
              <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <Field
                name="email"
                type="email"
                style={inputStyle}
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <Field
                name="reason"
                as="select"
                style={inputStyle}
              >
                <option value="">Select a reason</option>
                <option value="support">Technical Support</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
              </Field>
              <ErrorMessage name="reason" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <Field
                name="message"
                as="textarea"
                style={inputStyle}
                placeholder="Write your opinion"
              />
              <ErrorMessage name="message" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <label>Rate the Page (1-5):</label>
              <Field
                name="rating"
                type="number"
                min="1"
                max="5"
                style={inputStyle}
              />
              <ErrorMessage name="rating" component="div" style={{ color: 'red' }} />
            </div>

            <button
              className="btn btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;
