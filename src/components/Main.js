import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LivePage from '../pages/LivePage';
import AdvancedTopicExplorePage from '../pages/AdvancedTopicExplorer';

const Main = props => {

    return (
      <Switch>
          <Route exact path="/" component={LivePage}/>
          <Route exact path="/explore" component={AdvancedTopicExplorePage}/>
      </Switch>
    );

};

export default Main;