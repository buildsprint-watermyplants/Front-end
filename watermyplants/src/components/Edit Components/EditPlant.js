import React, { useState, useEffect } from 'react';
import { Form, Field, Formik } from 'formik';
import axios from "axios";
import "./EditComponents.css"

const EditPlant = (props) => {
    const [plant, setPlant] = useState();

    console.log(props.match.params.id);

    useEffect(() => {
        axios.get(`api/plants/${props.match.params.id}`, {
            headers: {
                contentType: "application/JSON",
                authorization: localStorage.token
            }
        })
            .then(function (res) {
                console.log(res);
                setPlant(res.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])


    if (!plant) {
        return (
            <div>
                <h1>Loading plant...</h1>
            </div>
        )
    }



    return (
        <div className="edit">
            <div className="user-form-container">
                <header>
                    <h1>Editing {plant.plantName}</h1>
                </header>

                <Formik
                    initialValues={{ plantName: plant.plantName, waterTime: plant.dailyWaterTime }}

                    onSubmit={(values, actions) => {
                        console.log(values);
                        axios.put(`/api/plants/${props.match.params.id}`, {
                            plantName: values.plantName,
                            dailyWaterTime: values.waterTime
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
                            <h2>Plant Name</h2>
                            <Field
                                type="text"
                                className="input-fields"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.plantName}
                                name="plantName"
                                placeholder={plant.plantName}
                            />
                            <h2>Daily Water Time</h2>
                            <Field
                                type="text"
                                className="input-fields"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.waterTime}
                                name="waterTime"
                                placeholder={plant.dailyWaterTime}
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

export default EditPlant;