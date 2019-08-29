import React, { useState } from 'react';
import { Form, Field, Formik } from 'formik';
import { Link } from 'react-router-dom'
import axios from "axios";
import "./login.css"

const Login = (props) => {

  return (
    <div className="Login">
      <div className="user-form-container">
        <header>
          <h1>Welcome Back!</h1>
        </header>

        <Formik
          initialValues={{ userName: '', password: '' }}

          onSubmit={(values, actions) => {
            console.log(values);
            axios.post('/api/auth/login', {
              username: values.userName,
              password: values.password
            })
              .then(function (response) {
                console.log(response);
                localStorage.setItem("id", response.data.user.id);
                localStorage.setItem("token", response.data.token);
                props.history.push("/");

              })
              .catch(function (error) {
                console.log(error);
              });
          }}

          render={props => (
            <Form onSubmit={props.handleSubmit}>
              <h2>Username</h2>
              <Field
                type="text"
                className="input-fields"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.userName}
                name="userName"
                placeholder=""
              />
              <h2>Password</h2>
              <Field
                type="password"
                className="input-fields"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.password}
                name="password"
                placeholder=""
              />
              {props.errors.name && <div id="feedback">{props.errors.name}</div>}
              <button type="submit">Login</button>
            </Form>
          )}
        />
        <Link to="/createprofile" style={{ color: "black", textDecoration: "none" }}>Don't have an account?</Link>
      </div>
    </div>
  )
}

export default Login;