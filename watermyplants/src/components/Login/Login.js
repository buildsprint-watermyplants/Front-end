import React, { useState } from 'react';
import { withFormik, Form, Field, Formik } from 'formik';
import axios from 'axios';
import * as Yup from "yup";

const Login = ({ errors, touched, values, status }) => {

  return (
    <div className="user-form-container">
      <header>
        <h1>Let's get savvy!</h1>
      </header>      
      <Form onSubmit={}>
        <Field
          className="input-fields"
          component="input"
          type="text"
          name="username"
          placeholder="Username"
        />
        <Field
          className="input-fields"
          component="input"
          type="password"
          name="password"
          placeholder="Password"
        />
        <button type="submit">Sign Up!</button>
      </Form>
    </div>
  )
}

const formikHOC = withFormik({
  mapPropsToValues({ username, password }) {
    return {
      username: username || "",
      password: password || ""
    }
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required('Not a good username!'),
    password: Yup.string().min(8).required('Must be longer than 8 characters!')
  }),
  handleSubmit(values, { setStatus, resetForm }) {
      console.log("submit");
  }
})

const FormFieldWithFormik = formikHOC(Login)

export default FormFieldWithFormik;