import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {

  const [plants, setPlants] = useState([])
  useEffect(() => {
    axios
      .get('https://bs-water-my-plants.herokuapp.com/')
      .then(res => console.log(res))
  })
  return (
    <div>
    </div>
  )
}