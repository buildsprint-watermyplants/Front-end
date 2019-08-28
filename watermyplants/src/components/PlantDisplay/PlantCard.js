import React, { useState, useEffect } from 'react';
import { Card, CardContent, Image } from "semantic-ui-react"
import 'semantic-ui-css/semantic.min.css'
import { Link } from 'react-router-dom'

export default function PlantDisplay(props) {

    if (props.plant.plant_avatar_id) {
        return (
            <Card>
                <Image size="small" src={props.plant.plant_avatar_id} centered wrapped ui={false} />
                <Card.Content>
                    <Card.Header>
                        {props.plant.plantName}
                    </Card.Header>
                    <Card.Meta>
                        {props.plant.dailyWaterTime}
                    </Card.Meta>
                </Card.Content>
            </Card>
        )
    }
    return (
        <Card>
            <Image size="small" src="https://react.semantic-ui.com/images/wireframe/image.png" centered ui={false} wrapped />
            <Card.Content>
                <Card.Header>
                    {props.plant.plantName}
                </Card.Header>
                <Card.Meta>
                    {props.plant.dailyWaterTime}
                </Card.Meta>
                <Card.Meta>
                    <Link to={`/editplant/${props.plant.id}`}>Edit</Link>
                </Card.Meta>
            </Card.Content>
        </Card >
    )
}