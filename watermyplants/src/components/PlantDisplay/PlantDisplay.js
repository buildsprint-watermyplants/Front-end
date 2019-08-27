import React, { useState, useEffect } from 'react';
import PlantCard from './PlantCard'
import { Card } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

export default function PlantDisplay(props) {
    return (
        <div>
            <hr />
            <Card.Group centered itemsPerRow={3} stackable>
                {
                    props.plants.map(element => <PlantCard plant={element} />)
                }
            </Card.Group>
        </div>
    )
}