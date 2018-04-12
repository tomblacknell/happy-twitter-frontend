import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { reactLocalStorage } from 'reactjs-localstorage';
import './App.css';
import Main from './components/Main';

class App extends Component {

  constructor(props) {
      super(props);
  }

  loadSettingsFromLocalStorage() {
      const settings = reactLocalStorage.getObject('settings');
      if (Object.keys(settings).length === 0 && settings.constructor === Object) {
          reactLocalStorage.setObject('settings', {defaultLocation: "London", defaultTimeSpan: true});
      }
  }

  componentDidMount() {
      this.loadSettingsFromLocalStorage();
  }

  render() {
    return (
        <MuiThemeProvider>
            <Main/>
        </MuiThemeProvider>
    );
  }
}

export default App;
