import React, { useState, useEffect } from 'react';
import axios from 'axios';
import data from '../../dummyData';

export default function Dashboard() {

  const [plants, setPlants] = useState([])
  useEffect(() => {
    axios
    // check index.js, with axios.defaults you dont have to type the main address anymore; just the endpoints. You can do something like this: axios.get('/login')
      .get('')
      .then(res => console.log(res))
  })
  return (
    <div>
      <p>{data.plants[0].plantName}</p>
    </div>
  )
}