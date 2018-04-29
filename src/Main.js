import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

/*
 Main.js
 Authored by Tom Blacknell

 Configure the rooting for the application
 Only one route, '/', that renders the dashboard
 */

const Main = props => {

    return (
      <Switch>
          <Route exact path="/" component={Dashboard}/>
      </Switch>
    );

};

export default Main;