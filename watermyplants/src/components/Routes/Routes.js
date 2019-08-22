import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import CreateProfile from '../CreateProfile/CreateProfile';

export default function Routes() {
  return (
    <div>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/createprofile" component={CreateProfile} />
    </div>
  )
}
