import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "semantic-ui-react"
import 'semantic-ui-css/semantic.min.css'

export default function PlantDisplay(props) {
    return (
            <Card>
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