import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SettingsPage from '../pages/SettingsPage';
import LivePage from '../pages/LivePage';

const Main = props => {

    return (
      <Switch>
          <Route exact path="/" component={LivePage}/>
          <Route exact path="/settings" component={SettingsPage}/>
      </Switch>
    );

};

export default Main;