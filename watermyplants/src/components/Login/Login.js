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
      <Formik
      initialValues={{ userName: '', password: '' }}
      onSubmit={(values, actions) => {
        console.log(values);
      }}
      render={props => (
        <Form onSubmit={props.handleSubmit}>
          <Field
            type="text"
            className="input-fields"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.userName}
            name="userName"
            placeholder="Username"
          />
          <Field
            type="password"
            className="input-fields"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.password}
            name="password"
            placeholder="Password"
          />
          {props.errors.name && <div id="feedback">{props.errors.name}</div>}
          <button type="submit">Submit</button>
        </Form>
      )}
    />      
    </div>
  )
}


export default Login;