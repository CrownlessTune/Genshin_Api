import React from "react";
import Swal from "sweetalert2";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../sass/components/_RegisterForm.scss"

const RegisterForm = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const { email, password } = values;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      Swal.fire({
        title: "Success",
        text: "User registered successfully.",
        icon: "success",
      });
      console.log("Registered user:", userCredential.user);
      resetForm();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="register-form">
          <div className="form-group">
            <Field
              name="username"
              type="text"
              placeholder="Enter your username"
              className="input-field"
            />
            <ErrorMessage name="username" component="div" className="error-message" />
          </div>
          <div className="form-group">
            <Field
              name="email"
              type="email"
              placeholder="Enter your email"
              className="input-field"
            />
            <ErrorMessage name="email" component="div" className="error-message" />
          </div>
          <div className="form-group">
            <Field
              name="password"
              type="password"
              placeholder="Enter your password"
              className="input-field"
            />
            <ErrorMessage name="password" component="div" className="error-message" />
          </div>
          <div className="form-group">
            <Field
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              className="input-field"
            />
            <ErrorMessage name="confirmPassword" component="div" className="error-message" />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`submit-button ${isSubmitting ? "disabled" : ""}`}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
