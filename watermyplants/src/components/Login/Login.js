import React, { useState } from 'react';
import { withFormik, Form, Field, Formik } from 'formik';
import { Link } from 'react-router-dom'
import { underline } from 'ansi-colors';

const Login = ({ errors, touched, values, status }) => {

  return (
    <div className="user-form-container">
      <header>
        <h1>Welcome Back    !</h1>
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
          <button type="submit">Login</button>
        </Form>
      )}
    />      
    <Link to="/createprofile" style={{color:"black", textDecoration:"none"}}>Don't have an account?</Link>
    </div>
  )
}

export default Login;