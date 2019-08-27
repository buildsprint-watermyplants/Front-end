import React, { useState, useEffect } from 'react';
import PlantCard from './PlantCard'
import { Card } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios';

export default function PlantDisplay(props) {
    const [plants, setPlants] = useState();

    useEffect(() => {
        axios.get(`/api/plants/`, {
          headers: {
            contentType: "application/JSON",
            authorization: localStorage.token
          }
        })
          .then(function (res) {
            console.log(res);
            setPlants(res.data);
          })
          .catch(function (error) {
            console.log(error);
          })
      }, [])

    if(!plants){
        return(
            <div>
                <h1>
                    Loading Plants...
                </h1>
            </div>
        )
    }
    return (
        <div>
            <hr />
            <Card.Group centered itemsPerRow={3} stackable>
                {
                    plants.map(element => <PlantCard plant={element} />)
                }
            </Card.Group>
        </div>
    )
}