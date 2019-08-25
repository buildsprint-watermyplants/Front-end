import React, { useState, useEffect } from 'react';
import axios from 'axios';
import data from '../../dummyData';

export default function Dashboard() {

  const [userData, setUserData] = useState()

  useEffect(() => {
    axios.get(`https://bs-water-my-plants.herokuapp.com/api/users/${localStorage.id}`, {
      headers: {
        contentType: "application/JSON",
        authorization: localStorage.token
      }
    })
      .then(function (res) {
        console.log(res);
        setUserData(res.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [])

  if (!userData) {
    return (
      <h1> We Are Retrieving your data from the sky </h1>
    )
  }

  return (
    <div>
      <h1>Welcome {userData.username}!</h1>
    </div>
  )
}