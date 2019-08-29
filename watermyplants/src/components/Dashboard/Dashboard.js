import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PlantDisplay from '../PlantDisplay/PlantDisplay';
import "./Dashboard.css"

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

  const logout = () => {
    localStorage.clear()
  }

  if (!userData) {
    return (
      <h1> We Are Retrieving your data from the sky </h1>
    )
  }

  return (
    <div class="dashboard">
      <header>
        <h1>Welcome {userData.username}!</h1>
        <div className="menuItems">
          <Link to={`/editprofile/${userData.id}`}><h2>Edit Profile</h2></Link>
          <h2>|</h2>
          <Link to="/login"><h2 onClick={logout}>Logout</h2></Link>
        </div>
      </header>

      <Link to="/createplant" className="addPlant"><button>+</button></Link>
      <PlantDisplay plants={userData.plants} />
    </div>
  )
}