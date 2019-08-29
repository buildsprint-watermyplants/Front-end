import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field, Formik } from 'formik';
import { Link } from 'react-router-dom'
import axios from "axios";
import PlantDisplay from '../PlantDisplay/PlantDisplay';

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


    if(!plant){
        return(
            <div>
                <h1>Loading plant...</h1>
            </div>
        )
    }



    return (
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
                        <Field
                            type="text"
                            className="input-fields"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.plantName}
                            name="plantName"
                            placeholder={plant.plantName}
                        />
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
    )
}

export default EditPlant;