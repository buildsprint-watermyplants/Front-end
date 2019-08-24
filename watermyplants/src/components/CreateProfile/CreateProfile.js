import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as Yup from "yup";
import './CreateProfile.css';

const CreateProfile = ({ errors, touched, values, status }) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (status) {
      setUsers([...users, status]);
    }
  }, [status]);
  return (
    <div className="user-form-container">
      <header>
        <h1>Let's get savvy!</h1>
      </header>
      <Form>
        <Field
          className="input-fields"
          component="input"
          type="text"
          name="username"
          placeholder="Username"
        />
        {touched.username && errors.username && (
          <p>{errors.username}</p>
        )}
        <Field
          className="input-fields"
          component="input"
          type="text"
          name="phone"
          placeholder="Phone Number"
        />
        <Field
          className="input-fields"
          component="input"
          type="password"
          name="password"
          placeholder="Password"
        />
        {touched.password && errors.password && (
          <p>{errors.password}</p>
        )}
        <Field
          className="input-fields"
          component="input"
          type="password"
          name="password_confirmation"
          placeholder="Confirm Password"
        />
        {touched.password_confirmation && errors.password_confirmation && (
          <p>{errors.password_confirmation}</p>
        )}
        <button>Sign Up!</button>
      </Form>
      <Link to="/login" style={{ color: "black", textDecoration: "none" }}>Have an account? Login</Link>
    </div>
  )
}

const formikHOC = withFormik({
  mapPropsToValues({ username, password, password_confirmation, phone }) {
    return {
      username: username || "",
      phone: phone || "",
      password: password || "",
      password_confirmation: password_confirmation || ""
    }
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required('Not a good username!'),
    password: Yup.string().min(8).required('Must be longer than 8 characters!'),
    password_confirmation: Yup.string().min(8).required(`Password doesn't match!`)
  }),
  handleSubmit(values, { setStatus, resetForm }) {
    axios
      .post("https://bs-water-my-plants.herokuapp.com/api/auth/register", values)
      .then(res => {
        console.log("handleSubmit: then: res: ", res);
        setStatus(res.data);
        resetForm();
      })
      .catch(err => console.error("handleSubmit: catch: err: ", err));
  }
})

const FormFieldWithFormik = formikHOC(CreateProfile)

export default FormFieldWithFormik;