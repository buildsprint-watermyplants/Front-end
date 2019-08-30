import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field, Formik } from 'formik';
import axios from "axios";
import "./EditComponents.css"

const EditProfile = (props) => {
    const [user, setUser] = useState();

    console.log(props.match.params.id);

    useEffect(() => {
        axios.get(`api/users/${props.match.params.id}`, {
            headers: {
                contentType: "application/JSON",
                authorization: localStorage.token
            }
        })
            .then(function (res) {
                console.log(res);
                setUser(res.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])


    if (!user) {
        return (
            <div>
                <h1>Loading Profile...</h1>
            </div>
        )
    }



    return (
        <div className="edit">
            <div className="user-form-container">
                <header>
                    <h1>Editing {user.name}</h1>
                </header>

                <Formik
                    initialValues={{ username: user.username, phoneNumber: user.phoneNumber }}

                    onSubmit={(values, actions) => {
                        console.log(values);
                        axios.put(`/api/users/${props.match.params.id}`, {
                            username: values.username,
                            password: user.password,
                            phoneNumber: values.phoneNumber
                        })
                            .then(function (response) {
                                console.log(response);
                                props.history.push("/");

                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }}

                    onReset={() => {
                        props.history.push("/");
                    }}

                    render={props => (
                        <Form onSubmit={props.handleSubmit}>
                            <h2>Username</h2>
                            <Field
                                type="text"
                                className="input-fields"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.username}
                                name="username"
                                placeholder={user.username}
                            />
                            <h2>Phone Number</h2>
                            <Field
                                type="text"
                                className="input-fields"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.phoneNumber}
                                name="phoneNumber"
                                placeholder={user.phoneNumber}
                            />
                            {props.errors.name && <div id="feedback">{props.errors.name}</div>}
                            <button type="submit">Save</button>
                            <button type="reset">Exit</button>
                        </Form>
                    )}
                />
            </div>
        </div>
    )
}

export default EditProfile;