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
    <div>
      <div className="user-form-container">
        <header>
          <h1 className="header-text">Let's get savvy!</h1>
        </header>
        <Form>
          <label>Username</label>
          <Field
            className="input-fields"
            component="input"
            type="text"
            name="username"
          />
          {touched.username && errors.username && (
            <p>{errors.username}</p>
          )}
          <label>Phone Number</label>
          <Field
            className="input-fields"
            component="input"
            type="text"
            name="phone"
          />
          <label>Password</label>
          <Field
            className="input-fields"
            component="input"
            type="password"
            name="password"
          />
          {touched.password && errors.password && (
            <p>{errors.password}</p>
          )}
          <label>Confirm password</label>
          <Field
            className="input-fields"
            component="input"
            type="password"
            name="password_confirmation"
          />
          {touched.password_confirmation && errors.password_confirmation && (
            <p>{errors.password_confirmation}</p>
          )}
          <button>Sign Up!</button>
        </Form>
        <Link to="/login" style={{ color: "black", textDecoration: "none", fontFamily: 'Courgette', fontSize: '16px' }}>Have an account? Login</Link>
      </div>
      <section className="quote-section">
        <h1 className="quotes-header">Inspiring Quotes</h1>
        <p className="text">"A garden requires patient labor and attention. Plants do not grow merely to satisfy ambitions or to fulfill good intentions. They thrive because someone expended effort on them."</p>
        <br/>
        <p className="text">-Liberty Hyde Bailey</p>
      </section>
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
  handleSubmit(values, { setStatus, resetForm, props }) {
    console.log(values)
    const neededInfo = {
      username: values.username,
      password: values.password,
      phoneNumber: values.phone
    }
    axios
      .post("/api/auth/register", neededInfo)
      .then(res => {
        console.log("handleSubmit: then: res: ", res.data);
        setStatus(res.data);
        resetForm();
        props.history.push('/login')
      })
      .catch(err => console.error("handleSubmit: catch: err: ", err));
  }
})

const FormFieldWithFormik = formikHOC(CreateProfile)

export default FormFieldWithFormik;