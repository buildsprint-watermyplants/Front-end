import React, { useState } from 'react';
import { withFormik, Form, Field } from 'formik';
import axios from 'axios';
import * as Yup from "yup";
import './CreateProfile.css';

const CreateProfile = ({ errors, touched, values, status }) => {
  const [users, setUsers] = useState([])
  return (
    <div className="user-form-container">
      <header>
        <h1>Register to Monitor Your Plants!</h1>
      </header>
      <Form>
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
        <Field
          className="input-fields"
          component="input"
          type="text"
          name="phone"
          placeholder="Phone Number"
        />
        <button>Create Account!</button>
      </Form>
    </div>
  )
}

const formikHOC = withFormik({
  mapPropsToValues({ username, password, phone }) {
    return {
      username: username || "",
      password: password || "",
      phone: phone || ""
    }
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required('Not a good username!'),
    password: Yup.string().min(8).required('Must be longer than 8 characters!')
  }),
  handleSubmit(values, { setStatus, resetForm }) {
    axios
      .post("https://reqres.in/api/users", values)
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