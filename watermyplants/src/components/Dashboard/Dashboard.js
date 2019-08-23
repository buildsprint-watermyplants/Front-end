import React, { useState, useEffect } from 'react';
import axios from 'axios';
import data from '../../dummyData';

export default function Dashboard() {

  // const [plants, setPlants] = useState([])
  return (
    <div>
      <p>{data.plants[0].plantName}</p>
    </div>
  )
}