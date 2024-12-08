import React from 'react';
import Swal from 'sweetalert2';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../sass/components/_ContactForm.scss';

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

  return (
    <div className="contact-form-container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="contact-form">
            <div className="form-group">
              <Field
                name="name"
                type="text"
                className="input-field"
                placeholder="Enter your name"
              />
              <ErrorMessage name="name" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <Field
                name="email"
                type="email"
                className="input-field"
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <Field name="reason" as="select" className="input-field">
                <option value="">Select a reason</option>
                <option value="support">Technical Support</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
              </Field>
              <ErrorMessage name="reason" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <Field
                name="message"
                as="textarea"
                className="input-field textarea-field"
                placeholder="Write your opinion"
              />
              <ErrorMessage name="message" component="div" className="error-message" />
            </div>

            <div className="form-group rating-group">
              <label>Rate the Page (1-5):</label>
              <Field
                name="rating"
                type="number"
                min="1"
                max="5"
                className="input-field"
              />
              <ErrorMessage name="rating" component="div" className="error-message" />
            </div>

            <button
              className="submit-button"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;
