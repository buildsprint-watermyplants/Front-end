import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as Yup from "yup";
import '../CreateProfile/CreateProfile.css';

const CreateProfile = ({ errors, touched, values, status }) => {
  const [plants, setPlants] = useState([])

  useEffect(() => {
    if (status) {
      setPlants([...plants, status]);
    }
  }, [status]);
  return (
    <div className="user-form-container">
      <header>
        <h1>Add a Plant!</h1>
      </header>
      <Form>
        <Link to="/">Back to Dashboard</Link>
        <Field
          className="input-fields"
          component="input"
          type="text"
          name="plantName"
          placeholder="Plant"
        />
        {touched.plantName && errors.plantName && (
          <p>{errors.plantName}</p>
        )}
        <Field
          className="input-fields"
          component="input"
          type="text"
          name="dailyWaterTime"
          placeholder="Water Time"
        />
        <button>Add Plant!</button>
      </Form>
      {plants.map(plant => (
        <p key={plant.id}>{plant.plantName}</p>
      ))}
    </div>
  )
}

const formikHOC = withFormik({
  mapPropsToValues({ plantName, dailyWaterTime }) {
    return {
      plantName: plantName || "",
      dailyWaterTime: dailyWaterTime || ""
    }
  },
  validationSchema: Yup.object().shape({
    plantName: Yup.string().required('You must enter a plant name!'),
    dailyWaterTime: Yup.string().min(8).required('Must be longer than 8 characters!')
  }),
  handleSubmit(values, { setStatus, resetForm, props }) {
    console.log(values)
    const plantInfo = {
      plantName: values.plantName,
      dailyWaterTime: values.dailyWaterTime
    }
    axios
      .post("/api/plants/", plantInfo)
      .then(res => {
        console.log("handleSubmit: then: res: ", res.data);
        setStatus(res.data);
        resetForm();
        props.history.push('/')
      })
      .catch(err => console.error("handleSubmit: catch: err: ", err));
  }
})

const FormFieldWithFormik = formikHOC(CreateProfile)

export default FormFieldWithFormik;