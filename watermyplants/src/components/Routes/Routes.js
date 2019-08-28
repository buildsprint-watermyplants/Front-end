import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import CreateProfile from '../CreateProfile/CreateProfile';
import Login from '../Login/Login'
import PrivateRoute from './PrivateRoute'
import CreatePlants from '../Plants/CreatePlants';
import EditPlant from "../Edit Components/EditPlant"


// protected comopnents will be used with PrivateRoute. You can look at what the code is doing later.
export default function Routes(props) {
  return (
    <div>
      {/* <Route exact path="/" component={Dashboard} /> */}
      <PrivateRoute exact path="/" component={Dashboard} />
      <Route exact path="/createprofile" component={CreateProfile} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/createplant" component={CreatePlants} />
      <Route exact path="/editplant/:id" component={EditPlant}/>
    </div>
  )
}
